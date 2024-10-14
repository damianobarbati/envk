const fs = require("node:fs");
const expand = require("./expand.js");

const envk = () => {
  const { NODE_ENV, ENVK, ENVK_DEBUG } = process.env;

  let env_file;

  if (ENVK) {
    env_file = ENVK;
  } else if (fs.existsSync(`.env.${NODE_ENV}`)) {
    env_file = `.env.${NODE_ENV}`;
  } else if (fs.existsSync(".env")) {
    env_file = ".env";
  } else {
    if (ENVK_DEBUG) console.log("[envk] No env file found.");
    return;
  }

  const lines = fs
    .readFileSync(env_file, "utf8") // read env file
    .split("\n") // split file in lines
    .filter(Boolean) // ignore empty lines
    .filter((line) => !line.startsWith("#")); // ignore comments

  const envs = {};

  for (const [index] of Object.entries(lines)) {
    const line = lines[index];

    try {
      // keys with empty values (eg: HELLO= ) are assigned empty string
      let [, key, value = ""] = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

      const is_single_quoted = value.startsWith("'") && value.endsWith("'");
      const is_double_quoted = value.startsWith('"') && value.endsWith('"');

      // remove quoting
      if (is_single_quoted || is_double_quoted) value = value.slice(1, -1);

      // if double quoted then expand newlines
      if (is_double_quoted) value = value.replace(/\\n/g, "\n");

      // remove spaces
      value = value.trim();

      // do not overwrite envs already provided (eg: by the env or by the cli with ABC=123 node -r envk file.js)
      envs[key] = process.env[key] ?? value;
    } catch (error) {
      console.log(error);
      throw new Error(`ENVK line malformed in ${env_file}:${line} for key ${index}`);
    }
  }

  // expand variables
  for (const [key, value] of Object.entries(envs)) {
    if (value.includes("$")) {
      envs[key] = expand(key, value, envs);
    }
  }

  if (ENVK_DEBUG) {
    console.log(`[envk] reading envs from ${env_file}`);
    for (const [key, value] of Object.entries(envs)) {
      console.log(`[envk] ${key}=${value}`);
    }
  }

  Object.assign(process.env, envs);

  return envs;
};

module.exports = envk;

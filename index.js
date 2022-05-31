const fs = require('fs');
const { NODE_ENV, ENVK_DEBUG } = process.env;

let envFile;

if (fs.existsSync(`.env.${NODE_ENV}`)) {
  envFile = `.env.${NODE_ENV}`;
} else if (fs.existsSync(`.env`)) {
  envFile = `.env`;
} else {
  throw new Error(`[envk] Neither .env.${NODE_ENV} or .env file was found.`);
}

// split file in lines, removing empty ones and comments
const lines = fs
  .readFileSync(envFile, 'utf8')
  .split('\n')
  .filter(Boolean) // ignore empty lines
  .filter((line) => !line.startsWith('#')); // ignore comments

const envs = {};

for (const index in lines) {
  const line = lines[index];

  try {
    // keys with empty values (eg: HELLO= ) are assigned empty string
    let [, key, value = ''] = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    const isSingleQuoted = value.startsWith("'") && value.endsWith("'");
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');

    if (isSingleQuoted || isDoubleQuoted) value = value.slice(1, -1);

    // if double quoted, expand newlines
    if (isDoubleQuoted) value = value.replace(/\\n/g, '\n');

    value = value.trim();

    envs[key] = value;
  } catch (error) {
    console.log(error);
    throw new Error(`ENVK line malformed in ${envFile}:${line} for key ${index}`);
  }
}

if (ENVK_DEBUG) {
  console.log(`[envk] reading envs from ${envFile}`);
  for (const [key, value] of Object.entries(envs)) console.log(`[envk] ${key}=${value}`);
}

Object.assign(process.env, envs);

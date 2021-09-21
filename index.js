const fs = require('fs');
const { NODE_ENV, ENVK_DEBUG } = process.env;

let envFile;
console.log(`.env.${NODE_ENV}`)
if (fs.existsSync(`.env.${NODE_ENV}`)) {
  envFile = `.env.${NODE_ENV}`;
}
else if (fs.existsSync(`.env`)) {
  envFile = `.env`;
}
else {
  throw new Error(`[envk] Neither .env or .env.${NODE_ENV} file was found.`);
}

// split file in lines, removing empty ones and comments
const lines = fs.readFileSync(envFile).toString().split('\n').filter(Boolean).filter(line => !line.startsWith('#'));

const envs = {};

for (const index in lines) {
  const line = lines[index];

  try {
    // default undefined or missing values to empty string
    let [, key, value = ''] = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    const isSingleQuoted = value.startsWith('\'') && value.endsWith('\'');
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');

    if (isSingleQuoted || isDoubleQuoted)
      value = value.slice(1, -1);

    // if double quoted, expand newlines
    if (isDoubleQuoted)
      value = value.replace(/\\n/g, '\n');

    value = value.trim();

    envs[key] = value;
  }
  catch (error) {
    console.log(error);
    throw new Error(`ENVK line malformed at index ${index}: ${line}`);
  }
}

if (ENVK_DEBUG) {
  console.log(`[envk] reading envs from ${envFile}`);
  console.log(`[envk] ${JSON.stringify(envs)}`);
}

Object.assign(process.env, envs);
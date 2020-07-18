const fs = require('fs');
const { NODE_ENV, ENVK, ENVK_DEBUG } = process.env;

if (!ENVK && !NODE_ENV)
    throw new Error('[envk] Either NODE_ENV or ENVK environment variable are required to have ENVK parse the proper .env file.');

const envFile = ENVK || `.env.${NODE_ENV}`;
if (!fs.existsSync(envFile))
    throw new Error(`[envk] ${envFile} file not found.`);

if (ENVK_DEBUG)
    console.log(`[envk] reading envs from ${envFile}`);

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

if (ENVK_DEBUG)
    console.log(`[envk] ${JSON.stringify(envs)}`);

Object.assign(process.env, envs);

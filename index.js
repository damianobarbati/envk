const fs = require('fs');
const file = process.env.ENVK;
const debug = !!process.env.ENVK_DEBUG;

if (!file)
    throw new Error('ENVK environment variable is empty');

if (!fs.existsSync(file))
    throw new Error('ENVK environment variable must be a path to an existing file');

const content = fs.readFileSync(file).toString();

const envs = {}

// split file in lines, removing empty ones and comments
const lines = content.split('\n').filter(Boolean).filter(line => !line.startsWith('#'));

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

        process.env[key] = value;

        if (debug)
            console.log(key, '=', value);
    }
    catch (error) {
        console.log(error);
        throw new Error(`ENVK line malformed at index ${index}: ${line}`);
    }
}
const fs = require('fs');
const file = process.env.ENVK;
const debug = !!process.env.ENVK_DEBUG;

if (!file)
    throw new Error('ENVK environment variable is empty');

if (!fs.existsSync(file))
    throw new Error('ENVK environment variable must be a path to an existing file');

const content = fs.readFileSync(file).toString();

const envs = {}

const lines = content.split('\n');
for (const index in lines) {
    const line = lines[index];

    if (line.startsWith('#'))
        continue;

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
        throw new Error(`ENVS line malformed at index ${index}: ${line}`);
    }
}
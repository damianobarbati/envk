/**
 * Read an env file and assign its variables to `process.env`, without overwriting variables already set.
 *
 * The env file is resolved in this order:
 * 1. `env_path` argument
 * 2. `ENVK` environment variable
 * 3. `.env.<NODE_ENV>` file
 * 4. `.env` file
 *
 * @param env_path path to the env file to read
 * @returns the variables read from the env file, or `undefined` if no env file was found
 */
declare function envk(env_path?: string): Record<string, string> | undefined;

export default envk;

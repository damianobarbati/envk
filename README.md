# envk

This packages lets you autoload your environment variables from your `.env` file, no code changes required.  

Similar to `dotenv`, but with zero-dependencies and less verbose.  

Easy as:
```sh
yarn add envk
node -r envk index.js # autoloads .env file
```

Features:
- auto-detect of `.env.<NODE_ENV>` or `.env` file
- support for custom `.env` filename with `ENVK` environment variable
- support for single quotes, double quotes, empty lines and comments

You can easily see what's happening inspecting `index.js`: wysiwyg'est at maximum level.

**Nothing more, nothing less.**

## Usage

Load envs from `.env`:
```sh
node -r envk index.js
```

Load envs from `.env.production` file, otherwise `.env`:
```sh
NODE_ENV=production node -r envk index.js
```

Load envs from specific file:
```sh
ENVK=file.env node -r envk index.js
```

Log to console imported variables:
```sh
ENVK_DEBUG=1 node -r envk index.js
```
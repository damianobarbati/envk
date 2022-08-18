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
- support for variable expansiong
- support for single quotes
- support for double quotes
- support for empty lines
- support for multiline quoting with double quotes `"SECRET=hello\nworld"`
- support for comments prefixing the line with `#`

You can see what's happening inspecting `index.js`.

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
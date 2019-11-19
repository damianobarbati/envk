# envk

This package is a slimmer and less "config verbose" alternative to the popular `dotenv`:
- it looks either for the env `NODE_ENV` (thus loading `.env.<NODE_ENV>` file) or `ENVK` (thus loading `<ENVK>` file)
- it parses the env file (single quotes, double quotes and comments supported)
- it assign the variables parsed to the `process.env` global object

When both `ENVK` and `NODE_ENV` are specific, `ENVK` has priority.
You can easily see what's happening into `index.js`: wysiwyg'est as possible.

**Nothing more, nothing less.**

## Usage:

To load envs from `.env.<NODE_ENV>` file (i.e: `.env.development`)
```bash
NODE_ENV=development node -r envk index.js
```

To load envs from specific file (i.e: `file.env`):
```bash
ENVK=file.env node -r envk index.js
```

To debug imported env variables:
```bash
NODE_ENV=development ENVK_DEBUG=1 node -r envk index.js
# or
ENVK=file.env ENVK_DEBUG=1 node -r envk index.js
```
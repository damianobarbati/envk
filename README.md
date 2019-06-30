# envk

This package is slimmer and less "config verbose" alterantive to the popular `dotenv` (https://www.npmjs.com/package/dotenv).
- it takes an environment variable declaring a path to an env file
- it parses the env file (single quotes, double quotes and comments supported)
- it assign the variables parsed to the `process.env` global object

You can easily see what's happening into `index.js`: wysiwyg'est as possible.
**Nothing more, nothing less.**

## Usage:

Easy as:
```
ENVK=file.env node index.js
```

To debug imported env variables:
```
ENVK=file.env ENVK_DEBUG=1 node index.js
```
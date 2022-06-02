const fs = require('fs');
const { strict: assert } = require('assert');
const envk = require('./index.js');

const env = `
HELLO=world
HOLA='mundo'
CIAO="mondo 😀"
# rere
EXPANDED=\${HELLO}-\${HOLA}imfinehere\${SALUT:-salut}\\$done

KEY=abc1
KEY=abc2
`;

it('works', () => {
  fs.writeFileSync('.env', env);

  const result = envk();

  assert.equal(result.HELLO, 'world');
  assert.equal(result.HOLA, 'mundo');
  assert.equal(result.CIAO, 'mondo 😀');
  assert.equal(result.EXPANDED, 'world-mundoimfineheresalut$done');

  fs.unlinkSync('.env');
});

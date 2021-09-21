#!/usr/bin/env sh
set -e
set -x

cat >.env <<EOT
HELLO=world
HOLA='mundo'

CIAO="mondo 😀"
# rere

KEY=abc1
KEY=abc2
EOT

# if .env.test is not found then .env
NODE_ENV=test ENVK_DEBUG=1 node -r ../index.js test.js > output.txt
cmp output.txt output_expected_1.txt || echo "Test 1 failed"

# if .env.test is found then .env.test
mv .env .env.test
NODE_ENV=test ENVK_DEBUG=1 node -r ../index.js test.js > output.txt
cmp output.txt output_expected_1.txt || echo "Test 1 failed"

NODE_ENV=test ENVK_DEBUG=1 node -r ../index.js test.js > output.txt
cmp output.txt output_expected_2.txt || echo "Test 2 failed"

rm output.txt

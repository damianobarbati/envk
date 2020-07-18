#!/usr/bin/env sh
set -e
set -x

ENVK=./test/.env.test ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_1.txt || echo "Test 1 failed"

NODE_ENV=test ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_2.txt || echo "Test 2 failed"

NODE_ENV=test ENVK=./test/.env.test ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_1.txt || echo "Test 3 failed"

rm test/output.txt

ENVK=./test/config.env ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_1.txt && rm test/output.txt || echo "Test 1 failed"

NODE_ENV=test ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_2.txt && rm -f test/output.txt || echo "Test 2 failed"

NODE_ENV=test ENVK=./test/config.env ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected_1.txt && rm -f test/output.txt || echo "Test 3 failed"
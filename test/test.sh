ENVK=./test/config.env ENVK_DEBUG=1 node -r ./index.js test/test.js > test/output.txt
cmp test/output.txt test/output_expected.txt && rm test/output.txt || echo "Test failed"
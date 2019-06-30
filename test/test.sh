ENVK=./test/config.env ENVK_DEBUG=1 node index.js > test/output.txt
cmp test/output.txt test/output_expected.txt || echo "Test failed"
rm test/output.txt
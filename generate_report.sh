#!/bin/bash

cd source_code
make os
output=$(./os $1)

cd ..
rm -rf ./output.html
cat <<EOF > ./output.html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Report</title>
</head>
<body>
    <div id="app"></div>
    <script>
var OUTPUT = \`$output\`;
    </script>
    <script src="dist/nearley.js"></script>
    <script src="dist/preact.js"></script>
    <script src="dist/htm.js"></script>
    <script src="dist/tailwindcss.js"></script>
    <script src="dist/grammar.js"></script>
    <script src="demo/index.js" type="module"></script>
</body>
</html>
EOF

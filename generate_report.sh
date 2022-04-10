#!/bin/bash


input=$(cat $1)

# run program on a tempory file in input directory
echo "$input" > source_code/input/tmp.tmp
cd source_code
make os
output=$(./os tmp.tmp)
cd ..
rm -rf source_code/input/tmp.tmp

# create html file
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
var INPUT = \`$input\`;
var OUTPUT = \`$output\`;
    </script>
    <script src="dist/nearley.js"></script>
    <script src="dist/preact.js"></script>
    <script src="dist/htm.js"></script>
    <script src="dist/tailwindcss.js"></script>
    <script src="dist/input.ne.js"></script>
    <script src="dist/output.ne.js"></script>
    <script src="demo/index.js" type="module"></script>
</body>
</html>
EOF

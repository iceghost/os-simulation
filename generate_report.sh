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
  <script src="dist/tailwindcss.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100;400;700&display=swap');
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            smooch: ["Smooch Sans", "sans-serif"],
          }
        }
      }
    }
  </script>
</head>
<body>
    <div id="app"></div>
    <script>
var INPUT = \`$input\`;
var OUTPUT = \`$output\`;
var TIMESTAMP = $(date +%s);
    </script>
    <script src="dist/nearley.js"></script>
    <script src="dist/preact.js"></script>
    <script src="dist/htm.js"></script>
    <script src="dist/input.ne.js"></script>
    <script src="dist/output.ne.js"></script>
    <script src="demo/index.js" type="module"></script>
</body>
</html>
EOF

# CLI options

| option |type| default ||
|--------|--------|---|--|
|--srcDir, -s|string| \<rootDir\>/firestore|Directory having `index.rules` file.|
|--srcFileName |string| index.rules|Entry file name can be change.|
|--outDir, -o|string| \<rootDir\>| Destination to generate `firestore.rules` file. |
|--outFileName|string|firestore.rules|Generated file name can be change.|
|--watch, -w|bool| false| When not pass over this option, run the Compile mode.|
|--ignore|Array of regex or string|\[\*\*/tests/\*\*, \*\*/\_\_tests\_\_/\*\*\] |If you don't want to watch in \<srcDir\>, pass ignore patterns.|
|--help, -h||
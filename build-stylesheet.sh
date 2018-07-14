#!/bin/bash

STYLESHEET_NAME=asciidoctor

if [ ! -z $1 ]; then
  STYLESHEET_NAME=$1
fi

npm run build
LINES=`wc -l css/$STYLESHEET_NAME.css | cut -d" " -f1`
echo '/* Asciidoctor default stylesheet | MIT License | https://asciidoctor.org */' > $STYLESHEET_NAME.css
cat css/$STYLESHEET_NAME.css | \
  sed 's/ *\/\*\+!\? [^*]\+\($\| \*\/\)//g' | \
  sed 's/^\/\*\* .* \*\/$//' | \
  sed '/^\(*\/\|\) *$/d' | \
  sed 's/^@media only/@media/' | \
  sed '/\.antialiased {/d' | \
  sed '/^body { margin: 0;/d' | \
  sed 's/^body { background:[^}]*/&tab-size: 4; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased;/' | \
  sed '/^body { -moz-osx-font-smoothing:/d' | \
  sed '/object, svg { display: inline-block;/d' | \
  sed 's/img { display: inline-block;/img, object, svg { display: inline-block;/' | \
  sed 's/table thead, table tfoot {\(.*\) font-weight: bold;\(.*\)}/table thead, table tfoot {\1\2}/' | \
  sed '/^p\.lead {/d' | \
  sed '/^ul\.no-bullet, ol\.no-bullet { margin-left: 1.5em; }$/d' | \
  sed '/^ul\.no-bullet { list-style: none; }$/d' | \
  sed '/\(meta\.\|\.vcard\|\.vevent\|#map_canvas\|"search"\|\[hidden\]\)/d' | \
  grep -v 'font-awesome' >> $STYLESHEET_NAME.css

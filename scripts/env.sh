#!/bin/sh

apiUrl="${REACT_APP_API_URL:-https://api.test.rapidpass.amihan.net/api}"
cat <<EOF
window.REACT_APP_API_URL='$apiUrl';
EOF
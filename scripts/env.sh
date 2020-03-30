#!/bin/sh
api_url="${REACT_APP_API_URL:-http://localhost:3030}"
cat <<EOF
window.REACT_APP_API_URL='$api_url';
EOF
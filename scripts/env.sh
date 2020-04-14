#!/bin/sh

apiUrl="${REACT_APP_API_URL:-https://rapidpass-api-stage.azurewebsites.net/api}"
apiKey="${REACT_APP_API_KEY:-unset}"
cat <<EOF
window.REACT_APP_API_URL='$apiUrl';
window.REACT_APP_API_KEY='$apiKey';
EOF
#!/bin/sh
COMMAND="npm start -- --host --no-open"
if command -v pm2 >/dev/null ; then
    echo "Using PM2: monitor with 'pm2 status'"
    pm2 start "$COMMAND" --name landing --watch
else
    $COMMAND
fi


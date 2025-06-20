#!/bin/bash
cd /home/kavia/workspace/code-generation/fearless-fun-64295-e559b377/fearless_fun_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


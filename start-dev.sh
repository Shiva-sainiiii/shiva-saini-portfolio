#!/bin/bash
node api-server.mjs &
API_PID=$!
npm run dev
kill $API_PID 2>/dev/null

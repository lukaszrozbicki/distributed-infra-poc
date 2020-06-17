#!/bin/bash

BE_PID="./be/.pid"
FE_PID="./fe/.pid"

kill -9 $(<"$BE_PID") 2> /dev/null
kill -9 $(<"$FE_PID") 2> /dev/null

cd ./be
node index.js &
echo $! > .pid
cd ../fe
yarn build > /dev/null
npx serve -l 3000 ./build &
echo $! > .pid &

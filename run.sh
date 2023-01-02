#/bin/bash
clear
clear
prettier --write . 
npx kill-port 3000
npx kill-port 3001
rm -rf dist
rm -rf *.csv
npm install
nest build
npm start


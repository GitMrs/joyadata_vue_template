rm -rf ./dist
rm -rf yarn.lock
cp /home/frontend/dedp/lock/demo/yarn.lock ./
yarn
yarn build
touch  ./dist/$(date +%s)
cp -r ./dist ./demo
tar -zcvf dist.tar.gz ./demo
mv /home/frontend/dedp/web/demo/ /home/frontend/dedp/history/demo
mv /home/frontend/dedp/history/demo/demo  /home/frontend/dedp/history/demo/demo$(date +%s)
mv ./demo /home/frontend/dedp/web
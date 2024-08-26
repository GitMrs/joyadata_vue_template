rm -rf ./dist
rm -rf yarn.lock
cp /home/frontend/dedp/lock/demo/yarn.lock ./
yarn
yarn build
touch  ./dist/$(date +%s)
cp -r ./dist ./demo
tar -zcvf dist.tar.gz ./demo
mkdir -p /home/frontend/dedp/history/demo/$(date +%Y)/$(date +%m)/
mv /home/frontend/dedp/web/demo/ /home/frontend/dedp/history/demo/$(date +%Y)/$(date +%m)/
mv /home/frontend/dedp/history/demo/$(date +%Y)/$(date +%m)/demo  /home/frontend/dedp/history/demo/$(date +%Y)/$(date +%m)/demo$(date +%s)
mv ./demo /home/frontend/dedp/web
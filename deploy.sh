cd /var/www/face-landmark-js/;
pm2 delete face-landmark;
npm i;
npm run build;
pm2 start serve.sh --name face-landmark -l;

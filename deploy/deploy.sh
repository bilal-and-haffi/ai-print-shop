# bash 
# this is run on a cron every minute on the server
#  checkout main -- TODO: maybe?
git pull
npm run install 
npm run get-envs-prod
npm run db:push
npm run build 
npm run pm2
# TODO: notify me
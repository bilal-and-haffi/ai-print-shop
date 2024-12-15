# bash 
# this is run on a cron every minute on the server
#  checkout main -- TODO: maybe?
git pull
caddy start
npm install 
npm run get-envs-prod
npm run db:push
npm run build 
# TODO: notify me
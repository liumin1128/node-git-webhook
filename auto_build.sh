PRO_DIR="../api.react.mobi"
echo "start--------------------"
cd $PRO_DIR
echo "cd $PRO_DIR"
echo "pull git code"
git pull
echo "restart nodeblog"
pm2 restart webhook
echo "finished-----------------"

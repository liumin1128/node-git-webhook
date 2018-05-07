# node-git-webhook
node-git-webhook

### 这是什么

一个express应用，用于监听指定端口，当接受到github发来的webhook请求时，进行一些本地处理，以便实现自动更新。


### 怎么用

```
git clone https://github.com/liumin1128/node-git-webhook.git
cd node-git-webhook
node index
```

### github设置

如需发送webhook请求，请先去github项目里添加设置，稍作调试即可

### 本地脚本

一个简单的本地脚本如下：
auto_build.sh
```
PRO_DIR="../react.mobi"
GIT_URL="https://github.com/liumin1128/react.mobi.git"
pwd

# echo "切换到Node 版本：8.8.1"
# source ~/.nvm/nvm.sh
# nvm use 8.8.1

# echo "Node 版本："
# node -v

# echo "关闭pm2"
# pm2 delete react.mobi

echo "进入项目目录"
pwd
cd $PRO_DIR
pwd
echo "从 $PATH_OLD 切换到 $PATH_NEW"

echo "正在从git同步代码"
# output1=`git fetch --all && git reset --hard origin/master && git pull`
# echo $output1
git fetch --all
git reset --hard origin/v3
git pull

echo "正在下载依赖"
yarn

echo "正在编译"
yarn build

echo "重启pm2"
yarn pm2

pm2 ls
echo "项目已更新！"

```

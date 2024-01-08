#!/bin/bash

while read line; do
     #要将$a分割开，先存储旧的分隔符
     OLD_IFS="$IFS"
     #设置分隔符
     IFS=","
     #如下会自动分隔
     arr=($line)
     echo ${arr[*]}
     #恢复原来的分隔符
     IFS="$OLD_IFS"
     git submodule add ${arr[*]:0:1} ${arr[*]:1:1}
done < submodules.add.list


echo 'Gen all finish'

# 添加子游戏
# git submodule add $1 assets/submodules/$2

# 删除子游戏
# git rm --cached assets/submodules/cocos_slowarrior


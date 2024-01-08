#!/bin/bash

# execel配置转json配置

while read line;
do
    eval "$line"
done < shell-config.cfg

echo 'plat:'$plat

PLATFORM=$plat

echo '======================== Start gen execel to config ========================'

echo 'Gen all platform:'$PLATFORM

#要将$a分割开，先存储旧的分隔符
OLD_IFS="$IFS"

#设置分隔符
IFS=","

#如下会自动分隔
arr=($PLATFORM)

#恢复原来的分隔符
IFS="$OLD_IFS"

#遍历数组
for s in ${arr[@]}
do
#生成配置
omelox-excel gen -h assets/scripts/config_getter -t 2 -i shared/excels -o assets/bundles/config -c "$s"
echo "gen $s platform excel config ok"
done

echo '======================== End gen execel to config ========================'
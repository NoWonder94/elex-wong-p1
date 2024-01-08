#!/bin/bash

# cd
root=$(cd "$(dirname "$0")";pwd)

# `-v` 指定 Manifest 文件的主版本号。
# `-u` 指定服务器远程包的地址，这个地址需要和最初发布版本中 Manifest 文件的远程包地址一致，否则无法检测到更新。
# `-s` 本地原生打包版本的目录相对路径。
# `-m` 保存 Manifest 文件的地址。
# `-d` 热更资源保存目录。

# generate manifest (change version first!).
node tools/VersionGenerator/version_generator_bundle.js -v 1.0.7 -u http://192.168.3.188:19201/facepoker -b cocos_pokzjh -s build/windows/assets -m assets/resources -d hotupdate/bundle-hotupdate-assets
#!/bin/bash

# git配置
git config core.autocrlf input

# 拉取子模块
git submodule update --init --recursive

git submodule foreach git checkout master

cp shared/npm-shrinkwrap.json .

cp pack/pack.client.address.config.template.ts pack/pack.client.address.config.ts

# 安装依赖
npm i

# 安装配置生成工具
npm i omelox-excel -g

# ts编译
npm i typescript -g

# 单元测试工具
npm install jest -g

# 打包工具
npm i gulp -g

# 拷贝预览模板到工程根目录
cp -r extensions/preview-template .




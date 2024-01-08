# cocos-slo-project

## 项目运行
1. 安装cocos creator 3.2.1
2. 安装Git-2.33.0-64-bit.exe
3. 使用git clone 代码
4. 进入项目根目录，在Git bash命令行执行./project.init.sh
5. 完成后启动项目，修改 cocos-slo-project/assets/scripts/version.ts, 连接到外网测试环境
```
/** 发布渠道 */
version.PubPlatform = Platform.Test;
```
6. 运行项目，http://localhost:7456/?gid=slobskg 进入体验游戏


## 单元测试
### jest官方文档https://jestjs.io/zh-Hans/docs/getting-started


1. 在项目根目录下运行命令安装 jest
```
npm install --save-dev jest
# 如果是ts工程:
npm install --save-dev ts-jest
```

2.  安装 jest 包
```
npm i --save-dev @types/jest

# 如果是 ts 工程：
npm install --save-dev typescript

```

3.  修改测试命令package.json
```
{
  "scripts": {
    "test": "jest"
  },
}
```

4.  运行测试命令
```
npm t #输出：No tests found

```

5.  配置jest.config.js
```
module.exports = {
    preset: "ts-jest",         // 如果是 js 工程，则是 "jest" 
    testEnvironment: 'node',   // 测试代码所运行的环境
    // verbose: true,          // 是否需要在测试时输出详细的测试情况
    rootDir: "./test",         // 测试文件所在的目录
    globals: {                 // 全局属性。如果你的被测试的代码中有使用、定义全局变量，那你应该在这里定义全局属性
        window: {},       
        cc: {}
    }
};
```

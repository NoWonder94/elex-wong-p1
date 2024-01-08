export default {
    site: {
        name: "博乐小后台"
    },
    menu: {
        title: {
            member: "会员列表",
            game: "游戏列表",
            info: "消息列表",
            resource: "档案管理",
            directory: "目录列表",
            file: "文件列表",
            system: "系统管理",
            adminGroup: "权限组列表",
            admin: "管理员列表",
            logout: '登出'
        }
    },
    button: {
        login: '登入',
        create: '创建',
        edit: '编辑',
        update: '更新',
        delete: '删除',
        detail: '详情',
        uploadIcon: '点击上传图标',
        uploadImg: '点击上传图片',
        uploadImgBanner: '点击上传背景图片',
        uploadFile: '点击上传文件',
        enable: '启用',
        disable: '禁用',
        confirm: '确定',
        cancel: '取消',
    },
    search: {
        title: {
            search: '查询',
            result: '搜索结果',
            data: '条数据',
            quantity: '显示数量',
            action: '操作',
        },
    },
    placeholder: {
        keyword: '请输入关键词',
    },
    dialog: {
        title: {
            create: '创建',
            update: '更新',
            edit: '编辑'
        },
        subtitle: {
            businessNo: '商户号',
            personInfo: '接入负责人信息',
            financialPersonInfo: '财务负责人信息',
            basicInfo: '基本资料',
            brief: '简介',
            description: '内容',
            descriptionScreenshot: '内容截图',
            authority: '权限设置'
        },
        column: {
            account: '账号',
            domainName: '站点域名(域名不可更改):',
            companyName: '公司名称:',
            currency: '货币:',
            name: '姓名:',
            email: '电子邮箱:',
            skype: 'Skype:',
            telegram: 'Telegram:',
            wechat: '微信:',
            qq: 'QQ:',
            name: '名称',
            pwd: '密码',
            pwdNew: '新密码',
            adminGroup: '管理权限组',
            status: '状态',
            img: '图片',
            sort: '排列',
            file: '文件',
            directory: '目录',
            infoCategory: '资讯类型',
            gameCategory: '游戏类型',
            icon: '图标',
            title: '标题',
            summary: '简介',
            description: '内容(代码格式)',
            lang: '语言',
            imgBanner: '背景图片',
            onlineDate: '上线时间',
            maxWin: '最大可赢',
            selfSetDate: '自定日期',
            gameUrl: '游戏链接',
        },
        require: {
            account: '请输入账号',
            domainName: '请输入站点域名',
            companyName: '请输入公司名称',
            currency: '请选择货币',
            name: '请输入姓名',
            email: '请输入电子邮箱',
            skype: '请输入Skype',
            telegram: '请输入Telegram',
            wechat: '请输入微信',
            qq: '请输入QQ',
            name: '请输入名称',
            pwd: '请输入密码',
            pwdNew: '请输入新密码',
            adminGroup: '请选择管理权限组',
            status: '请选择状态',
            img: '请上传图片',
            sort: '请输入排列',
            file: '请上传文件',
            directory: '请选择目录',
            infoCategory: '请选择资讯类型',
            gameCategory: '请选择游戏类型',
            icon: '请上传图标',
            title: '请输入标题',
            summary: '请输入简介',
            description: '请输入内容',
            lang: '请选择语言',
            imgBanner: '请上传背景图片',
            gameUrl: '请输入游戏链接',
        },
        length: {
            account: '账号最少6个数字',
            pwd: '密码最少6个数字',
            pwdNew: '新密码最少6个数字'
        }
    },
    message: {
        tip: '提示',
        confirm: {
            delete: '确定删除?'
        },
        success: {
            create: '创建成功',
            update: '更新成功',
            delete: '删除成功',
            switch: '更换成功'
        },
        error: {
            getData: '获取数据失败',
            create: '创建失败',
            update: '更新失败',
            delete: '删除失败',
            switch: '更换失败',
            unknown: '未知错误',
            emailFormat: '电子邮箱格式错误',
            imgAmountMaxLimit: '图片数量最高限制',
        },
        develop: '开发中',
        empty: {
            data: '暂无数据',
        },
    },
    status: {
        active: '开启',
        inactive: '禁止',
        comingSoon: '期待'
    },

    "siteName": "博樂游戏",
    "description": "代理后台",

    "gameLobby": "游戏大厅",

    "refresh": "点击刷新",
    "back": "返回",

    // 顶部菜单
    "topMenu": {
        "language": "SwitchToEnglish",
        "setting": "设置",
        "logout": "退出",
    },
    
    // 左侧菜单
    /*
    "menu": {
        "index": "首页",
        "chart": "统计",
        "agency": "代理",
        "game": "游戏",
        "order": "订单",
        "system": "系统",
    },
    */

    // 标题
    "title": {
        "index": "首页",
        "chart": {
            "index": "统计分析",
            "index-coins": "金币统计",
            "coins": {
                "play": "对战棋牌",
                "multi": "百人棋牌",
                "slot": "老虎机",
            },
        },
        "agency": {
            "index": "代理管理",
            "contacts": {
                "titleSide": '代理列表',
                "title": '成员管理',
            },
            "setting": "代理设置",
            "avail-ip": "IP白名单",
        },
        "game": {
            "index": "游戏管理",
            "user": "游戏玩家",
            "log": "游戏记录",
            "login-log": "登录记录",
            "player-bet": "玩家投注",
            "notice": "游戏公告",
            "status": "停服维护",
            "list-play": "对战棋牌",
            "list-multi": "百人棋牌",
            "list-slot": "老虎机",
            "mahjong": {
                "index": "四川麻将 - 血流成河",
                "setting": "血流成河 - 游戏设置",
                "log": "血流成河 - 游戏记录",
            },
            "mohjong": {
                "index": "四川麻将 - 血战到底",
                "setting": "血战到底 - 游戏设置",
                "log": "血战到底 - 游戏记录",
            },
            "niuniu": {
                "index": "博乐牛牛",
            },
            "sangong": {
                "index": "博乐三公",
            },
            "zjh": {
                "index": "炸金花",
            },
            "dzmj": {
                "index": "大众麻将",
            },
            "rbwar": {
                "index": "红黑大战",
            },
            "baccarat": {
                "index": "百家乐",
            },
            "slot": {
                "index": "老虎机",
            },
        },
        "order": {
            "index": "订单管理",
            "agency": "代理订单",
            "game": "游戏订单",
            "coins": "我的金币",
            "my": "我的订单",
            "record": "金币明细",
        },
        "system": {
            "index": "系统管理",
            "user": "后台用户",
            "setting": {
                "auth": {
                    "titleSide": "权限组",
                    "title": "权限设置",
                },
                "risk": "风控",
            },
            "log": {
                "signin": "登录日志"
            },
            "task": "统计任务",
        },
        "home": {
            "setting": "个人中心"
        },
        "error": {
            "402": "登录过期",
            "403": "没有权限",
            "404": "页面不存在"
        },
    },

    // 表单
    "form": {
        "startDate": "开始日期",
        "endDate": "结束日期",
        "orgId": "请选择代理",
        "exOrgId": "排除代理ID，用逗号隔开",
        "gameId": "游戏",
        "sceneId": "场景类型",
        "spinType": "免费游戏",
        "logStatus": "状态",
        "playerType": "玩家类型",
        "accountId": "玩家账号",
        "roomId": "房间ID",
        "ipStatus": "状态",
        "ipKeyword": "代理名称 / IP地址",
        "transferType": "类型",
        "gameOrderStatus": "状态",
        "gameOrderGameStatus": "游戏状态",
        "gameOrderAgencyStatus": "代理状态",
        "agencyOrderStatus": "状态",
        "userType": "用户类型",
        "userStatus": "状态",
        "sn": "订单号",
        "memberType": "类型",
        "memberStatus": "状态",
        "memberKeyword": "姓名 / 邮箱",
        "loginStartDate": "登录开始日期",
        "loginEndDate": "登录结束日期",
        "regStartDate": "注册开始日期",
        "regEndDate": "注册结束日期",
        "email": "邮箱",
        "taskTreeStatus": "状态",
        "childTaskTreeStatus": "子孙代理状态",
        "orderType": "订单分类",
        "month": "月份",
        "select": "请选择",
        "playerRole": "玩家类型",
        "playerAccess": "玩家状态",

        "playerRoleList": [
            {
                "label": "普通",
                "value": "1"
            },
            {
                "label": "测试",
                "value": "2"
            },
        ],
        "playerAccessList": [
            {
                "label": "正常",
                "value": "1"
            },
            {
                "label": "锁定",
                "value": "2"
            },
        ],
        "ipStatusList": [
            {
                "label": "未添加",
                "value": "1"
            },
            {
                "label": "已添加",
                "value": "2"
            },
        ],
        "memberTypes": [
            {
                "label": "管理员",
                "value": "1"
            },
            {
                "label": "超级管理员",
                "value": "2"
            },
        ],
        "memberStatusList": [
            {
                "label": "正常",
                "value": "1"
            },
            {
                "label": "禁用",
                "value": "2"
            },
        ],
        "defaultScenes": [
            {
                "label": "默认场",
                "value": "1000"
            },
        ],
        "mahjongScenes": [
            {
                "label": "平民场",
                "value": "1001"
            },
            {
                "label": "小资场",
                "value": "1002"
            },
            {
                "label": "白领场",
                "value": "1003"
            },
            {
                "label": "富豪场",
                "value": "1004"
            },
        ],
        "niuniuScenes": [
            {
                "label": "新手房",
                "value": "1001"
            },
            {
                "label": "初级房",
                "value": "1002"
            },
            {
                "label": "中级房",
                "value": "1003"
            },
            {
                "label": "高级房",
                "value": "1004"
            },
            {
                "label": "至尊房",
                "value": "1005"
            },
            {
                "label": "王者房",
                "value": "1006"
            },
        ],
        "sangongScenes": [
            {
                "label": "新手房",
                "value": "1001"
            },
            {
                "label": "初级房",
                "value": "1002"
            },
            {
                "label": "中级房",
                "value": "1003"
            },
            {
                "label": "高级房",
                "value": "1004"
            },
            {
                "label": "王者房",
                "value": "1005"
            },
        ],
        "zjhScenes": [
            {
                "label": "初级房",
                "value": "1001"
            },
            {
                "label": "中级房",
                "value": "1002"
            },
            {
                "label": "高级房",
                "value": "1003"
            },
            {
                "label": "王者房",
                "value": "1004"
            },
        ],
        "dzmjScenes": [
            {
                "label": "初级场",
                "value": "1001"
            },
            {
                "label": "中级场",
                "value": "1002"
            },
            {
                "label": "高级场",
                "value": "1003"
            },
            {
                "label": "土豪场",
                "value": "1004"
            },
        ],
        "slotScenes": [
            {
                "label": "大闹天宫",
                "value": "1001"
            },
            {
                "label": "神雕侠侣",
                "value": "1002"
            },
            {
                "label": "赤壁之战",
                "value": "1003"
            },
            {
                "label": "四大美女",
                "value": "1004"
            },
            {
                "label": "宝藏矿工",
                "value": "1005"
            },
        ],
        "rbwarScenes": [
            {
                "label": "初级房",
                "value": "1001"
            },
            {
                "label": "中级房",
                "value": "1002"
            },
            {
                "label": "高级房",
                "value": "1003"
            },
        ],
        "baccaratScenes": [
            {
                "label": "初级房",
                "value": "1001"
            },
            {
                "label": "中级房",
                "value": "1002"
            },
            {
                "label": "高级房",
                "value": "1003"
            },
            {
                "label": "土豪场",
                "value": "1004"
            },
        ],
        "logStatusList": [
            {
                "label": "正常",
                "value": "1"
            },
            {
                "label": "挂起",
                "value": "2"
            },
            {
                "label": "踢出",
                "value": "3"
            },
        ],
        "playerTypes": [
            {
                "label": "玩家",
                "value": "1"
            },
            {
                "label": "玩家-AI",
                "value": "2"
            },
        ],
        "transferTypes": [
            {
                "label": "转入",
                "value": "1"
            },
            {
                "label": "转出",
                "value": "2"
            },
        ],
        "gameOrderStatusList": [
            {
                "label": "处理中",
                "value": "1"
            },
            {
                "label": "成功",
                "value": "2"
            },
            {
                "label": "失败",
                "value": "3"
            },
        ],
        "gameOrderGameStatusList": [
            {
                "label": "未处理",
                "value": "1"
            },
            {
                "label": "成功",
                "value": "2"
            },
            {
                "label": "失败",
                "value": "3"
            },
        ],
        "agencyOrderStatusList": [
            {
                "label": "处理中",
                "value": "1"
            },
            {
                "label": "成功",
                "value": "2"
            },
            {
                "label": "失败",
                "value": "3"
            },
            {
                "label": "已取消",
                "value": "4"
            },
        ],
        "userTypes": [
            {
                "label": "Manager",
                "value": "0"
            },
            {
                "label": "Super Manager",
                "value": "1"
            },
        ],
        "userStatusList": [
            {
                "label": "正常",
                "value": "1"
            },
            {
                "label": "禁用",
                "value": "2"
            },
        ],
        "taskTreeStatusList": [
            {
                "label": '初始化',
                "value": 1,
            }, {
                "label": '发布到队列',
                "value": 2
            }, {
                
                "label": '开始处理',
                "value": 3
            }, {
                "label": '成功',
                "value": 4,
            }, {
                "label": '失败',
                "value": 5
            }
        ],
        "role": [
            {
                "label": "庄",
                "value": "1"
            },
            {
                "label": "闲",
                "value": "2"
            },
        ],
        "orderTypes": [
            {
                "label": "代理订单",
                "value": "1"
            },
            {
                "label": "游戏订单",
                "value": "2"
            },
        ],
        "freeGame": [
            {
                "label": "是",
                "value": "1"
            },
            {
                "label": "否",
                "value": "0"
            },
        ],
        
        "search": "查询",
        "import": "导入",
        "export": "导出",

        "summaryText": "合计",
    },

    // 动作
    "action": {
        "create": "新增",
        "delete": "删除",
        "update": "更新",
        "add": "添加",
        "edit": "编辑",
        "modify": "修改",
        "save": "保存",
        "custom": "自定义",
        "more": "更多",
        "restart": "重启",

        "on": "启用",
        "off": "禁用",

        "enabled": "已启用",
        "disabled": "已禁用",

        "confirm": "确定",
        "cancel": "取消",
    },

    //消息提示
    "messages": {
        "empty": "暂无数据",

        "loading": "数据加载中...",
        "loading-failed": "加载失败，",

        "save-succeeded": "保存成功",
        "save-failed": "保存失败",

        "delete-succeeded": "删除成功",
        "delete-failed": "删除失败",

        "update-succeeded": "更新成功",
        "update-failed": "更新失败",
        
        "create-succeeded": "创建成功",
        "create-failed": "创建失败",

        "login-failed": "登录失败，请刷新页面重试",
        "page-expired": "页面过期，点击确定刷新页面",

        "delete-agent-failed": "代理存在子代理，请先删除所有子代理。",
    },

    //游戏
    "games": {
        "-1": "游戏大厅",
        "10001": "四川麻将-血流成河",
        "10002": "四川麻将-血战到底",
        "10003": "博乐牛牛",
        "10004": "博乐三公",
        "10005": "炸金花",
        "10006": "大众麻将",
        "10007": "老虎机",
        "10008": "红黑大战",
        "10010": "百家乐",
    },

    //日期范围
    "datePickerOptions": {
        "today": "今天",
        "yesterday": "昨天",
        "lastWeek": "最近一周",
        "lastMonth": "最近一个月",
        "lastThreeMonths": "最近三个月",
        "lastSixMonths": "最近六个月",
        "last30Days": "最近30天",
        "warning": "注意：查询30天前的数据，时间范围只能在同一天内。",
    },

    // 麻将输赢类型
    "mahjongBillsType": {
        "fees": "房费",
        "windy": "刮风",
        "windy-b": "刮风-巴杠",
        "windy-s": "刮风-直杠",
        "raining": "下雨",
        "win": "胡牌",
        "ownDraw": "自摸",
        "loss": "点炮",
        "othersDraw": "被自摸",
        "checkTally": "查叫",
        "noTally": "未听牌",
        "checkFlower": "查花猪",
        "flower": "花猪",
        "returnKong": "退税",
        "forwardKong": "呼叫转移",
        "others": "被",
        "settlement": "结算",
        "bets": "投注",
        "guzhuyizhiBack": "孤注一掷返还",
        "luckMoney": "喜钱",
        "settlementBack": "结算返还"
    },

    // 首页
    "index": {
        "coinsUse": "金币消耗",
        "totalUse": "累计消耗",
        "currentUse": "当月消耗",
        "previousUse": "上月消耗",

        "coins": "我的金币",
        "coinsTotal": "累计金币",
        "coinsGive": "累计发放",
        "coinsHave": "持有金币",

        "player": "游戏玩家",
        "totalPlayer": "玩家总计",
        "currentPlayer": "当月新增",
        "previousPlayer": "上月新增",
        
        "onlineTotalPeople": "在线人数",
        "onlineTotalPlayer": "游戏人数",
        "AIQuantity": "AI 数量",

        "line-earn": {
            "day": "时间（天）",
            "month": "时间（月）",
            "coinsGet": "金币收益",
            "coins": "金币",
        },
        
        "line-coin": {
            "day": "时间（天）",
            "month": "时间（月）",
            "coinsUse": "金币消耗",
            "myGame": "我的游戏",
            "agentGame": "代理游戏",
            "total": "总计",
        },

        "line-player": {
            "day": "时间（天）",
            "month": "时间（月）",
            "new": "新增人数",
        },

        "line-active": {
            "day": "时间（天）",
            "number": "活跃人数",
            "gameName": "游戏名称",
        },
    },

    // 统计
    "chart": {
        "use": "消耗",
        "agent": "代理",
        "player": "玩家",
        "games": "游戏",
        "totalDay": "天统计",
        "totalMonth": "月统计",
        "activeNo": "活跃指数",
        
        // 统计 - 消耗
        "coin": {
            "thLable": {
                "date": "日期",
                "month": "月份",
                "playerBet": "玩家投注",
                "platformCommission": "平台抽水",
                "AIPnL": "机器人盈亏",
                "total": "总计",
                "platformGold": "平台盈亏",
                "playerBetChild": "玩家投注（子孙代理）",
                "platformCommissionChild": "平台抽水（子孙代理）",
                "AIPnLChild": "机器人盈亏（子孙代理）",
                "totalChild": "总计（子孙代理）",
                "platformGoldChild": "平台盈亏（子孙代理）",
            },
        },

        // 统计 - 代理
        "agency": {
            "thLable": {
                "date": "日期",
                "month": "月份",
                "agency": "代理",
                "playerBet": "玩家投注",
                "platformCommission": "平台抽水",
                "AIPnL": "机器人盈亏",
                "total": "总计",
                "platformGold": "平台盈亏",
                "playerBetChild": "玩家投注（子孙代理）",
                "platformCommissionChild": "平台抽水（子孙代理）",
                "AIPnLChild": "机器人盈亏（子孙代理）",
                "totalChild": "总计（子孙代理）",
                "platformGoldChild": "平台盈亏（子孙代理）",
            }
        },

        // 统计 - 游戏
        "game": {
            "thLable": {
                "date": "日期",
                "month": "月份",
                "game": "游戏",
                "playerBet": "玩家投注",
                "platformCommission": "平台抽水",
                "platformMultiCommission": "平台盈亏",
                "AIPnL": "机器人盈亏",
                "total": "总计",
                "platformGold": "平台盈亏",
                "playerBetChild": "玩家投注（子孙代理）",
                "platformCommissionChild": "平台抽水（子孙代理）",
                "platformMultiCommissionChild": "平台盈亏（子孙代理）",
                "AIPnLChild": "机器人盈亏（子孙代理）",
                "totalChild": "总计（子孙代理）",
                "platformGoldChild": "平台盈亏（子孙代理）",
            }
        },
    },
    
    // 代理
    "agency": {
        "child": "子代理",

        "contacts": {
            // Dialog
            "createDialog": {
                "title": "新增子代理",
                "parentName": "父级",
                "name": "名称",
                "nameplaceholder": "公司名称",
            },
            "updateDialog": {
                "title": "新增子代理",
                "sort": "排序",
                "sortPlaceholder": "数字越小越靠前",
                "name": "名称",
                "nameplaceholder": "公司名称",
            },
            "destroyDialog": {
                "title": "提示",
                "sort": "排序",
                "sortPlaceholder": "数字越小越靠前",
                "name": "名称",
                "nameplaceholder": "公司名称",

                "askText": '确定删除 <strong class="text-danger-custom">{name}</strong> 吗？',
                "desc": "所有成员和 AccessKey 将被同时禁用。",
            },
            "memberCreateDialog": {
                "title": "新增成员",

                "orgName": "代理",
                "email": "登录邮箱",
                "emailPlaceholder": "请输入登录邮箱",
                "pwd": "登录密码",
                "pwdPlaceholder": "请输入初始化密码",
                "type": "类型",
                "name": "姓名",
                "tel": "联系电话",
                "tele": "移动电话",
            },
            "memberUpdateDialog": {
                "title": "编辑成员",

                "type": "类型",
                "name": "姓名",
                "tel": "联系电话",
                "tele": "移动电话",
                "pwd": "登录密码",
                "pwdPlaceholder": "重置登录密码",

                "confirm": "保存",
            },

            "thLable": {
                "orgName": "代理",
                "name": "姓名",
                "email": "邮箱",
                "type": "类型",
                "status": "状态",
                "updated": "更新时间",
                "created": "创建时间",
                "operation": "操作",
                "detail": "详情",
                "tel": "联系电话",
                "tele": "移动电话",
                "userEmail": "登录邮箱",
            },

            "askText": "确定{status}该代理吗？",
            "memberAskText": "还没有管理员？",
        },
        "setting": {
            "info": "基本信息",
            "rate": "抽佣比例",
            "rateNext": "下月抽佣",
            "totalIn": "累计转入",
            "totalCoin": "累计发放",
            "currentCoin": "当前持有",
            // Dialog
            "rateDialog": {
                "title": "抽佣比例",
                "rateNext": "百分比"
            },

            "avail-ip": "IP白名单（API接口）",
            "availIPAskText": "还没有 IP 白名单？",
            "availIPAdd": "立即添加",
            "IPLabel": "IP地址",
            // Dialog
            "updateIPDialog": {
                "title": "管理IP白名单",
                "ip": "IP地址\xa0"
            },

            "secret": "访问密钥",
            "secretUpdateAskText": "确定{status}该 AccessKey 吗？",
            "secretAskText": "还没有 AccessKey？",
            "secretAdd": "立即添加",
            // Dialog
            "createSecretDialog": {
                "title": "提示",
                "askText": '确定创建 <strong class="text-danger-custom">AccessKey</strong> 吗？'
            },
            "updateSecretDialog": {
                "title": "提示",
                "askText": '确定更新 <strong class="text-danger-custom">AccessKey</strong> 吗？',
                "text": '更新后之前 <strong class="text-danger-custom">AccessKey</strong> 将无法使用。'
            },

            "game": "接入游戏",
        },
        "avail-ip": {
            "thLable": {
                "orgName": "代理名称",
                "ip": "IP地址",
                "status": "状态",
                "created": "创建时间",
                "operation": "操作",
                "detail": "详情",
                "updated": "更新时间",
            },
            "confirm": "添加",
            "cancel": "取消",
        },
    },

    // 游戏
    "game": {
        "cardPoker": {
            "blackhead": "黑桃",
            "redHeart": "红桃",
            "plum": "梅花",
            "square": "方块",
        },

        "user": {
            "checkMoreDetails": "查看",

            "thLable": {
                "time": "时间",
                "orgName": "代理",
                "gameId": "游戏",
                "accountId": "玩家账号",
                "role": "玩家类型",
                "access": "玩家状态",
                "roomId": "房间ID",
                "sceneId": "场景类型",
                "betBase": "底分",
                "coinsHave": "持有金币",
                "gainGold": "金币盈亏",
                "platformCommission": "平台抽水",
                "initGold": "起始金币",
                "ownGold": "结束金币",
                "operation": "操作",
                "detail": "详情",
                "createIp": "注册IP",
                "createTime": "注册时间",
                "loginIp": "最后登录IP",
                "loginTime": "最后登录时间",
                "ip": "IP地址",
                "address": "地址",
                "devices": "设备",
                "browser": "浏览器",
                "sn": "订单号",
                "type": "类型",
                "status": "状态",
                "amount": "金币数量",
                "loginCount": "登录次数",
            },

            // Dialog
            "dialog": {
                "title": "玩家信息",
                "info": "基本信息",
                "login-log": "最近登录",
                "order-log": "最近订单",
                "game-log": "最近游戏",
            },
            "dialogUpdate": {
                "title": "编辑玩家",
                "accountId": "玩家账号",
                "role": "玩家类型",
                "access": "玩家状态",
                "isKick": "立即踢出",
            }
        },
        "log": {
            "classify": {
                "play": "对战棋牌",
                "multi": "百人棋牌",
                "slot": "老虎机",
            },
            "thLable": {
                "time": "时间",
                "leaveTime": "离场时间",
                "orgName": "代理",
                "gameId": "游戏",
                "accountId": "玩家账号",
                "roomId": "房间ID",
                "sceneId": "场景类型",
                "spinType": "免费游戏",
                "status": "状态",
                "role": "庄闲",
                "betBase": "底分",
                "betNum": "投注",
                "betNumValid": "有效投注",
                "gainGold": "金币盈亏",
                "platformCommission": "平台抽水",
                "platformMultiCommission": "平台盈亏",
                "platformGold": "平台盈亏",
                "initGold": "起始金币",
                "ownGold": "结束金币",
                "playerType": "玩家类型",
                "operation": "操作",
                "detail": "明细",
                "replay": "回放",
                "details": "详情",
            },

            //Dialog
            "dialog": {
                "title": "金币明细",
                "type": "类型",
                "gold": "金币",
                "total": "总计",
                "gainGold": "金币盈亏",
                "platformCommission": "平台抽水",
                "settlement": "结算",
                "initGold": "起始金币",
                "ownGold": "结束金币",
            },
            "replayMahjong": {
                "title": "游戏回放",
                "gameName": "游戏",
                "roomId": "房间ID",
                "reportId": "战绩ID",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "betBase": "底分",
                "seat1": "座位1",
                "seat2": "座位2",
                "seat3": "座位3",
                "seat4": "座位4",

                "dot": "筒",
                "bamboo": "条",
                "character": "万",
                "clockwise": "顺时针",
                "counterclockwise": "逆时针",
                "opposite": "对方",
                "exclude": " 定缺",
                "playerExcludeds": "玩家定缺牌：",
                "playerSelectColor": " 玩家选定定缺牌",
                "win": " 胡牌",
                "kong": " 杠牌",
                "pong": " 碰牌",
                "discard": " 打牌",
                "draw": " 摸牌",
                "pass": "过",
                "playerOperate": "玩家可选操作：",
                "windy": "刮风",
                "windy-b": "刮风-巴杠",
                "windy-s": "刮风-直杠",
                "raining": "下雨",
                "kongWin": "杠上花",
                "ownDraw": "自摸",
                "coins": "金币",
                "settlement": "牌局结算",
                "total": "总计：",
                "gainGold": "，金币盈亏：",
                "pumpGold": "，平台抽水：",
                "initGold": "起始金币：",
                "ownGold": "，结束金币：",
                "roomInfo": "房间信息（游戏、玩家信息）",
                "startNewRound": "开始游戏，庄家",
                "cards": " 手牌：",
                "cardExchanged": "选择换三张：",
                "exchanged": "换牌：",
                "doneExcluded": "换三张完成",
                "playerExcluded": "玩家定缺：",
                "curPlayer": "当前操作玩家",
                "system": "系统",
                "AIControl": "玩家托管",
                "cancelAIControl": "取消托管",
                "isLeave": "离开",
                "playerOffline": " 离线",
                "playerReconnect": " 重连",

                "billType": [" 桌费用"," 杠牌"," 胡牌"," 陪叫"," 花猪"," 退税"," 呼叫转移"," 牌局结算"," 牌局投注"],
            },
            "replayNiuniu": {
                "title": "游戏回放",
                "gameName": "游戏",
                "roomId": "房间ID",
                "reportId": "战绩ID",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "betBase": "底分",
                "seat1": "座位1",
                "seat2": "座位2",
                "seat3": "座位3",
                "seat4": "座位4",
                "seat5": "座位5",

                "blackhead": "黑桃",
                "redHeart": "红桃",
                "plum": "梅花",
                "square": "方块",
                "clockwise": "顺时针",
                "times": "倍",
                "robDealerMulti": " 可抢庄倍数：",
                "addAnteMulti": " 可抢押注数：",
                "player": "玩家：",
                "total": "总计：",
                "gainGold": "，金币盈亏：",
                "pumpGold": "，平台抽水：",
                "initGold": "起始金币：",
                "ownGold": "，结束金币：",
                "settlement": "牌局结算",
                "roomInfo": "房间信息（游戏、玩家信息）",
                "startNewRound": "开始游戏",
                "startRobDealer": "开始抢庄",
                "playerRobDealer": " 抢庄倍数：",
                "notRobDealer": "不抢",
                "system": "系统",
                "dealerChanged": " 抢庄成功",
                "startAddAnte": "开始押注",
                "playerAddAnte": " 押注倍数：",
                "notAddAnte": "不押",
                "addAnteFinish": "押注完成",
                "cards": " 手牌：",
                "startPlayCards": "开始选牌",
                "playCards": " 选牌：",
                "notPlayCards": "未选",
                "playCardsFinish": "选牌完成",
                "startOpenCard": "开始摊牌",
                "playOpenCard": " 摊牌",
                "openCardFinish": "摊牌完成",
            },
            "replayZjh": {
                "title": "游戏回放",
                "gameName": "游戏",
                "roomId": "房间ID",
                "reportId": "战绩ID",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "betBase": "底分",
                "seat1": "座位1",
                "seat2": "座位2",
                "seat3": "座位3",
                "seat4": "座位4",
                "seat5": "座位5",

                "blackhead": "黑桃",
                "redHeart": "红桃",
                "plum": "梅花",
                "square": "方块",
                "player": "玩家：",
                "total": "总计：",
                "gainGold": "，金币盈亏：",
                "pumpGold": "，平台抽水：",
                "initGold": "起始金币：",
                "ownGold": "，结束金币：",
                "settlement": "牌局结算",
                "roomInfo": "房间信息（游戏、玩家信息）",
                "startNewRound": "开始游戏",
                "coins": "金币",
                "cards": " 手牌：",
                "addBet1": "跟注",
                "addBet2": "加注",
                "addBet3": "比牌",
                "addBet4": "底分",
                "curPlay": "切换到 ",
                "operation": "玩家操作",
                "abandonCard": " 弃牌",
                "lookCard": " 看牌：",
                "compareCard": " 比牌 ",
                "compareCardResult": "比牌结果：",
                "win": "赢",
                "lose": "输",
                "notify": " 孤注一掷通知",
                "guZhuYiZhi": " 孤注一掷",
                "succeed": "成功",
                "failed": "失败",
                "roundMaxTurn": "轮数上限比牌：",
                "timeOutProject": " 超时保护",
                "on": "启用",
                "off": "禁用",
                "system": "系统",
                "playerOffline": " 离线",
                "playerReconnect": " 重连",
            },
            "replayDzmj": {
                "title": "游戏回放",
                "gameName": "游戏",
                "roomId": "房间ID",
                "reportId": "战绩ID",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "betBase": "底分",
                "seat1": "座位1",
                "seat2": "座位2",
                "seat3": "座位3",
                "seat4": "座位4",

                "dot": "筒",
                "bamboo": "条",
                "character": "万",
                "zi": ["东", "南", "西", "北", "發", "白", "中"],
                "hua": ["春", "夏", "秋", "冬", "梅", "兰", "竹", "菊"],
                "clockwise": "顺时针",
                "counterclockwise": "逆时针",
                "opposite": "对方",
                "exclude": " 定缺",
                "playerExcludes": "玩家定缺牌：",
                "playerSelectColor": " 玩家选定定缺牌",
                "win": " 胡牌",
                "kong": " 杠牌",
                "pong": " 碰牌",
                "discard": " 打牌",
                "draw": " 摸牌",
                "pass": "过",
                "playerOperate": "玩家可选操作：",
                "windy": "刮风",
                "windy-b": "刮风-巴杠",
                "windy-s": "刮风-直杠",
                "raining": "下雨",
                "kongWin": "杠上花",
                "ownDraw": "自摸",
                "coins": "金币",
                "settlement": "牌局结算",
                "total": "总计：",
                "gainGold": "，金币盈亏：",
                "pumpGold": "，平台抽水：",
                "initGold": "起始金币：",
                "ownGold": "，结束金币：",
                "roomInfo": "房间信息（游戏、玩家信息）",
                "startNewRound": "开始游戏，庄家",
                "cards": " 手牌：",
                "cardExchanged": " 选择换三张：",
                "exchanged": "换牌：",
                "doneExcluded": "换三张完成",
                "playerExcluded": "玩家定缺：",
                "curPlayer": "当前操作玩家",
                "AIControl": "玩家托管",
                "cancelAIControl": "取消托管",
                "isLeave": "离开",
                "system": "系统",
                "playerOffline": " 离线",
                "playerReconnect": " 重连",

                "playerChiCard": " 吃牌",
                "playerTingCard": " 听牌",
                "playerBaoTing": " 报听",
                "playHua": " 摸花牌【%{cards}】补牌【%{newCards}】",
                "huaCard": " 花牌",
                "roundPattern": " 番型：",
                "roundPatternScore": " 总倍数：",
                "unitMultiple": "倍",
                "patternList": {
                    "11": "大四喜×88",
                    "12": "大三元×88",
                    "13": "绿一色×88",
                    "14": "九莲宝灯×88",
                    "15": "四杠×88",
                    "16": "连七对×88",
                    "17": "十三幺×88",
                    "18": "清幺九×64",
                    "19": "小四喜×64",
                    "20": "小三元×64",
                    "21": "字一色×64",
                    "22": "四暗刻×64",
                    "23": "一色双龙会×64",
                    "24": "一色四同顺×48",
                    "25": "一色四节高×32",
                    "26": " 一色四步高×32",
                    "27": "三杠×32",
                    "28": "混幺九×32",
                    "29": "七对×24",
                    "30": "七星不靠×24",
                    "31": "全双刻×24",
                    "32": "清一色×24",
                    "33": "一色三同顺×24",
                    "34": "一色三节高×24",
                    "35": "全大×24",
                    "36": "全中×24",
                    "37": "全小×24",
                    "38": "清龙×16",
                    "39": "三色双龙会×16",
                    "40": "一色三步高×16",
                    "41": "全带五×16",
                    "42": "三同刻×16",
                    "43": "三暗刻×16",
                    "44": "全不靠×12",
                    "45": "组合龙×12",
                    "46": "大于五×12",
                    "47": "小于五×12",
                    "48": "三风刻×12",
                    "49": "花龙×8",
                    "50": "推不倒×8",
                    "51": "三色三同顺×8",
                    "52": "三色三节高×8",
                    "53": "无番和×8",
                    "54": "妙手回春×8",
                    "55": "海底捞月×8",
                    "56": "杠上开花×8",
                    "57": "抢杠和×8",
                    "58": "碰碰和×6",
                    "59": "混一色×6",
                    "60": "三色三步高×6",
                    "61": "五门齐×6",
                    "62": "全求人×6",
                    "63": "双暗杠×6",
                    "64": "双箭刻×6",
                    "65": "全带幺×4",
                    "66": "不求人×4",
                    "67": "双明杠×4",
                    "68": "和绝张×4",
                    "69": "箭刻×2",
                    "70": "圈风刻×2",
                    "71": "门风刻×2",
                    "72": "门前清×2",
                    "73": "平和×2",
                    "74": "四归一×2",
                    "75": "双同刻×2",
                    "76": "双暗刻×2",
                    "77": "暗杠×2",
                    "78": "断幺×2",
                    "79": "一般高×1",
                    "80": "喜相逢×1",
                    "81": "连六×1",
                    "82": "老少副×1",
                    "83": "幺九刻×1",
                    "84": "明杠×1",
                    "85": "缺一门×1",
                    "86": "无字×1",
                    "87": "边张×1",
                    "88": "坎张×1",
                    "89": "单钓将×1",
                    "90": "自摸×1",
                    "91": "花牌×1",
                },

                "billType": [" 桌费用", " 杠牌", " 胡牌", " 陪叫", " 花猪", " 退税", " 呼叫转移", " 牌局结算", " 牌局投注"],
            },
            "detailRbwar": {
                "title": "游戏详情",
                "red": "红",
                "black": "黑",
                "special": "幸运一击",
                "takesAll": "系统通吃",
                "earn": "赢",
                "loss": "输",
                "yes": "是",
                "no": "否",

                "scattered": "散牌",
                "pair": "对子",
                "straight": "顺子",
                "goldFlower": "金花",
                "straightGold": "同花顺",
                "leopard": "豹子",

                "initGold": "起始金币",
                "ownGold": "结束金币",
                "type": "类型",
                "gainGold": "金币盈亏",
                "playerGold": "玩家金币",
                "betNum": "投注",
                "betNumValid": "有效投注",
                "betNumTotal": "投注总计",
                "settlement": "结算",
                "platformGold": "平台盈亏",
            },
            "detailBaccarat": {
                "title": "游戏详情",
                "dealer": "庄",
                "play": "闲",
                "dealerPair": "庄对",
                "draw": "和",
                "playPair": "闲对",
                "earn": "赢",
                "loss": "输",
                "yes": "是",
                "no": "否",
                "addCard": "补牌",

                "initGold": "起始金币",
                "ownGold": "结束金币",
                "type": "类型",
                "gainGold": "金币盈亏",
                "playerGold": "玩家金币",
                "betNum": "投注",
                "betNumValid": "有效投注",
                "betNumTotal": "投注总计",
                "settlement": "结算",
                "platformGold": "平台盈亏",
            },
            "detailSlot": {
                "title": "游戏详情",
                "yes": "是",
                "no": "否",
                "freeGame": "免费游戏",
                "freeGameTrigger": "触发免费游戏",
                "freeGameTimes": "免费游戏次数",
                "freeMulti": "奖励倍数",
                "betNumTotal": "投注总计",
                "totalWin": "总赢取",
                "gainGold": "金币盈亏",
                "platformGold": "平台盈亏",
                "initGold": "起始金币",
                "ownGold": "结束金币",
            },
        },
        "login-log": {
            "thLable": {
                "time": "时间",
                "orgName": "代理",
                "gameId": "游戏",
                "accountId": "玩家账号",
                "address": "地址",
                "ip": "IP地址",
                "devices": "设备",
                "browser": "浏览器",
            },
            "dialog": {
                "title": "金币明细",
                "type": "类型",
                "gold": "金币",
                "total": "总计",
                "gainGold": "金币盈亏",
                "platformCommission": "平台抽水",
            },
        },
        "player-bet": {
            "betHour": "小时",
            "betDay": "天",
            "betMonth": "月",
            "thLable": {
                "hour": "小时",
                "day": "日期",
                "month": "月份",
                "orgName": "代理",
                "gameId": "游戏",
                "accountId": "玩家账号",
                "sceneId": "场景类型",
                "number": "记录条数",
                "betBase": "底分",
                "betNum": "投注",
                "gainGold": "金币盈亏",
                "platformCommission": "平台抽水（平台盈亏）",
                "uid": "玩家ID",
            },
        },
        "mahjong": {
            "index": {
                "gameStatus": "游戏状态",
                "onlineTotalPlayer": "游戏人数",
                "AIQuantity": "AI 数量",
                "gameManage": "游戏管理",
                "gameLog": "游戏记录",
                "gameSetting": "游戏设置",                
            },
            "robot": {
                "orgName": "代理",
                "type": "类型",
            },
            "setting": {
                "AIStatus": "AI状态：",
                "askText": "确定{status}该 AI 吗？",

                "generalSetup": "常规设置",
                "betMax": "封顶番数：",
                "noCap": "不封顶",
                "mahjongTimes": "番",
                "mahjongTimesPlaceholder": "请输入番数",
                "pump": "抽水方式：",
                "pumpTypeEnd": "结算抽水百分比",
                "pumpTypePercent": "实时抽水百分比",
                "pumpTypeFixed": "固定抽水金币",
                "pumpRatePlaceholder": "请输入番数",
                "pumpGoldPlaceholder": "请输入金币数",

                "ipLimit": "IP限制：",

                "gameSetup": "对局设置",
                "TDH": "天地胡：",
                "HSZ": "换三张：",
                "JXW": "夹心五：",
                "MQZZ": "门清中章：",
                "YJJD": "幺九将对：",

                "betBaseSetup": "底分设置",
                "betBase": "底分：",
                "betBasePlaceholder": "底分",
                "betTimes": "倍",
                "betTimesPlaceholder": "倍数",
                "goldLimit": "入场金币：",
                "goldMin": "最低入场金币",
                "goldMax": "最高入场金币，0为不限制",
                "leaveGold": "离场金币：",

                "AIGoldSetup": "AI 携带金币",
                "goldRange": "金币数：",
                "AIGoldMin": "最低金币",
                "AIGoldMax": "最高金币",

                "AICountSetup": "AI 数量",
                "AICount": "初始数量 | 最大数量",

                "AIGradeSetup": "AI 等级",
                "AIGrade": "简单 | 正常 | 困难",

                "AISpeedSetup": "AI 出牌速度",
                "AISpeed": "快速 | 正常 | 缓慢",

                "AIIncomeControl": "AI 收支表",
                "AIIncomeControlText": "（收入下限和收入上限必须连续且无间断）",
                "incomeMin": "收入下限",
                "incomeMax": "收入上限",
                "incomePlaceholder": "金币数",
                "playerLevel": "玩家等級",
                "robotLevel": "AI 等级",
               
                "addIncomeItem": "新增收支项",
            }
        },
        "niuniu": {
            "index": {
                "gameStatus": "游戏状态",
                "onlineTotalPlayer": "游戏人数",
                "AIQuantity": "AI 数量",
                "gameManage": "游戏管理",
                "gameLog": "游戏记录",
                "globalSetting": "全局设置",
                "sceneSetting": "场景设置", 
            },
            "robot": {
                "orgName": "代理",
                "type": "类型",
            },
            "setting-global": {
                "rebateSetup": "返利设置",
                "rebateBasePlayerCount": "基础人数：",
                "rebateBaseRate": "返利系数：",

                "waitMSSetup": "时间设置",
                "robDealerWaitMS": "抢庄时间：",
                "addAnteWaitMS": "下注时间：",
                "playWaitMS": "组牌时间：",

                "multiSetup": "倍率设置",
                "robDealerMulti": "抢庄倍数：",
                "playerAddAnteMulti": "押注倍数：",

                "AIActionRateSetup": "AI 权重设置",
                "AIRobDealer": "抢庄概率：",
                "AIAddAnte": "加倍概率：",

                "AIRebateMultiSetup": "AI 返利倍数",
                "AIGoldMulti": "收益倍数",
                "AIBaseMulti": "保底倍数",
                "addMultiItem": "新增收支项",

                "AIIncomeSetup": "AI 收益控制",
                "incomeMulti": "收入倍数",
                "incomeLevel": "盈亏等级",
                "incomeRate": "保底概率",
                "addIncomeItem": "新增收支项",

                "AIRebateSetup": "AI 返利控制",
                "rebateMulti": "返利倍数",
                "rebateLevel": "返利等级",
                "rebateRate": "必赢概率",
                "addRebateItem": "新增收支项",
            },
            "setting-scene": {
                "AIStatus": "AI状态：",
                "askText": "确定{status}该 AI 吗？",

                "generalSetup": "常规设置",
                "roomPlayerNum": "房间人数：",
                "roomPlayerNumPlaceholder": "请输入房间人数",
                "betMax": "封顶番数：",
                "noCap": "不封顶",
                "niuniuTimes": "番",
                "niuniuTimesPlaceholder": "请输入番数",
                "pump": "抽水方式：",
                "pumpTypeEnd": "结算抽水百分比",
                "pumpTypePercent": "实时抽水百分比",
                "pumpTypeFixed": "固定抽水金币",
                "pumpRatePlaceholder": "请输入番数",
                "pumpGoldPlaceholder": "请输入金币数",

                "ipLimit": "IP限制：",

                "gameSetup": "对局设置",
                "HaveFiveFlowerNN": "五花牛：",
                "HaveFourFlowerNN": "四花牛：",
                "HaveBoomNN": "炸弹：",
                "HaveFiveSmallNN": "五小牛：",

                "betBaseSetup": "底分设置",
                "betBase": "底分：",
                "betBasePlaceholder": "底分",
                "betTimes": "倍",
                "betTimesPlaceholder": "倍数",
                "goldLimit": "入场金币：",
                "goldMin": "最低入场金币",
                "goldMax": "最高入场金币，0为不限制",
                "leaveGold": "离场金币：",

                "AIGoldSetup": "AI 携带金币",
                "goldRange": "金币数：",
                "AIGoldMin": "最低金币",
                "AIGoldMax": "最高金币",

                "AICountSetup": "AI 数量",
                "AICount": "初始数量 | 最大数量",

                "AISpeedSetup": "AI 出牌速度",
                "AISpeed": "快速 | 正常 | 缓慢",
            }
        },
        "dzmj": {
            "index": {
                "gameStatus": "游戏状态",
                "onlineTotalPlayer": "游戏人数",
                "AIQuantity": "AI 数量",
                "playerGain": "玩家输赢",
                "averageWin": "平均赢分",
                "averageLose": "平均输分",
                "gameManage": "游戏管理",
                "gameLog": "游戏记录",
                "gameSetting": "游戏设置",
            },
        },
        "rbwar": {
            "index": {
                "gameStatus": "游戏状态",
                "onlineTotalPlayer": "游戏人数",
                "AIQuantity": "AI 数量",
                "gameManage": "游戏管理",
                "gameLog": "游戏记录",
                "globalSetting": "全局设置",
                "sceneSetting": "场景设置",
            },
            "robot": {
                "orgName": "代理",
                "type": "类型",
            },
            "setting-global": {
                "baseConfig": "基础配置",
                "SceneMaxPlayerNum": "场景最大玩家数量：",
                "InitRobotNum": "场景初始机器人数量：",
                "EmptyBetKickCount": "超过局数不下注踢出游戏：",
                "BetCountdown": "下注倒计时：",

                "betTimes": "倍",
                "unitMs": "毫秒",
                "unitAGame": "局",
                "unitOne": "人",

                "SettlementMulti": "区域赔率",
                "SettlementMulti-1": "红方：",
                "SettlementMulti-2": "黑方：",
                "SettlementMulti-3": "幸运一击",
                "SettlementMulti-3-1": "对子（9~A）：",
                "SettlementMulti-3-2": "顺子：",
                "SettlementMulti-3-3": "金花：",
                "SettlementMulti-3-4": "顺金：",
                "SettlementMulti-3-5": "豹子：",
            },
            "setting-scene": {
                "AIStatus": "AI状态：",
                "askText": "确定{status}该 AI 吗？",

                "betBaseSetup": "底分设置",
                "betBase": "底分：",
                "betBasePlaceholder": "底分",
                "betTimes": "倍",
                "betTimesPlaceholder": "倍数",
                "goldLimit": "入场金币：",
                "goldMin": "最低入场金币",
                "goldMax": "最高入场金币，0为不限制",
                "unlimited": '不限',

                "bet_max": "区域最大投注金币：",

                "coinSetup": "金币设置",
                "add_bet": "押注金币：",
                "add_bet-0": "第一项：",
                "add_bet-1": "第二项：",
                "add_bet-2": "第三项：",
                "add_bet-3": "第四项：",
                "add_bet-4": "第五项：",

                "AIGoldSetup": "AI 携带金币",
                "goldRange": "金币数：",
                "AIGoldMin": "最低金币",
                "AIGoldMax": "最高金币",

                "AICountSetup": "AI 数量",
                "AICount": "初始数量 | 最大数量",

                "AISpeedSetup": "AI 出牌速度",
                "AISpeed": "快速 | 正常 | 缓慢",
            }
        },
        "cq9" : {
            "detail" : {
                "title" : {
                    "page" : "CQ9 游戏细单",
                    "gameName" : "游戏名称：",
                    "gameBills" : "游戏明细",
                    "gameImg" : "游戏结果",
                    "gamePlayback" : "游戏回放",
                },
                "userInfo" : {
                    "roundid" : "单号：",
                    "gainGold" : "盈亏总计：",
                    "account" : "玩家账号：",
                    "paccount" : "代理账号：",
                }
            }
        }
    },

    // 个人中心
    "home": {
        // 个人资料
        "basicinfo": "个人资料",
        "email": "邮箱",
        "nickname": "昵称",

        // 修改密码
        "password": "修改密码",
        "currPwd": "当前密码",
        "newPwd": "新密码",
        "rePwd": "确认密码",
    },

    //订单
    "order": {
        "agency": {
            "thLable": {
                "sn": "订单号",
                "orgName": "代理",
                "type": "类型",
                "status": "状态",
                "amount": "金币数量",
                "created": "创建时间",
                "updated": "处理时间",
                "operation": "操作",
            },
            "dialog": {
                "title": "新增订单",
                "orgId": "代理",
                "amount": "金币",
                "amountPlaceholder": "金币数量",
            },

            "askText": '确定 <strong class="text-danger-custom">{type}</strong> 该订单吗？',
            "cancelText": "确定取消该订单吗？",

            "messages": {
                "handle-succeeded": "订单处理成功",
                "handle-failed": "订单处理失败！",

                "cancel-succeeded": "订单取消成功",
                "cancel-failed": "订单取消失败！",

                "gold-inadequate": "您的金币数量不足，请向上级代理申请转入",
            },

            "type": {
                "you": "您",
                "agent": "代理",
            },
        },
        "game": {
            "thLable": {
                "sn": "订单号",
                "orgName": "代理",
                "orgPlayerAccount": "玩家账号",
                "type": "类型",
                "status": "状态",
                "statusGame": "游戏状态",
                "statusAgency": "代理状态",
                "amount": "金币数量",
                "playerOldGold": "起始金币",
                "playerOwnGold": "结束金币",
                "created": "创建时间",
                "updated": "处理时间",
            }
        },
        "my": {
            "thLable": {
                "sn": "订单号",
                "orgName": "代理",
                "type": "类型",
                "status": "状态",
                "amount": "金币数量",
                "created": "创建时间",
                "updated": "处理时间",
                "operation": "操作",
            },
            "dialog": {
                "title": "新增订单",
                "orgId": "代理",
                "amount": "金币",
                "amountPlaceholder": "金币数量",
            },

            "askText": '确定 <strong class="text-danger-custom">{type}</strong> 该订单吗？',
            "cancelText": "确定取消该订单吗？",

            "messages": {
                "cancel-succeeded": "订单取消成功",
                "cancel-failed": "订单取消失败！",
            },
        },
        "record": {
            "thLable": {
                "time": "转账时间",
                "type": "转账类型",
                "targetName": "转账目标",
                "amount": "金币数量",
                "current": "持有金币",
                "orderType": "订单分类",
            },

            "transferTypes": [
                {
                    "label": "转入",
                    "value": "1"
                },
                {
                    "label": "转出",
                    "value": "2"
                },
                {
                    "label": "发放代理",
                    "value": "3"
                },
                {
                    "label": "代理转出",
                    "value": "4"
                },
                {
                    "label": "游戏转入",
                    "value": "5"
                },
                {
                    "label": "游戏转出",
                    "value": "6"
                },
            ],
        },
    },

    //系统
    "system": {
        "user": {
            "thLable": {
                "status": "状态",
                "email": "邮箱",
                "nickname": "昵称",
                "updated": "更新时间",
                "created": "创建时间",
                "operation": "操作",
                "detail": "详情",
                "loginLast": "最后登录时间",
                "loginFirst": "最早登录时间",
            },

            "askText": "确定{status}该用户吗？",

            // Dialog
            "createDialog": {
                "title": "新增用户",
                "email": "邮箱",
                "emailPlaceholder": "登录邮箱",
                "pwd": "密码",
                "pwdPlaceholder": "初始化密码",
                "nickname": "昵称",
            },
            "updateDialog": {
                "title": "编辑用户",
                "email": "邮箱",
                "emailPlaceholder": "登录邮箱",
                "pwd": "密码",
                "pwdPlaceholder": "初始化密码",
                "nickname": "昵称",
            },
        },
        "setting": {
            "auth": {
                "addPolicyGroup": "添加权限组",
                "policyGroup": "权限组",
                "groupUser": "授权用户",
                "groupPolicy": "授权策略",

                // Dialog
                "memberDialog": {
                    "title": "授权用户",
                    "emailKeyword": "邮箱",

                    "check": "选择",
                    "email": "邮箱",
                    "nickname": "昵称",
                    "agent": "代理",
                },
                "policyDialog": {
                    "title": "授权策略",

                    "unselected": "可选授权策略",
                    "selected": "已选授权策略",
                },
                "createDialog": {
                    "title": "新增权限组",

                    "name": "名称",
                    "desc": "描述",
                },
                "updateDialog": {
                    "title": "编辑权限组",

                    "sort": "排序",
                    "sortPlaceholder": "数字越小越靠前",
                    "name": "名称",
                    "desc": "描述",
                },
                "destroyDialog": {
                    "title": "提示",

                    "askText": '确定删除 <strong class="text-danger-custom">{name}</strong> 吗？'
                },
            },

            "risk": {
                "placeholder": {
                    "dateStart": "开始日期",
                    "dateEnd": "结束日期",
                    "gameType": "游戏类型",
                    "playerAccount": "玩家账号",
                    "ip": "IP地址",
                },
                "table": {
                    "light":"灯号",
                    "transferDiff":"转出倍数",
                    "profitTime":"盈利时间",
                    "profitDiff":"盈利差",
                    "date": "日期",
                    "gameType": "游戏类型",
                    "playerAccount": "玩家账号",
                    "totalBet": "投注总额",
                    "totalProfit": "盈亏总额",
                    "noBet": "投注笔数",
                    "winPercentage": "胜率",
                    "totalTransferIn": "转入总额",
                    "totalTransferOut": "转出总额",
                    "ipLogin": "最后登入IP",
                    "action": "操作",
                    "actionDetail": "详情",
                    "roomId": "房间ID",
                    "sceneType": "场景类型",
                    "status": "状态",
                    "profit": "盈亏",
                    "moneyStart": "起始额度",
                    "moneyEnd": "结束额度",
                    "device": "设备",
                },
            },

            "menu": {
                "1": {
                    "name": "首页",
                    "code": "index",
                    "desc": "",
                },
                "5": {
                    "name": "统计",
                    "code": "chart",
                    "desc": "",
                },
                "9": {
                    "name": "代理",
                    "code": "agency",
                    "desc": "",
                },
                "13": {
                    "name": "游戏",
                    "code": "game",
                    "desc": "",
                },
                "17": {
                    "name": "订单",
                    "code": "order",
                    "desc": "",
                },
                "21": {
                    "name": "系统",
                    "code": "system",
                    "desc": "",
                },
            },
        },
        "log": {
            "signin": {
                "thLable": {
                    "created": "登录时间",
                    "email": "登录邮箱",
                    "name": "姓名",
                    "type": "用户类型",
                    "ip": "IP地址",
                },
            }
        },
        "task": {
            "agencyGame": "基础",
            "agency": "代理",
            "earnAgency": "收益",
            "playerAgency": "玩家",
            "realAgency": "余额",

            "totalDay": "天统计",
            "totalMonth": "月统计",

            "thLable": {
                "timed": "日期",
                "month": "月份",
                "orgName": "代理",
                "gameName": "游戏",
                "status": "状态",
                "number": "处理次数",
                "childStatus": "状态（子孙代理）",
                "childNumber": "处理次数（子孙代理）",
            },

            // Dialog
            "dialog": {
                "title": "添加任务",
                "timed": "日期",
                "timedPlaceholder": "日期",
            }
        }
    },
    
    // 用戶
    "user": {
        "index": {
            "adminUser": "后台用戶",
            "gameUser": "游戏用戶",
        },
        "auth": {
            "relogin" : "重新登录",
            "login": {
                "signin": "用户登录",
                "email": "邮箱",
                "pwd": "密码",
                "submit": "登录",
            }
        }, 
    },

    // error
    "error": {
        "401": "页面未授权，或授权已过期",
        "402": "您的账户已在别处登录，请重新登录",
        "403": "没有权限",
        "404": "页面不存在",
        "43001": "参数错误",
        "43002": "密码错误",
        "43101": "账号不存在",
        "43102": "邮箱不存在",
        "43401": "账号被禁用",
        "43100": "订单不存在，请刷新页面重试",
        "43301": "订单已处理，不允许重复操作",
        "43300": "请重新添加订单后重试",
        "433001": "请刷新页面重试",
        "433002": "页面错误，请刷新页面重试",
        "43411": "代理人被禁用",
        "43801": "{type}当前持有金币为空",
        "43802": "{type}当前持有金币数量小于转出数量",
    }
}

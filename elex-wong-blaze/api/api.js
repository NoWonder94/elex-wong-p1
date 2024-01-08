// facebook
export const facebookUrl = params => $nuxt.$api.requestByGet('/hall/v2/auth/oauth/render/FACEBOOK', params);
// facebook
export const getFacebookInfo = params => $nuxt.$api.requestByGet('/hall/v2/auth/oauth/callback/FACEBOOK', params);
//  login
export const login = params => $nuxt.$api.requestByPost('/hall/v2/user/login', params);
// logo Img
export const getLogoImg = params => $nuxt.$api.requestByPost('/hall/v2/playChannel/getChannelInfo', params);
//查询渠道信息
export const getChannelInfo = params => $nuxt.$api.requestByPost('/hall/v2/playChannel/getChannelInfo', params);
// 查询渠道信息
export const getChannelId = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getChannelId', params);
//获取内嵌游戏地址
export const thirdUrl = params => $nuxt.$api.requestByPost('/single/gameUrl/list', params);
//  userinfo
export const userinfo = params => $nuxt.$api.requestByPost('/hall/v2/user/getUserInfo', params);
// 获取邮箱验证码
export const eamilSend = params => $nuxt.$api.requestByPost('/hall/v2/sample/eamilSend', params);

export const phoneSend = params => $nuxt.$api.requestByPost('/hall/v2/ynSms/send', params);
// 验证邮箱
export const emailSendAuth = params => $nuxt.$api.requestByPost('/hall/v2/sample/emailSendAuth', params);
// 邮箱验证登录
export const loginByEmail = params => $nuxt.$api.requestByPost('/hall/v2/user/loginByEmail', params);
//  registerUser
export const registerUser = params => $nuxt.$api.requestByPost('/hall/v2/user/registerUser', params);
//  hallJackpot
export const getHallJackpot = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getHallJackpot', params);
//  hallorderlist S
export const getHallOrderList = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getHallOrderList', params);
//  getHallJackpotUser
export const getHallJackpotUser = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getHallJackpotUser', params);
export const verifyUserPersonal = params => $nuxt.$api.requestByPost('/hall/v2/playUserPersonal/addUserPersonal', params);
export const getUserPersonal = params => $nuxt.$api.requestByPost('/hall/v2/playUserPersonal/getUserPersonal', params);
//  getByHallId
export const getByHallId = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getByHallId', params);
export const queryPayCurrency = params => $nuxt.$api.requestByPost('/hall/v2/defipay/queryPayCurrency', params);
export const defipayCreateOrder = params => $nuxt.$api.requestByPost('/hall/v2/defipay/createOrder', params);
export const withdrawPayoutOrder = params => $nuxt.$api.requestByPost('/hall/v2/defipay/createPayoutOrder', params);
export const getUserErrorNum = params => $nuxt.$api.requestByPost('/hall/v2/user/getUserErrorNum', params);
export const getChannelLevel = params => $nuxt.$api.requestByPost('/hall/v2/IdrPay/getChannelLevel', params);
//  winUserList
export const winUserList = params => $nuxt.$api.requestByPost('/hall/v2/user/winUserList', params);
export const playHallLinkConfig = params => $nuxt.$api.requestByPost('/hall/v2/playHall/playHallLinkConfig', params);
export const getVipList = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipList', params);
export const getLuckyNumber = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipDiceRanking', params);
export const getTime = params => $nuxt.$api.requestByPost('/hall/v2/playVip/getTime', params);
export const getvipDicee = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipDice', params);
export const getvipHeavenGoodsList = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipJackpotList', params);
export const getvipRainList = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipRainList', params);
export const getvipLevelRecordList = params => $nuxt.$api.requestByPost('/hall/v2/playLevelRecord/vipLevelRecordList', params);
export const getreceiveLevel = params => $nuxt.$api.requestByPost('/hall/v2/playLevelRecord/receiveLevel', params);
export const getGameTypeAndChannel = params => $nuxt.$api.requestByPost('/hall/v2/userInfo/getGameTypeAndChannel', params);
export const getUserBetInfo = params => $nuxt.$api.requestByPost('/hall/v2/userInfo/getUserBetInfo', params);
export const getUserBetInfoAllBetAndWin = params => $nuxt.$api.requestByPost('/hall/v2/userInfo/getUserBetInfoAllBetAndWin', params);
export const getPlayBaseGameChannel = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getPlayBaseGameChannel', params);
export const backWaterReceiveList = params => $nuxt.$api.requestByPost('/admin/backWaterReceive/backWaterReceiveList', params);
export const receiveBackWater = params => $nuxt.$api.requestByPost('/admin/backWaterReceive/receiveBackWater', params);
export const getUserRegisterConfig = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getUserRegisterConfig', params);
export const getBackWaterTermConfig = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getBackWaterTermConfig', params);
export const getPlayPageActivityList = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getPlayPageActivityList', params);

export const getvipGetDice = params => $nuxt.$api.requestByPost('/hall/v2/playVip/vipGetDice', params);
export const getUserLanguage = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getUserLanguage', params);
//wallet-deposit QRcode
export const DepositQRcode = params => $nuxt.$api.requestByPost('/hall/v2/playGold/initUserWallet', params);
//wallet-Withdraw userWithdraw
export const userWithdraw = params => $nuxt.$api.requestByPost('/hall/v2/playGold/userTransfer', params);
//wallet-Swap Swap
export const swapNow = params => $nuxt.$api.requestByPost('/hall/v2/playGold/userCoinTransition', params);
export const getSportsByChannel = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getSportsByChannel', params);
export const getExtendChannelInfo = params => $nuxt.$api.requestByPost('/hall/v2/playChannel/getExtendChannelInfo', params);
export const getPlayFree = params => $nuxt.$api.requestByPost('/single/gameUrl/getPlayFree', params);
//wallet-Swap walletType
export const walletType = params => $nuxt.$api.requestByPost('/hall/v2/playGold/userWallet', params);
export const channelList = params => $nuxt.$api.requestByPost('/hall/v2/playPayDrawingConfig/getList', params);
export const userReturnWaterDetail = params => $nuxt.$api.requestByPost('/hall/v2/playVip/userReturnWaterDetail', params);
export const userReturnWater = params => $nuxt.$api.requestByPost('/hall/v2/playVip/userReturnWater', params);
export const playGoldRecord = params => $nuxt.$api.requestByPost('/hall/v2/playGoldRecord/getUserGoldList', params);
export const doBetAction = params => $nuxt.$api.requestByPost('/single/standAloneOrder/singleAddGameOrder?', params);
export const choosePicAction = params => $nuxt.$api.requestByPost('/single/standAloneOrder/singleGameStart', params);
// web-Mines获取游戏进度
export const minesProcess = params => $nuxt.$api.requestByPost('/single/standAloneOrder/userMinesDetail', params);
// mines cashout
export const minesCashOut = params => $nuxt.$api.requestByPost('single/standAloneOrder/singleGameEnd', params);
// mines config
export const minesConfig = params => $nuxt.$api.requestByPost('single/minesConfig/list', params);
// KenoSingle - Config
export const kenoConfig = params => $nuxt.$api.requestByPost('/single/kenoConfig/list?', params);
// Keno
export const kenoHistory = params => $nuxt.$api.requestByPost('/keno/kenoPlayBase/baseList?', params);

//幸运大转盘
export const getbigWheelDetail = params => $nuxt.$api.requestByPost('/single/playGameBig/bigWheelDetail', params);
export const getbigWheelList = params => $nuxt.$api.requestByPost('/single/playGameBig/bigWheelList', params);
export const getgetUserJoinBig = params => $nuxt.$api.requestByPost('/single/playGameBig/getUserJoinBig', params);
export const getbigWheelStart = params => $nuxt.$api.requestByPost('/single/playGameBig/bigWheelStart', params);
//limbo
export const getLotteryRecord = params => $nuxt.$api.requestByPost('/single/standAloneOrder/getLotteryRecord', params);
export const getUserOrderList = params => $nuxt.$api.requestByPost('/single/standAloneOrder/getUserOrderList', params);
export const singleAddGameOrder = params => $nuxt.$api.requestByPost('/single/standAloneOrder/singleAddGameOrder', params);
export const singleGameStart = params => $nuxt.$api.requestByPost('/single/standAloneOrder/singleGameStart', params);
export const getAutoGame = params => $nuxt.$api.requestByPost('/single/standAloneOrder/getAutoGame', params);
export const closeAutoGame = params => $nuxt.$api.requestByPost('/single/standAloneOrder/closeAutoGame', params);
//用户
export const updateUserNameOrAvatar = params => $nuxt.$api.requestByPost('/hall/v2/user/updateUserNameOrAvatar', params);
export const detailsByPlayId = params => $nuxt.$api.requestByPost('/hall/v2/userInfo/detailsByPlayId', params);
export const getUserBank = params => $nuxt.$api.requestByPost('/hall/v2/playUserBank/getUserBank', params);
export const addUserBank = params => $nuxt.$api.requestByPost('/hall/v2/playUserBank/addUserBank', params);
export const updateUserBank = params => $nuxt.$api.requestByPost('/hall/v2/playUserBank/upUserBank', params);
// 代理
export const agencyNextLvUserAwardList = params => $nuxt.$api.requestByPost('/hall/v2/playGoldRecord/lowerUserReward', params);
export const agencyReceiveAwardList = params => $nuxt.$api.requestByPost('/hall/v2/playReceiveRecord/list', params);
export const agencyAwardReceive = params => $nuxt.$api.requestByPost('/hall/v2/playReceiveRecord/addSave', params);
export const agencyAwardNum = params => $nuxt.$api.requestByPost('/hall/v2/playGoldRecord/rewardCount', params);
//crash recordList
export const carshRecord = params => $nuxt.$api.requestByPost('/explode/ht/order/baseList', params);
// crash allPlayer
export const allPlayerList = params => $nuxt.$api.requestByPost('/explode/order/orderList', params);
// crash orderListall
export const orderList = params => $nuxt.$api.requestByPost('/explode/ht/order/orderList', params);

// solots
export const solotsGameing = params => $nuxt.$api.requestByPost('/single/crocoGaming/user/getGameUrl', params);
// 开元棋牌  登录游戏
export const channelHandle = params => $nuxt.$api.requestByPost('/single/kaiyuan/channelHandle', params);
// 开元棋牌  上分

export const updatePoints = params => $nuxt.$api.requestByPost('/single/kaiyuan/points', params);
//查询下注区间
export const hallBetSection = params => $nuxt.$api.requestByPost('/hall/playHall/hallBetSection', params);
//查询ip地址
export const findChannelByIp = params => $nuxt.$api.requestByPost('/hall/v2/playHall/findChannelByIp', params);
// 开元棋牌  下分

export const losePoints = params => $nuxt.$api.requestByPost('/single/kaiyuan/xiafen', params);

// sport

// 体育token
export const getLoginToken = params => $nuxt.$api.requestByPost('/sports/sports/getLoginToken', params);

// 刷新体育token
export const getRefreshToken = params => $nuxt.$api.requestByPost('/sports/sports/getRefreshToken', params);

// 体育类型
export const getSportsClass = params => $nuxt.$api.requestByPost('/sports/sports/getSportsClass', params);

// 体育赛事
export const getSportsLeague = params => $nuxt.$api.requestByPost('/sports/sports/getSportsLeague', params);

//下注上下限金额
export const getUserOddsType = params => $nuxt.$api.requestByGet('/sports/sports/getUserOddsType', params);

// 体育赛事投注类型

export const getSportsBetType = params => $nuxt.$api.requestByPost('/sports/sports/getSportsBetType', params);
//大厅全部游戏
export const getAllGameList = params => $nuxt.$api.requestByPost('/hall/v2/playHall/getAllGameList', params);

// playRed

export const playRed = params => $nuxt.$api.requestByPost('/hall/v2/playRed/add', params);

// redBagSeve

export const redBagSeve = params => $nuxt.$api.requestByPost('/hall/v2/playRedRecord/add', params);

// redBagRecordList

export const redBagRecordList = params => $nuxt.$api.requestByPost('/hall/v2/playRedRecord/recordList', params);

// cha Message list

export const historyMessageList = params => $nuxt.$api.requestByPost('/hall/v2/playMessage/list', params);

// AutoBet
export const saveExplodeAutoBet = params => $nuxt.$api.requestByPost('/explode/order/saveExplodeAutoBet', params);

export const saveExplodeAutoBet1 = params => $nuxt.$api.requestByPost('/keno/kenoPlayOrder/saveExplodeAutoBet', params);


// stopBet
export const stopExplodeAutoBet = params => $nuxt.$api.requestByPost('/explode/order/stopExplodeAutoBet', params);

export const stopExplodeAutoBet1 = params => $nuxt.$api.requestByPost('/keno/kenoPlayOrder/stopExplodeAutoBet', params);

// CollectList
export const getUserCollect = params => $nuxt.$api.requestByPost('/sports/sportsOrder/getUserCollect', params);

// save Collect
export const saveUserCollect = params => $nuxt.$api.requestByPost('/sports/sportsOrder/saveUserCollect', params);

// del Collect
export const delUserCollect = params => $nuxt.$api.requestByPost('/sports/sportsOrder/delUserCollect', params);
// del webEmailList
export const webEmailList = params => $nuxt.$api.requestByPost('/hall/v2/playUserEmail/getReadStatus', params);

export const userEmailList = params => $nuxt.$api.requestByPost('/hall/v2/playUserEmail/webEmailList', params);

export const getNoticeStatus = params => $nuxt.$api.requestByPost('/hall/v2/playUserNotice/getReadStatus', params);
export const webNoticeList = params => $nuxt.$api.requestByPost('/hall/v2/playUserNotice/webNoticeList', params);
export const deleMail = params => $nuxt.$api.requestByPost('/hall/v2/playUserNotice/deleMail', params);
export const deleUserMail = params => $nuxt.$api.requestByPost('/hall/v2/playUserEmail/deleMail', params);
export const updateNoticeStatus = params => $nuxt.$api.requestByPost('/hall/v2/playUserNotice/updateReadStatus', params);
export const updateRewardStatus = params => $nuxt.$api.requestByPost('/hall/v2/playUserEmail/updateRewardStatus', params);
export const updateEmailStatus = params => $nuxt.$api.requestByPost('/hall/v2/playUserEmail/updateReadStatus', params);
//获取奖池信息
export const getByPlayIdJackpot = params => $nuxt.$api.requestByPost('/hall/playJackpotConfig/getByPlayIdJackpot', params);

export const fileUpload = params => $nuxt.$api.requestByPost('/file/upload', params);

export const playPayDrawingConfig = params => $nuxt.$api.requestByPost('/hall/v2/playPayDrawingConfig/list', params);

export const getCurrency = params => $nuxt.$api.requestByPost('/hall/v2/playCurrency/getCurrency', params);

export const threePay = params => $nuxt.$api.requestByPost('/hall/v2/threePay/pay', params);

export const getBankCodeList = params => $nuxt.$api.requestByPost('/hall/v2/threePay/getBankCodeList', params);

export const getTxMoneySxf = params => $nuxt.$api.requestByPost('/hall/v2/IdrPay/getTxMoneySxf', params);

export const getSxfWithhold = params => $nuxt.$api.requestByPost('/hall/v2/IdrPay/getSxfWithhold', params);

export const cashAuth = params => $nuxt.$api.requestByPost('/hall/v2/threePay/cashAuth', params);

export const getChannelActiviry = params => $nuxt.$api.requestByPost('/hall/v2/IdrPay/getChannelActiviry', params);

export const getLotteryBase = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryBase', params);

export const getLotteryInfo = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryInfo', params);

export const placeBet = params => $nuxt.$api.requestByPost('/single/lotteryOrder/placeBet', params);

export const getLotteryUserOrder = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryUserOrder', params);

export const getLotteryBaseList = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryBaseList', params);

export const getLotteryOrder = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryOrder', params);

export const getSportsCurrency = params => $nuxt.$api.requestByPost('/sports/sports/getSportsCurrency', params);

export const sendVerification = params => $nuxt.$api.requestByPost('/hall/v2/ynSms/send', params);

export const sendAuth = params => $nuxt.$api.requestByPost('/hall/v2/ynSms/sendAuth', params);

export const resetPassword = params => $nuxt.$api.requestByPost('/hall/v2/user/resetPassword', params);

export const getLotteryOpenConfig = params => $nuxt.$api.requestByPost('/single/lotteryOrder/getLotteryOpenConfig', params);

export const loginByPhone = params => $nuxt.$api.requestByPost('/hall/v2/user/loginByPhone', params);

export const registerUserByphone = params => $nuxt.$api.requestByPost('/hall/v2/user/registerUserByphone', params);

//查询活动任务
export const getPlayRewardList = params => $nuxt.$api.requestByPost('/hall/v2/playReward/getPlayRewardList', params);
//活动奖励领取
export const rewardRecord = params => $nuxt.$api.requestByPost('/hall/v2/playReward/rewardRecord', params);
//web-第三方钱包登录
export const loginWallet = params => $nuxt.$api.requestByPost('/hall/v2/user/loginWallet', params);

// 币种转换手续费
export const getTransitionSxf = params => $nuxt.$api.requestByPost('/hall/v2/playCurrency/getTransitionSxf', params)

//kone下方table记录
export const koneOrderList = params => $nuxt.$api.requestByPost('/keno/kenoPlayOrder/orderList', params)
//代理注册
export const userApproval = params => $nuxt.$api.requestByPost('/admin/agentUserApproval/userApproval', params)
//查询代理注册配置信息
export const selectAgentRegisterConfig = params => $nuxt.$api.requestByPost('admin/agentRegisterConfig/selectAgentRegisterConfig', params)

export const getRegisterDict = params => $nuxt.$api.requestByPost('admin/agentRegisterConfig/getRegisterDict', params)
//代理登录
export const agentUserlogin = params => $nuxt.$api.requestByPost('/admin/agentLogin/agentUserlogin', params)
//币种记录
export const getUnlockRecord = params => $nuxt.$api.requestByPost('/hall/v2/playGoldRecord/getUnlockRecord', params)
//用户点击数
export const agentUserClikNum = params => $nuxt.$api.requestByPost('/hall/v2/playHall/agentUserClikNum', params)





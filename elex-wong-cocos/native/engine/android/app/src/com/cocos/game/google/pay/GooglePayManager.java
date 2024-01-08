package com.cocos.game.google.pay;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.AcknowledgePurchaseResponseListener;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.ConsumeResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsParams;
import com.android.billingclient.api.SkuDetailsResponseListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/*
初始化：初始化完成后->查询未消耗订单(走正常支付成功后流程)
购买商品：购买商品->支付完成->传给服务器验证订单->成功:发送奖励并调用Google消耗方法
支付失败：购买商品->支付失败(BillingResponseCode = 7)存在未消耗订单->查询未消耗订单(走正常支付成功后流程)
 */
public class GooglePayManager implements PurchasesUpdatedListener {
    private static  String TAG = "SDK-GooglePayManager";
    private boolean _IsServiceConnected = false;    //服务器连接状态

    private Activity _activity;
    private BillingClient _billingClient;
    private IGooglePayUpdateListener _listener;
    private Set<String> _tokensToBeConsumed = new HashSet<>();//储存消耗token
    private Map<String, Purchase> _mapTokenPurchase = new HashMap<>();//token对应Purchase


    /*

     */
    public GooglePayManager(Activity activity,IGooglePayUpdateListener listener){
        this._activity = activity;
        this._listener = listener;

        //构建client
        _billingClient = BillingClient.newBuilder(_activity).setListener(this).enablePendingPurchases().build();

        Log.i(TAG, "Starting setup.");


    }

    public void Connection() {
        _IsServiceConnected = false;
        _tokensToBeConsumed.clear();
        _mapTokenPurchase.clear();;
        //连接GooglePay服务
        startServiceConnection(new Runnable() {
            public BillingResult result;
            @Override
            public void run() {
                //监听启动就绪
                Log.d(TAG, "GooglePay服务已就位，进行查询订单.");
                queryPurchases();
            }
        },new Runnable(){
            public BillingResult result;
            @Override
            public void run() {
                //断开连接
                Log.d(TAG, "断开googlePay服务");
            }
        });
    }

    /*
            启动服务链接
         */
    private void startServiceConnection(final Runnable executeOnSuccess,final Runnable executeOnFailed){
        _billingClient.startConnection(new BillingClientStateListener() {
            //启动完成
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                Log.d(TAG, "Setup finished. Response code: "+ billingResult.getResponseCode());
                if(billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK){
                    Log.d(TAG, "Success 连接成功!");
                    _IsServiceConnected = true;
                    _listener.onInitGooglePaySuccess(billingResult);
                    //可以执行扩展方法
                    if(executeOnSuccess != null){
                        executeOnSuccess.run();
                    }
                }
                else {
                    _IsServiceConnected = false;
                    _listener.onInitGooglePayFailed(billingResult);
                    //可以执行扩展方法
                    if(executeOnFailed != null)
                    {
                        executeOnFailed.run();
                    }
                }
            }
            //连接断开
            @Override
            public void onBillingServiceDisconnected() {
                Log.d(TAG, "Disconnected 断开链接!");
                _IsServiceConnected = false;
            }
        });
    }
    /*
        自动重连
     */
    private void executeServiceRequest(Runnable runnable){
        if(_IsServiceConnected) runnable.run(); else startServiceConnection(runnable,null);
    }

    //检查当前客户端是否支持订阅
    private boolean checkAreSubscriptionsSupported(){
        BillingResult featureSupported = _billingClient.isFeatureSupported(BillingClient.FeatureType.SUBSCRIPTIONS);
        if(featureSupported.getResponseCode() != BillingClient.BillingResponseCode.OK)
            Log.d(TAG, "checkAreSubscriptionsSupported()  got an error response: " + featureSupported.getResponseCode());

        return featureSupported.getResponseCode() == BillingClient.BillingResponseCode.OK;
    }
    /*
        查询
     */
    private void queryPurchases(){
        Runnable queryToExecute = new Runnable() {
            @Override
            public void run() {
                long time = System.currentTimeMillis();
                Purchase.PurchasesResult purchasesResult = _billingClient.queryPurchases(BillingClient.SkuType.INAPP);
                Log.d(TAG, String.format("查询内购消耗时间: %s ms",System.currentTimeMillis() - time));
                Log.d(TAG, String.format("查询内购返回 code: %s size: %s",purchasesResult.getResponseCode(),purchasesResult.getPurchasesList().size()));
                //检查是否支持订阅
                if(checkAreSubscriptionsSupported()){
                    time = System.currentTimeMillis();
                    //查询订阅
                    Purchase.PurchasesResult subscriptionResult = _billingClient.queryPurchases(BillingClient.SkuType.SUBS);
                    Log.d(TAG, String.format("查询订阅消耗时间: %s ms",System.currentTimeMillis() - time));
                    Log.d(TAG, String.format("查询订阅返回 code: %s size: %s",subscriptionResult.getResponseCode(),subscriptionResult.getPurchasesList().size()));

                    if(subscriptionResult.getResponseCode() == BillingClient.BillingResponseCode.OK)
                        purchasesResult.getPurchasesList().addAll(subscriptionResult.getPurchasesList());
                    else
                        Log.d(TAG, String.format("查询订阅返回错误响应 code: %s",subscriptionResult.getResponseCode()));
                } else if(purchasesResult.getResponseCode() == BillingClient.BillingResponseCode.OK)
                    Log.d(TAG, "未查询到订阅信息已跳过");
                else
                    Log.d(TAG, String.format("查询订阅返回错误响应 code: %s",purchasesResult.getResponseCode()));

                //查询完成执行
                onQueryPurchasesFinished(purchasesResult);
            }
        };

        executeServiceRequest(queryToExecute);
    }
    //查询完成
    private void onQueryPurchasesFinished(Purchase.PurchasesResult result){
        if(_billingClient == null || result.getResponseCode() != BillingClient.BillingResponseCode.OK){
            String error =   String.format("billing == null 或 返回失败code: %s",result.getResponseCode());
            Log.e(TAG, error);
            return;
        }
        Log.d(TAG, "查询成功!");
        _mapTokenPurchase.clear();
        //更新购买
        onPurchasesUpdated(result.getBillingResult(),result.getPurchasesList());
    }

    /*
        购买回调
     */
    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        String error = "";
        switch (billingResult.getResponseCode())
        {
            case BillingClient.BillingResponseCode.OK:
                for (Purchase purchase : purchases) {
                    handlePurchase(billingResult,purchase);
                }
                break;
            case BillingClient.BillingResponseCode.USER_CANCELED:
                Log.d(TAG, "onPurchasesUpdated() - 用户取消购买流程");
                break;
            case BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED:
                //TODO: 上次购买物品未消耗
                error = String.format("onPurchasesUpdated() - 上次购买物品未消耗 code: %s 重新 queryPurchases",billingResult.getResponseCode());
                Log.d(TAG,error);
                _listener.onPurchaseNotConsume(billingResult,_mapTokenPurchase);
                queryPurchases();
                break;
            default:
                error = String.format("onPurchasesUpdated() - 返回未知错误 code: %s",billingResult.getResponseCode());
                break;
        }
    }

    //处理购买
    private void handlePurchase( final BillingResult billingResult,final Purchase purchase){
        //
        Runnable purchaseDelay =   new Runnable() {
            @Override
            public void run() {
                _mapTokenPurchase.put(purchase.getPurchaseToken(),purchase);
                _listener.onPaySuccess(billingResult,purchase);
            }
        };
        if(purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED){
            //TODO: 购买完成

            //确认购买交易，不然三天后会退款给用户
            if (!purchase.isAcknowledged()) {
                acknowledgePurchase(purchase,purchaseDelay);
            }else {
                purchaseDelay.run();
            }

        } else if(purchase.getPurchaseState() == Purchase.PurchaseState.PENDING){
            //TODO: 未完成-挂起
            Log.d(TAG, "未完成购买-已挂起"+ purchase.getOriginalJson());
            if (!purchase.isAcknowledged()) {
                acknowledgePurchase(purchase,purchaseDelay);
            }else {
            }
        }
    }
    //确认订单
    private void acknowledgePurchase(Purchase purchase, final Runnable executeOnSuccess) {
        AcknowledgePurchaseParams acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();
        AcknowledgePurchaseResponseListener acknowledgePurchaseResponseListener = new AcknowledgePurchaseResponseListener() {
            @Override
            public void onAcknowledgePurchaseResponse(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Log.i(TAG, "Acknowledge purchase success");
                    if (executeOnSuccess != null){
                        executeOnSuccess.run();
                    }
                } else {
                    if (executeOnSuccess != null){
                        executeOnSuccess.run();
                    }
                    Log.d(TAG, "Acknowledge purchase failed,code=" + billingResult.getResponseCode() + ",\nerrorMsg=" + billingResult.getDebugMessage());
                }
            }
        };
        _billingClient.acknowledgePurchase(acknowledgePurchaseParams, acknowledgePurchaseResponseListener);
    }

    /*
       消耗商品  只有消费成功之后，才能真正到账，否则3天之后，会执行退款处理 测试阶段只有5分钟
     */
    public void ConsumeAsync(final String token){
        if(!CheckToken(token)){
            Log.d(TAG,String.format("检查订单未购买: %s",token));
            return;
        }
        final Purchase purchase = _mapTokenPurchase.get(token);
        if(_tokensToBeConsumed.contains(purchase.getPurchaseToken())){
            Log.d(TAG, "消耗商品已使用,正在跳过...");
            return;
        }
        _tokensToBeConsumed.add(purchase.getPurchaseToken());
        //监听
        final ConsumeResponseListener onConsumeListener = new ConsumeResponseListener() {
            @Override
            public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                if(billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK){
                    Log.d(TAG, "消耗成功.");
                    _mapTokenPurchase.remove(purchase);
                    _listener.onConsumeSuccess(billingResult,purchase);
                }else {
                    Log.d(TAG, String.format("onConsumeResponse 消耗失败: code = %s , msg = %s , purchaseToken = %s", billingResult.getResponseCode(), billingResult.getDebugMessage(), purchaseToken));
                    _mapTokenPurchase.remove(purchase);
                    _listener.onConsumeFailed(billingResult,purchase);
                }
            }
        };

        //执行
        Runnable consumeRequest = new Runnable() {
            @Override
            public void run() {
                ConsumeParams consumeParams = ConsumeParams.newBuilder()
                        .setDeveloperPayload(purchase.getDeveloperPayload())
                        .setPurchaseToken(purchase.getPurchaseToken()).build();
                _billingClient.consumeAsync(consumeParams,onConsumeListener);
            }
        };
        executeServiceRequest(consumeRequest);
    }

    public void  ConsumeAllAsync(){

    }

    //查询是此账单是否已付款
    public boolean CheckToken(String token){
        return _mapTokenPurchase.containsKey(token);
    }
    //获取Sku
    public String GetSku(String token){
        return _mapTokenPurchase.get(token).getSku();
    }

    //异步查询商品信息在后台是否配置过
    public void QuerySkuDetailsAsync(@BillingClient.SkuType final String itemType, final List<String> skuList, final SkuDetailsResponseListener listener){
        Runnable queryRequest = new Runnable() {
            @Override
            public void run() {
                SkuDetailsParams.Builder parans = SkuDetailsParams.newBuilder().setType(itemType).setSkusList(skuList);
                _billingClient.querySkuDetailsAsync(parans.build(), listener);
            }
        };

        executeServiceRequest(queryRequest);
    }

    //启动购买或订阅流程
    public void Pay(final SkuDetails skuDetails ){
        Runnable purchaseFlowRequest = new Runnable() {
            @Override
            public void run() {
                BillingFlowParams flowParams = BillingFlowParams.newBuilder().setSkuDetails(skuDetails).build();
                _billingClient.launchBillingFlow(_activity,flowParams);
                Log.d(TAG, "launchBillingFlow , 调用窗口...");
            }
        };
        executeServiceRequest(purchaseFlowRequest);
    }
}

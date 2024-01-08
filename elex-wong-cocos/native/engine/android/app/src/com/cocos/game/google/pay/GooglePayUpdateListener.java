package com.cocos.game.google.pay;

import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.Purchase;

import com.cocos.game.helper.CocosUtils;
import com.cocos.game.google.GooglePlayManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GooglePayUpdateListener implements IGooglePayUpdateListener {

    private static  String TAG = "GooglePayUpdateListener";



    @Override
    public void onInitGooglePaySuccess(BillingResult result) {
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayInitSuccess");
        object.put("info", result);
        CocosUtils.send2Js(object);
    }
    @Override
    public void onInitGooglePayFailed(BillingResult result) {
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayInitFail");
        object.put("info", result);
        CocosUtils.send2Js(object);
    }
    @Override
    public void onPaySuccess(BillingResult result,Purchase purchase) {
        //TODO:购买成功
        Log.d(TAG, String.format("购买成功物品: %s , 订单: %s",purchase.getSku(),purchase.getOrderId()));
//        JSONObject object = new JSONObject();
//        object.put("notify", "GooglePaySuccess");
//        object.put("info", purchase.getOriginalJson());
//        object.put("bundleId", AppActivity.getContext().getPackageName());
//        CocosUtils.send2Js(object);
        Log.d(TAG, String.format("直接消费: %s , 订单: %s",purchase.getSku(),purchase.getOrderId()));
        GooglePlayManager.GetInstance().Consume(purchase.getPurchaseToken());
    }

    @Override
    public void onPayFailed(BillingResult result,Purchase purchase) {
        //TODO:购买成功
        Log.d(TAG, String.format("购买成功物品: %s , 订单: %s",purchase.getSku(),purchase.getOrderId()));
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayFailed");
        object.put("info", purchase.getOriginalJson());
        CocosUtils.send2Js(object);
    }

    @Override
    public void onConsumeSuccess(BillingResult result,Purchase purchase) {
        Log.d(TAG, String.format("onGooglePayConsumeSuccess() : purchase - %s ，结果 - %s", purchase.getOriginalJson(), result.getResponseCode()));
        Log.d(TAG, "消耗成功物品 token："+ purchase.getPurchaseToken());
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayConsumeSuccess");
        object.put("info", purchase.getOriginalJson());
        CocosUtils.send2Js(object);
    }

    @Override
    public void onConsumeFailed(BillingResult result,Purchase purchase) {
        Log.d(TAG, String.format("onGooglePayConsumeSuccess() : purchase - %s ，结果 - %s", purchase.getOriginalJson(), result.getResponseCode()));
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayConsumeFailed");
        object.put("info", purchase.getOriginalJson());
        CocosUtils.send2Js(object);
    }



    @Override
    public void onPurchaseNotConsume(BillingResult result,Map<String, Purchase> purchases) {
        List<String> notConsumePurchases = new ArrayList<String>();
        //key
        for(String key : purchases.keySet()){
            System.out.println(key);
        }
        //value
        for(Purchase purchase : purchases.values()){
            Log.d(TAG, String.format("onPurchaseNotConsume() : 未消耗purchases - %s ，结果 - %s", purchase.getOriginalJson(), result.getResponseCode()));
            notConsumePurchases.add(purchase.getOriginalJson());
        }
        JSONObject object = new JSONObject();
        object.put("notify", "GooglePayNotConsume");
        object.put("info", notConsumePurchases);
        CocosUtils.send2Js(object);
    }
}

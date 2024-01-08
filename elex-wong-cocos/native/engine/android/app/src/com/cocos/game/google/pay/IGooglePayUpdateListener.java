package com.cocos.game.google.pay;

import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.Purchase;

import java.util.List;
import java.util.Map;

public interface IGooglePayUpdateListener
{

    //购买成功回调
    void onPayFailed(BillingResult result, Purchase purchase);
    void onPaySuccess(BillingResult result, Purchase purchase);


    void onConsumeFailed(BillingResult result, Purchase purchase);
    void onConsumeSuccess(BillingResult result, Purchase purchase);


    void onInitGooglePayFailed(BillingResult result);
    void onInitGooglePaySuccess(BillingResult result);
    //未消耗订单
    void onPurchaseNotConsume(BillingResult result, Map<String, Purchase> purchases);
}

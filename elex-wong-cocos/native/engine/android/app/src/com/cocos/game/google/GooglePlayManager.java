package com.cocos.game.google;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsResponseListener;

import com.cocos.game.google.pay.GooglePayManager;
import com.cocos.game.google.pay.GooglePayUpdateListener;

import java.util.ArrayList;
import java.util.List;


public class GooglePlayManager
{
    public static GooglePlayManager m_GPM = null;
    public  Context m_Context;
    private static String TAG = "Cocos: SDK GooglePlayManager";
    public  String m_UnityListenObj = "";
    private  String mLicenseKey;

    private static final int WRITE_EXTERNAL_STORAGE_REQUEST_CODE = 1;
    public static boolean  m_IsInited = false;
    public static boolean  m_IsIniing = false;


    public  GooglePayManager m_GooglePayManager = null;
    public GooglePayUpdateListener m_GooglePayUpdateListener = null;
    /**
     * unity拉取
     */
    public static GooglePlayManager GetInstance()
    {
        if (m_GPM == null){
            m_GPM = new GooglePlayManager();
        }
        return  m_GPM;
    }
    /**
     * 设置Context
     */
    public void  setActivity(Activity activity)
    {
        m_Context = activity;
    }
    public Context  getActivity()
    {
        return m_Context ;
    }
    /**
     * 初始化
     * @param listenObj
     * @param listen_key
     */
    public void Init(String listenObj, String listen_key)
    {
        mLicenseKey = listen_key;
        m_UnityListenObj  = listenObj;
    }
    /**
     * 连接 GooglePay 服务
     */
    public void InitPay()
    {
        if (m_GooglePayManager == null){
            m_GooglePayUpdateListener = new GooglePayUpdateListener();
            m_GooglePayManager = new GooglePayManager((Activity)m_Context ,m_GooglePayUpdateListener);
        }
        m_GooglePayManager.Connection();
    }

    /**
     * @param sku
     */
    public static void purchase(final String sku){
        Log.i(TAG, String.format("PayItem 订单id: %s",sku));
        List<String> skuList = new ArrayList<>();
        skuList.add(sku);
        GooglePlayManager.GetInstance().m_GooglePayManager.QuerySkuDetailsAsync(BillingClient.SkuType.INAPP, skuList, new SkuDetailsResponseListener() {
            @Override
            public void onSkuDetailsResponse(BillingResult billingResult, List<SkuDetails> skuDetailsList) {
                Log.i(TAG,String.format("PayItem BillingResponseCode : %s",billingResult.getResponseCode()));
                if(billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    Log.e(TAG, String.format("查询%s失败。错误代码：%s", sku, billingResult.getResponseCode()));
                    //m_GooglePayUpdateListener.onPayFailed(TAG, String.format("查询%s失败。错误代码：%s", sku, billingResult.getResponseCode()));
                } else{
                    if(skuDetailsList != null && skuDetailsList.size() > 0){
                        Log.e(TAG, String.format("查询%s成功。skuDetailsList：%s", sku, JSONObject.toJSON(skuDetailsList) ));
                        //获取sku
                        for (SkuDetails details : skuDetailsList) {
                            if(sku.equals(details.getSku())){
                                GooglePlayManager.GetInstance().m_GooglePayManager.Pay(details);
                            }
                        }
                    }else {
                        Log.e(TAG, String.format("查询%s成功。skuDetailsList：%s", sku, "null" ));
                    }

                }
            }
        });
    }

    /**
     * 服务器验证通过 * 消耗物品
     * @param token
     */
    public void Consume(final String token){
        m_GooglePayManager.ConsumeAsync(token);
    }
}

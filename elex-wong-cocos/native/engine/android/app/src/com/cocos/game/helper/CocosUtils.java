package com.cocos.game.helper;

import android.content.Context;
import android.content.pm.ApplicationInfo;

import com.alibaba.fastjson.JSONObject;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;

public class CocosUtils {
    public static void send2Js(final JSONObject jsonData){
        CocosHelper.runOnGameThread(new Runnable() {
            @Override
            public void run() {
                String callCmd = "NativeCallHelper.doNativeMsg(" + jsonData.toJSONString() + ")";
                System.out.println("发送数据到cocos :" + callCmd);
                CocosJavascriptJavaBridge.evalString(callCmd);
            }
        });
    }

    public static boolean isApkInDebug(Context context) {
        try {
            ApplicationInfo info = context.getApplicationInfo();
            return (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (Exception e) {
            return false;
        }
    }
}

/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.cocos.game;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;

import com.cocos.game.facebook.FacebookApi;
import com.cocos.game.facebook.FacebookApp;
import com.cocos.game.google.GooglePlayManager;
import com.cocos.game.helper.CocosUtils;
import com.cocos.service.SDKWrapper;
import com.cocos.lib.CocosActivity;

import android.Manifest;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;

import java.util.UUID;

public class AppActivity extends CocosActivity {
    public static AppActivity mInstace = null;

    private static String TAG = "AppActivity";

    private static final String[] REQUESTED_PERMISSIONS = {
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.CAMERA,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    /**
     * 得到全局唯一UUID
     */
    private static String uuid;

    private static final int PERMISSION_REQ_ID = 22;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppActivity.mInstace = this;
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            //  so just quietly finish and go away, dropping the user back into the activity
            //  at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.shared().init(this);

        // android 6.0以上动态申请权限  或targetSdkVersion设置为23以下
        // 获取权限后，初始化 RtcEngine，并加入频道。
        if(CocosUtils.isApkInDebug(this)) {
            FacebookApp.init(this);
            //去掉标题
            GooglePlayManager.GetInstance().setActivity(this);
        }else {
            if (checkSelfPermission(REQUESTED_PERMISSIONS[0], PERMISSION_REQ_ID) &&
                    checkSelfPermission(REQUESTED_PERMISSIONS[1], PERMISSION_REQ_ID) &&
                    checkSelfPermission(REQUESTED_PERMISSIONS[2], PERMISSION_REQ_ID)) {
                FacebookApp.init(this);
                //去掉标题
                GooglePlayManager.GetInstance().setActivity(this);
                System.out.println("权限OK");
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.shared().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.shared().onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
        SDKWrapper.shared().onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.shared().onActivityResult(requestCode, resultCode, data);
        FacebookApi.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.shared().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.shared().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.shared().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.shared().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.shared().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.shared().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.shared().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.shared().onStart();
        super.onStart();
    }

    @Override
    public void onLowMemory() {
        SDKWrapper.shared().onLowMemory();
        super.onLowMemory();
    }

    /**
     * 检查权限
     */
    public static void checkPermission() {
        PermissionManager.CheckAgoraGamingPermission(AppActivity.mInstace);
    }

    private boolean checkSelfPermission(String permission, int requestCode) {
        if (ContextCompat.checkSelfPermission(this, permission) !=
                PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, REQUESTED_PERMISSIONS, requestCode);
            return false;
        }
        return true;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == 0) {
            try {
                for(int i = 0; i < permissions.length; i++) {
                    Log.d(TAG, permissions[i] + ":" + grantResults[i]);
                }

            }catch(Exception e){
                e.printStackTrace();
            }
        }

    }

    //获取手机的唯一标识
//    public  static String getUniCodeId(){
//        String deviceId = "";
//        // 渠道标志
//        try {
//            //IMEI（imei）
//            TelephonyManager tm = (TelephonyManager) getContext().getSystemService(Context.TELEPHONY_SERVICE);
//            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
//                deviceId = tm.getImei();
//            }else{
//                deviceId = tm.getDeviceId();
//            }
//            if(TextUtils.isEmpty(deviceId)){
//                //序列号（sn）
//                String sn = tm.getSimSerialNumber();
//                if(!TextUtils.isEmpty(sn)){
//                    deviceId = sn;
//                    return new UUID(deviceId.hashCode(), deviceId.hashCode() << 32).toString();
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            String androidId = Settings.System.getString(getContext().getContentResolver(), Settings.Secure.ANDROID_ID);
//            deviceId = androidId;
//            if(TextUtils.isEmpty(deviceId)) {
//                deviceId = getUUID();
//                return deviceId;
//            }
//        }
//        return new UUID(deviceId.hashCode(), deviceId.hashCode() << 32).toString();
//    }

//    public static String getUUID(){
//        if(!TextUtils.isEmpty(AppActivity.uuid)){
//            return AppActivity.uuid;
//        }
//        SharedPreferences mShare = getContext().getSharedPreferences("uuid",MODE_PRIVATE);
//        if(mShare != null){
//            uuid = mShare.getString("uuid", "");
//        }
//        if(TextUtils.isEmpty(uuid)){
//            uuid = UUID.randomUUID().toString();
//            mShare.edit().putString("uuid",uuid).commit();
//        }
//        return uuid;
//    }
}

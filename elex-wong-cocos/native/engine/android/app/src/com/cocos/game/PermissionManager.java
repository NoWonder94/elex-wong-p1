package com.cocos.game;

import android.app.Activity;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.cocos.game.permissions.InterfaceProtol;
import com.cocos.game.permissions.OnPermission;
import com.cocos.game.permissions.Permission;
import com.cocos.game.permissions.XXPermissions;
import com.cocos.game.helper.CocosUtils;

import java.util.List;

/*ese
ACCESS_LOCATION_EXTRA_COMMANDS
ACCESS_NETWORK_STATE
ACCESS_NOTIFICATION_POLICY
ACCESS_WIFI_STATE
BLUETOOTH
BLUETOOTH_ADMIN
BROADCAST_STICKY
CHANGE_NETWORK_STATEq
CHANGE_WIFI_MULTICAST_STATE
CHANGE_WIFI_STATE
DISABLE_KEYGUARD
EXPAND_STATUS_BAR
GET_PACKAGE_SIZEaw
INSTALL_SHORTCUT
INTERNET
KILL_BACKGROUND_PROCESSES
MODIFY_AUDIO_SETTINGS
NFC
READ_SYNC_SETTINGS
READ_SYNC_STATS
RECEIVE_BOOT_COMPLETED
REORDER_TASKS
REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
REQUEST_INSTALL_PACKAGES
SET_ALARM
SET_TIME_ZONE
SET_WALLPAPER
SET_WALLPAPER_HINTS
TRANSMIT_IR
UNINSTALL_SHORTCUT
USE_FINGERPRINT
VIBRATE
WAKE_LOCK
WRITE_SYNC_SETTINGS

 */
public class PermissionManager {

    public static Context m_Context;
    private static String TAG = "Unity: SDK PermissionManager";
    public static String m_UnityListenObj = "";

    private  static PermissionManager m_PM = null;
    /**
     * unity
     */
    public static PermissionManager GetInstance()
    {
        if (m_PM == null){
            m_PM = new PermissionManager();
        }
        return  m_PM;
    }
    /**
     * 设置Context
     */
    public static void  SetUnityContext(Activity activity)
    {
        m_Context = activity;
    }
    /**
     * 设置sdk返回的消息接听器
     */
    public static void  SetUnityListenObj(String unityListenObj)
    {

        m_UnityListenObj = unityListenObj;
    }
    /**
     * 设置Context
     */
    public Context  GetUnityContext()
    {
        return m_Context ;
    }



    /*
      模板  支持多个权限组进行请求，不指定则默以清单文件中的危险权限进行请求
     */
    public static String checkGamePermission(final Activity unityContext) {
        XXPermissions.with(unityContext)
                //手机
                .permission(Permission.READ_PHONE_STATE)  /** 读取电话状态 */
                .permission(Permission.CALL_PHONE)      /** 拨打电话 */
                .permission(Permission.READ_CALL_LOG)      /** 读取通话记录 */
                .permission(Permission.WRITE_CALL_LOG)      /** 修改通话记录 */
                .permission(Permission.ADD_VOICEMAIL)      /** 添加语音邮件 */
                .permission(Permission.USE_SIP)      /** 使用SIP视频 */
                //短信
                .permission(Permission.SEND_SMS)      /** 发送短信 */
                .permission(Permission.RECEIVE_SMS)      /** 接收短信 */
                .permission(Permission.READ_SMS)      /** 读取短信 */
                .permission(Permission.RECEIVE_WAP_PUSH)      /** 接收 WAP 推送消息  */
                .permission(Permission.RECEIVE_MMS)      /** 接收彩信 */



                .permission(Permission.CAMERA)  /** 相机权限 */
                .permission(Permission.RECORD_AUDIO)     /** 麦克风权限 录音权限 */
                // 申请多个权限
                .permission(Permission.MANAGE_EXTERNAL_STORAGE)
                .permission(Permission.Group.CALENDAR)
                .permission(Permission.Group.CONTACTS)         /** 联系人权限 */
                .permission(Permission.Group.LOCATION) /** 位置权限 */
                .permission(Permission.Group.SENSORS)
                .request(new OnPermission() {

                    @Override
                    public void hasPermission(List<String> granted, boolean all) {
                        if (all) {
//                            Toast.makeText(unityContext,"获取权限成功", Toast.LENGTH_SHORT).show();
                        } else {
//                            Toast.makeText(unityContext, "获取权限成功，部分权限未正常授予", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void noPermission(List<String> denied, boolean never) {
                        if (never) {
//                            Toast.makeText(unityContext,"被永久拒绝授权，请手动授予权限", Toast.LENGTH_SHORT).show();
                            // 如果是被永久拒绝就跳转到应用权限系统设置页面
                            XXPermissions.startPermissionActivity(unityContext, denied);
                        } else {
//                            Toast.makeText(unityContext, "获取权限失败", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
        return "123";
    }

    /*
      声网危险权限申请 包括相机和麦克风
     */
    public static void CheckAgoraGamingPermission(final Activity unityContext) {
        XXPermissions.with(unityContext)
                .permission(Permission.CAMERA)  /** 相机权限 */
                .permission(Permission.RECORD_AUDIO)     /** 麦克风权限 录音权限 */
                .request(new OnPermission() {
                    @Override
                    public void hasPermission(List<String> granted, boolean all) {
                        JSONObject object = new JSONObject();
                        if (all) {
                            //Toast.makeText(unityContext,"获取相机和麦克风权限成功", Toast.LENGTH_SHORT).show();
                            object.put("notify", "check_permission_result");
                            object.put("result", 1);
//                            Log.d(TAG,"获取相机和麦克风权限成功");
                        } else {
                            object.put("notify", "check_permission_result");
                            object.put("result", 0);
                            //Toast.makeText(unityContext, "获取权限成功，部分权限未正常授予", Toast.LENGTH_SHORT).show();
                            //protolParam.isGetAllPermission = false; 暂时不需要发了
//                            Log.d(TAG,"相机或麦克风录音拒绝授权，请手动授予权限");
//                            Toast.makeText(unityContext,"相机或麦克风录音拒绝授权，请手动授予权限", Toast.LENGTH_LONG).show();
                            XXPermissions.startPermissionActivity(unityContext, granted);
                        }
                        CocosUtils.send2Js(object);
                    }

                    @Override
                    public void noPermission(List<String> denied, boolean never) {
                        JSONObject object = new JSONObject();
                        if (never) {
                            object.put("notify", "check_permission_result");
                            object.put("result", 0);
//                            Toast.makeText(unityContext,"相机或麦克风录音拒绝授权，请手动授予权限", Toast.LENGTH_LONG).show();
                            // 如果是被永久拒绝就跳转到应用权限系统设置页面
                            XXPermissions.startPermissionActivity(unityContext, denied);
                        } else {
                            object.put("notify", "check_permission_result");
                            object.put("result", 0);
//                            Toast.makeText(unityContext, "相机或麦克风录音权限失败，请重新点击授权", Toast.LENGTH_SHORT).show();
                        }
                        CocosUtils.send2Js(object);
                    }
                });
    }

}

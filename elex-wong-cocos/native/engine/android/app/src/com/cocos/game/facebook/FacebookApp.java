package com.cocos.game.facebook;

import com.cocos.lib.CocosActivity;

public class FacebookApp {
    public static void init(CocosActivity activity) {
        FacebookApi.getInstance().initSdk(activity);
    }

    public static String getLastAccessToken(){
        return FacebookApi.getInstance().getLastAccessToken();
    }

    /**
     * 登录
     */
    public static void facebookLogin(){
        FacebookApi.getInstance().login();
    }

    /**
     * 登出
     */
    public static void facebookLogout(){
        System.out.println("facebook logout success");
        FacebookApi.getInstance().logout();
    }

    /**
     * 分享
     * @param shareInfo
     */
    public static void facebookShare(final String shareInfo){
        FacebookApi.getInstance().share(shareInfo);
    }
}

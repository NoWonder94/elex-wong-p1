package com.cocos.game.facebook;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.share.Sharer;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.share.widget.ShareDialog;

import com.cocos.game.helper.CocosUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.Collection;

public class FacebookApi {
    private static String TAG = "FacebookApi";
    private static FacebookApi mInstance = null;
    private Activity mActivity = null;
    private CallbackManager mCallbackManager = null;
    private ShareDialog mShareDialog = null;

    public static FacebookApi getInstance() {
        if (null == mInstance) {
            mInstance = new FacebookApi();
        }
        return mInstance;
    }

    /**
     *  监听 onActivityResult
     */
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (mCallbackManager != null) {
            mCallbackManager.onActivityResult(requestCode, resultCode, data);
        }
    }

    /**
     *  初始化
     */
    public void initSdk(Activity activity) {
        Log.i(TAG, "initSdk");

        mActivity = activity;
        mCallbackManager = CallbackManager.Factory.create();

        initLogin();
        initShare();
    }

    /**
     *  初始化登录
     */
    private void initLogin() {
        Log.i(TAG, "initLogin");

        LoginManager.getInstance().registerCallback(mCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Log.e(TAG, "login onSuccess loginResult = " + loginResult.toString());

                //获取授权信息
                requestAuthInfo();
            }

            @Override
            public void onCancel() {
                Log.e(TAG, "login onCancel");
            }

            @Override
            public void onError(FacebookException error) {
                Log.e(TAG, "login onError error = " + error.toString());
                com.alibaba.fastjson.JSONObject object = new  com.alibaba.fastjson.JSONObject();
                object.put("notify", "FacebookLoginResult");
                object.put("type", "error");
                object.put("msg", error.getMessage());
                CocosUtils.send2Js(object);
            }
        });
    }

    /**
     *  登录
     */
    public void login() {
        Log.i(TAG, "login");

        if (isAuthorization()) {
            //已经授权
            requestAuthInfo();
            return;
        }

        Collection<String> permissions = Arrays.asList("public_profile", "email");
        LoginManager.getInstance().logInWithReadPermissions(mActivity, permissions);
    }


    /**
     *  是否授权
     */
    public boolean isAuthorization(){
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        if (accessToken == null) {
            return false;
        }

        return !accessToken.isExpired();
    }

    /**
     *  是否授权
     */
    public String getLastAccessToken(){
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        if (accessToken != null && !accessToken.isExpired()) {
            return accessToken.getToken();
        }
        return "";
    }


    /**
     *  获取授权信息
     */
    private void requestAuthInfo() {
        Log.i(TAG, "requestAuthInfo");

        final AccessToken accessToken = AccessToken.getCurrentAccessToken();
        GraphRequest graphRequest = GraphRequest.newMeRequest(accessToken, new GraphRequest.GraphJSONObjectCallback() {
            @Override
            public void onCompleted(JSONObject object, GraphResponse response) {
                Log.e(TAG, "requestAuthInfo onCompleted object = " + object.toString() + " response = " + response.toString());

                if (response.getError() != null) {
                    //授权错误
                    com.alibaba.fastjson.JSONObject jsonObject = new  com.alibaba.fastjson.JSONObject();
                    jsonObject.put("notify", "FacebookLoginResult");
                    jsonObject.put("type", "error");
                    jsonObject.put("msg", response.getError().getErrorMessage());
                    CocosUtils.send2Js(jsonObject);
                    return;
                }

                //id:1565455221565
                String id = object.optString("id");
                //昵称：Zhang San
                String name = object.optString("name");
                //性别：比如 male （男）  female （女）
                String gender = object.optString("gender");
                //邮箱：比如：56236545@qq.com
                String email = object.optString("email");
                //头像
                String picture = "";
                JSONObject objPicture = object.optJSONObject("picture");
                if (objPicture != null) {
                    JSONObject objPictureData = objPicture.optJSONObject("data");
                    if (objPictureData != null) {
                        picture = objPictureData.optString("url");
                    }
                }
                //头像
//                String avatar = String.format("https://graph.facebook.com/%s/picture?type=large", id);
//                String authInfo = String.format("{\"access_token\":\"%s\",\"id\":\"%s\",\"name\":\"%s\",\"gender\":\"%s\",\"email\":\"%s\",\"picture\":\"%s\",\"avatar\":\"%s\"}",
//                        accessToken.getToken(), id, name, gender, email, picture, avatar);

                //通知js
                com.alibaba.fastjson.JSONObject jsonObject = new  com.alibaba.fastjson.JSONObject();
                jsonObject.put("notify", "FacebookLoginResult");
                jsonObject.put("type", "success");
                jsonObject.put("access_token", accessToken.getToken());
                CocosUtils.send2Js(jsonObject);
            }
        });

        Bundle param = new Bundle();
        param.putString("fields", "id,name,gender,email,picture");
        graphRequest.setParameters(param);
        graphRequest.executeAsync();
    }

    /**
     *  登出
     */
    public void logout() {
        Log.i(TAG, "logout");

        LoginManager.getInstance().logOut();
    }

    /**
     *  初始化分享
     */
    private void initShare() {
        Log.i(TAG, "initShare");

        mShareDialog = new ShareDialog(mActivity);
        mShareDialog.registerCallback(mCallbackManager, new FacebookCallback<Sharer.Result>() {
            @Override
            public void onSuccess(Sharer.Result result) {
                Log.e(TAG, "share onSuccess result = " + result.toString());

                //通知js
                final String eval = String.format("onFacebookShareSuccess('%s')", result.toString());

                com.alibaba.fastjson.JSONObject jsonObject = new  com.alibaba.fastjson.JSONObject();
                jsonObject.put("notify", "FacebookShareResult");
                jsonObject.put("type", "success");
                CocosUtils.send2Js(jsonObject);
            }

            @Override
            public void onCancel() {
                Log.e(TAG, "share onCancel");

                //通知js
                com.alibaba.fastjson.JSONObject jsonObject = new  com.alibaba.fastjson.JSONObject();
                jsonObject.put("notify", "FacebookShareResult");
                jsonObject.put("type", "cancel");
                CocosUtils.send2Js(jsonObject);
            }

            @Override
            public void onError(FacebookException error) {
                Log.e(TAG, "share onError error = " + error.toString());
                //通知js
                com.alibaba.fastjson.JSONObject jsonObject = new  com.alibaba.fastjson.JSONObject();
                jsonObject.put("notify", "FacebookShareResult");
                jsonObject.put("type", "error");
                CocosUtils.send2Js(jsonObject);
            }
        });
    }

    /**
     *  分享
     */
    public void share(String shareInfo) {
        Log.i(TAG, "share shareInfo = " + shareInfo);

        try {
            JSONObject json = new JSONObject(shareInfo);
            int shareType = json.getInt("shareType");
            String shareUrl = json.getString("shareUrl");
            String imgPath = json.getString("imgPath");

            if (shareType == 0) {
                //链接
                if (ShareDialog.canShow(ShareLinkContent.class)) {
                    ShareLinkContent content = new ShareLinkContent.Builder()
                            .setContentUrl(Uri.parse(shareUrl))
                            .build();
                    mShareDialog.show(content);
                }
            } else if (shareType == 1) {
                //图片
                if (ShareDialog.canShow(SharePhotoContent.class)) {
                    Bitmap img = BitmapFactory.decodeFile(imgPath);
                    SharePhoto photo = new SharePhoto.Builder()
                            .setBitmap(img)
                            .build();
                    SharePhotoContent content = new SharePhotoContent.Builder()
                            .addPhoto(photo)
                            .build();
                    mShareDialog.show(content);
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}

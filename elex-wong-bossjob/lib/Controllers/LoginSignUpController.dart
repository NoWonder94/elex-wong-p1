import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';
import 'package:bossjobapp/Models/LoginModel.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/material.dart';
import 'package:get/state_manager.dart';
import 'package:get/get.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:linkedin_login/linkedin_login.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

class LoginSignUpController extends BaseController {
  RxString firstName = ''.obs;
  RxString lastName = ''.obs;
  RxString email = ''.obs;
  RxString password = ''.obs;
  RxBool loading = false.obs;
  RxInt tabIndex = 0.obs;
  RxBool isPasswordVisible = false.obs;

  AuthController authController = Get.find();

  togglePassword() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }

  setFirstName(v) {
    this.firstName.value = v;
  }

  setLastName(v) {
    this.lastName.value = v;
  }

  setEmail(v) {
    this.email.value = v;
  }

  setPassword(v) {
    this.password.value = v;
  }

  setLoading(v) {
    this.loading.value = v;
  }

  setTabIndex(v) {
    this.tabIndex.value = v;
  }

  forgetPassword() {
    showToast(text: 'forget ??');
  }

  Future login() async {
    setLoading(true);
    var data = {
      'client_id': client_id,
      'client_secret': client_secret,
      'login': email.value,
      'password': password.value,
      'fcm_token': authController.fcmToken.value,
    };
    var json = await apiService.login(data);
    if (json['success'] == false) {
      if (json['errors'] != null && json['errors']['message'] != null) {
        showError('error'.tr, json['errors']['message'].toString());
      } else {
        showError('error'.tr, json['errors'].toString());
      }
      setLoading(false);
      return;
    }
    LoginModel loginModel = LoginModel.fromJson(json);
    if (loginModel.data?.authentication?.accessToken != null) {
      AnalyticsService().login("email");
      await authController
          .updateAuthToken(loginModel.data?.authentication?.accessToken);
      showSuccess(
        'Login Successfully',
        'Welcome to BossJob App',
      );
      Get.offAndToNamed('/index');

      // Get.offAndToNamed('/index');
    }

    setLoading(false);
  }

  Future register() async {
    setLoading(true);
    var data = {
      "first_name": firstName.value,
      "last_name": lastName.value,
      "email": email.value,
      "password": password.value,
      "source": "app",
      "country_key": "ph",
      "terms_and_condition": false,
      // "device_type": "desktop",
      // "device_os": "OS X",
      "client_id": client_id,
      "client_secret": client_secret,
    };
    var json = await apiService.register(data);
    if (json['status_code'] == 422) {
      showError(json['message'], json['data'].toString());
      setLoading(false);
      return;
    }
    LoginModel loginModel = LoginModel.fromJson(json);
    if (loginModel.data?.authentication?.accessToken != null) {
      AnalyticsService().signUp("email");
      await authController
          .updateAuthToken(loginModel.data?.authentication?.accessToken);
      showSuccess(
        'Login Successfully',
        'Welcome to BossJob App',
      );
      // Get.offAndToNamed('/index');
      // Get.toNamed('/onboarding');
      Get.offAndToNamed('/registerFlow');
    }
    setLoading(false);
  }

  Future socialLogin({
    type,
    userId,
    token,
    email,
    firstName,
    lastName,
    avatar,
  }) async {
    var data = {
      "social_type": type,
      "user_id": userId,
      "token": token,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "avatar": avatar,
      "source": "app",
      // "device_type": "desktop",
      // "device_os": "OS X",
      "active_key": 1,
      "client_id": client_id,
      "client_secret": client_secret,
      'fcm_token': authController.fcmToken.value,
    };
    setLoading(true);

    var json = await apiService.socialLogin(data);
    if (json['success'] == false) {
      showError('error'.tr, json['errors'].toString());
      setLoading(false);
      return;
    }
    LoginModel loginModel = LoginModel.fromJson(json);
    if (loginModel.data?.authentication?.accessToken != null) {
      await authController
          .updateAuthToken(loginModel.data?.authentication?.accessToken);
      showSuccess(
        'Login Successfully',
        'Welcome to BossJob App',
      );

      if (loginModel.data!.isProfileCompleted!) {
        AnalyticsService().login(type);
        Get.offAndToNamed('/index');
      } else {
        AnalyticsService().signUp(type);
        Get.offAndToNamed('/registerFlow');
      }
    }

    setLoading(false);
  }

  Future fb() async {
    // by default we request the email and the public profile or FacebookAuth.i.login()
    final result = await FacebookAuth.i.login();
    if (result.status == LoginStatus.success) {
      final AccessToken accessToken = result.accessToken!;
      // get user fb profile detail
      final userData = await FacebookAuth.i.getUserData(
        fields:
            "name,email,picture.width(400),birthday,friends,gender,link,last_name,first_name",
      );
      socialLogin(
        type: 'fb',
        userId: accessToken.userId,
        token: accessToken.token,
        email: userData['email'],
        firstName: userData['first_name'],
        lastName: userData['last_name'],
        avatar: userData['picture']['data']['url'],
      );
    }
  }

  Future google() async {
    GoogleSignIn _googleSignIn = GoogleSignIn(
      scopes: [
        'email',
        // 'https://www.googleapis.com/auth/contacts.readonly',
      ],
    );
    try {
      var credential = await _googleSignIn.signIn();
      if (credential != null) {
        credential.authentication.then((value) {
          Map<String, dynamic>? idMap = parseJwt(value.idToken!);
          socialLogin(
            type: 'google',
            userId: credential.id,
            token: value.accessToken,
            email: credential.email,
            firstName: idMap!["given_name"],
            lastName: idMap["family_name"],
            avatar: credential.photoUrl,
          );
        });
      }
    } catch (error) {
      print(error);
    }
  }

  Future apple() async {
    setLoading(true);
    try {
      logService.logPrint('Start Apple Login');
      final credential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );
      logService.logPrint('Apple credential' + credential.toString());
      socialLogin(
        type: 'apple',
        userId: credential.userIdentifier,
        token: credential.identityToken,
        email: credential.email,
        firstName: credential.givenName,
        lastName: credential.familyName,
        avatar: '',
      );
      logService.logPrint('Apple LoginSucess');
    } catch (e) {
      print(e);
      setLoading(false);
    }
  }

  Future linkedIn(context) async {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (BuildContext context) => LinkedInUserWidget(
          appBar: HeaderBar(
            isShowOnBack: true,
            onBackClick: () {
              Get.back();
            },
          ),
          // destroySession: logoutUser,
          redirectUrl: linkedInRedirectUrl,
          clientId: linkedInClientId,
          clientSecret: linkedInClientSecret,
          onGetUserProfile: (UserSucceededAction linkedInUser) {
            socialLogin(
              type: 'linkedin',
              userId: linkedInUser.user.userId,
              token: linkedInUser.user.token.accessToken,
              email: linkedInUser
                  .user.email!.elements![0].handleDeep!.emailAddress,
              firstName: linkedInUser.user.firstName!.localized!.label!,
              lastName: linkedInUser.user.lastName!.localized!.label!,
              avatar: linkedInUser.user.profilePicture!.displayImageContent!
                  .elements![0].identifiers![0].identifier,
            );
          },
          onError: (UserFailedAction e) {
            print('Error: ${e.toString()}');
          },
          projection: [
            ProjectionParameters.id,
            ProjectionParameters.localizedFirstName,
            ProjectionParameters.localizedLastName,
            ProjectionParameters.firstName,
            ProjectionParameters.lastName,
            ProjectionParameters.profilePicture,
          ],
        ),
        fullscreenDialog: true,
      ),
    );
  }
}

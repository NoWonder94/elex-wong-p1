import 'dart:async';
import 'dart:io';

import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/LoginSignUpController.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:uni_links/uni_links.dart';

class LoginSignUpPage extends StatefulWidget {
  const LoginSignUpPage({Key? key}) : super(key: key);

  @override
  _LoginSignUpPageState createState() => _LoginSignUpPageState();
}

bool _initialUriIsHandled = false;

class _LoginSignUpPageState extends State<LoginSignUpPage> {
  LoginSignUpController loginSignUpController =
      Get.put(LoginSignUpController());
  LogService logService = Get.find();
  StreamSubscription? _sub;

  @override
  void initState() {
    _handleInitialLink();
    _handleIncomingLinks();
    super.initState();
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }

  void checkDeeplink(String? link) {
    String scheme = 'BOSSJOBPH://';
    if (link == null) {
      return;
    }
    link = link.toLowerCase();
    if (!link.contains(scheme.toLowerCase())) {
      return;
    } else {
      logService.logPrint(link.toString() + ' schema not match');
    }
    if (link.contains('register')) {
      loginSignUpController.setTabIndex(1);
    } else if (link.contains('login')) {
      loginSignUpController.setTabIndex(0);
    }
  }

  Future _handleIncomingLinks() async {
    if (!kIsWeb) {
      _sub = linkStream.listen((String? uri) {
        if (!mounted) return;
        checkDeeplink(uri);
      }, onError: (Object err) {
        if (!mounted) return;
        print('got err: $err');
      });
    }
  }

  Future<void> _handleInitialLink() async {
    if (!_initialUriIsHandled) {
      _initialUriIsHandled = true;
      try {
        final uri = await getInitialLink();
        if (uri == null) {
          logService.logPrint('no url detected');
        } else {
          checkDeeplink(uri);
        }
        if (!mounted) return;
      } on PlatformException {
        print('falied to get initial uri');
      } on FormatException catch (err) {
        if (!mounted) return;
        print('malformed initial uri');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() => Scaffold(
          floatingActionButton: logService.logEnable.value
              ? FloatingActionButton(
                  child: Icon(Icons.note_alt),
                  onPressed: () {
                    Get.toNamed('/logs');
                  },
                )
              : Container(),
          appBar: HeaderBar(),
          backgroundColor: background,
          body: Stack(
            children: [
              Container(
                padding: EdgeInsets.all(defaultPadding),
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      getTabsWidget(loginSignUpController),
                      SizedBox(
                        height: 30,
                      ),
                      Obx(() {
                        if (loginSignUpController.tabIndex.value == 0)
                          return getLoginComponents(
                              context, loginSignUpController);
                        return getRegisterComponents(
                            context, loginSignUpController);
                      }),
                    ],
                  ),
                ),
              ),
              Obx(() {
                if (loginSignUpController.loading.value)
                  return Container(
                    height: h(context, 1),
                    color: backdrop,
                    child: Container(
                      height: h(context, 0.8),
                      child: Align(
                        alignment: Alignment.center,
                        child: SpinKitChasingDots(
                          color: primaryColor,
                        ),
                      ),
                    ),
                  );
                return Container();
              }),
            ],
          ),
        ));
  }

  Widget getRegisterComponents(context, loginSignUpController) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: defaultPadding),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                  child: getInputWidget(
                label: 'First Name',
                onChange: (v) {
                  loginSignUpController.setFirstName(v);
                },
              )),
              SizedBox(
                width: 10,
              ),
              Expanded(
                  child: getInputWidget(
                label: 'Last Name',
                onChange: (v) {
                  loginSignUpController.setLastName(v);
                },
              )),
            ],
          ),
          SizedBox(
            height: 15,
          ),
          getInputWidget(
              label: 'Email',
              onChange: (v) {
                loginSignUpController.setEmail(v);
              }),
          SizedBox(
            height: 15,
          ),
          getInputWidget(
            label: 'Password',
            onChange: (v) {
              loginSignUpController.setPassword(v);
            },
            onTogglePwd: () {
              loginSignUpController.togglePassword();
            },
            obscure: !loginSignUpController.isPasswordVisible.value,
          ),
          SizedBox(
            height: 10,
          ),
          getAlreadyHaveAccountWidget(onClick: () {
            loginSignUpController.setTabIndex(0);
          }),
          SizedBox(
            height: 10,
          ),
          getSubmitButton(
              label: 'Sign Up', onClick: loginSignUpController.register),
          SizedBox(
            height: 20,
          ),
          Text(
            'Or continue with',
            style: forgetPassword,
          ),
          if (Platform.isIOS)
            getSocialButton(
                iconPath: 'lib/Assets/Images/apple.png',
                label: 'Sign in with Apple',
                onClick: loginSignUpController.apple),
          if (Platform.isAndroid)
            getSocialButton(
                iconPath: 'lib/Assets/Images/google.png',
                label: 'Continue with Google',
                onClick: loginSignUpController.google),
          getSocialButton(
              iconPath: 'lib/Assets/Images/fb.png',
              label: 'Continue with Facebook',
              onClick: loginSignUpController.fb),
          getSocialButton(
              iconPath: 'lib/Assets/Images/linkedin.png',
              label: 'Continue with Linkedin',
              onClick: () {
                loginSignUpController.linkedIn(context);
              }),
          SizedBox(
            height: 20,
          ),
          getAgreementWidget()
        ],
      ),
    );
  }

  Widget getLoginComponents(context, loginSignUpController) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: defaultPadding),
      child: Column(
        children: [
          getInputWidget(
              label: 'Email',
              onChange: (v) {
                loginSignUpController.setEmail(v);
              },
              initialValue: loginSignUpController.email.value),
          SizedBox(
            height: 15,
          ),
          getInputWidget(
            label: 'Password',
            onChange: (v) {
              loginSignUpController.setPassword(v);
            },
            onTogglePwd: () {
              loginSignUpController.togglePassword();
            },
            obscure: !loginSignUpController.isPasswordVisible.value,
            initialValue: loginSignUpController.password.value,
          ),
          SizedBox(
            height: 10,
          ),
          getSubmitButton(label: 'Login', onClick: loginSignUpController.login),
          SizedBox(
            height: 15,
          ),
          Text(
            'Or continue with',
            style: forgetPassword,
          ),
          if (Platform.isIOS)
            getSocialButton(
                iconPath: 'lib/Assets/Images/apple.png',
                label: 'Sign in with Apple',
                onClick: loginSignUpController.apple),
          if (Platform.isAndroid)
            getSocialButton(
                iconPath: 'lib/Assets/Images/google.png',
                label: 'Continue with Google',
                onClick: loginSignUpController.google),
          getSocialButton(
              iconPath: 'lib/Assets/Images/fb.png',
              label: 'Continue with Facebook',
              onClick: loginSignUpController.fb),
          getSocialButton(
              iconPath: 'lib/Assets/Images/linkedin.png',
              label: 'Continue with Linkedin',
              onClick: () {
                loginSignUpController.linkedIn(context);
              }),
          SizedBox(
            height: 20,
          ),
          getAgreementWidget()
        ],
      ),
    );
  }

  Widget getAgreementWidget() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: defaultPadding * 2),
      child: Text(
        'By signing up, I have read and agreed to Bossjob.ph Terms of Use and Privacy Policy',
        textAlign: TextAlign.center,
        style: agreementText,
      ),
    );
  }

  Widget getSocialButton({iconPath, label, onClick}) {
    return Padding(
      padding: const EdgeInsets.only(top: 15.0),
      child: InkWell(
        onTap: onClick,
        child: Container(
          padding:
              EdgeInsets.symmetric(vertical: 10, horizontal: defaultPadding),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(6),
              color: Colors.white,
              boxShadow: [BoxShadow(color: socialButtonTextColor)]),
          child: Row(
            children: [
              Image.asset(
                iconPath,
                scale: 1.8,
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    label,
                    style: socialButtonText,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget getSubmitButton({label, onClick}) {
    return Container(
      child: Button(textColor: Colors.white, label: label, onPressed: onClick),
    );
  }

  Widget getForgetWidget({onClick}) => InkWell(
        onTap: onClick,
        child: Container(
          alignment: Alignment.centerRight,
          child: Text(
            'Forgot Password?',
            style: forgetPassword,
          ),
        ),
      );

  Widget getAlreadyHaveAccountWidget({onClick}) => InkWell(
        onTap: onClick,
        child: Container(
          alignment: Alignment.centerRight,
          child: Text(
            'Already have an account?',
            style: forgetPassword,
          ),
        ),
      );

  Widget getInputWidget(
      {label, onChange, initialValue = '', obscure = false, onTogglePwd}) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: inputLabel,
          ),
          SizedBox(
            height: 5,
          ),
          Container(
            color: Colors.white,
            child: TextFormField(
              obscureText: obscure,
              initialValue: initialValue,
              decoration: new InputDecoration(
                  suffixIcon: onTogglePwd != null
                      ? InkWell(
                          onTap: onTogglePwd,
                          child: obscure
                              ? Icon(Icons.visibility)
                              : Icon(Icons.visibility_off))
                      : SizedBox(),
                  hintText: '',
                  hintStyle: TextStyle(color: inactiveInputBorder),
                  isDense: true,
                  fillColor: Colors.white,
                  focusColor: Colors.white,
                  border: OutlineInputBorder(
                      borderSide: BorderSide(color: inputBorderColor),
                      borderRadius: BorderRadius.circular(10))),
              onChanged: onChange,
              style: inputText,
            ),
          ),
        ],
      ),
    );
  }

  Widget getTabsWidget(loginSignUpController) {
    return Container(
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: Obx(
          () => Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              getTabWidget(
                  title: 'Login',
                  onClick: () {
                    loginSignUpController.setTabIndex(0);
                  },
                  active: loginSignUpController.tabIndex.value == 0),
              getTabWidget(
                  title: 'Register',
                  onClick: () {
                    loginSignUpController.setTabIndex(1);
                  },
                  active: loginSignUpController.tabIndex.value == 1),
            ],
          ),
        ));
  }

  Widget getTabWidget({title, onClick, active}) {
    return Expanded(
        child: InkWell(
      onTap: onClick,
      child: Column(
        children: [
          Text(
            title,
            textAlign: TextAlign.center,
            style: tabTitle,
          ),
          SizedBox(
            height: 10,
          ),
          active
              ? Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: tabActiveBorder,
                  ),
                  height: 4,
                )
              : Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: tabInactiveBorder,
                  ),
                  height: 1,
                )
        ],
      ),
    ));
  }
}

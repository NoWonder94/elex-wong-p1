import 'package:flutter/material.dart';
import 'package:flutter_verification_code/flutter_verification_code.dart';
import 'package:get/get.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';

class VerifyEmail extends StatefulWidget {
  final Function? callback;

  const VerifyEmail({Key? key, this.callback}) : super(key: key);
  @override
  _VerifyEmailState createState() => _VerifyEmailState();
}

class _VerifyEmailState extends State<VerifyEmail> {
  AppController appController = Get.put(AppController());

  @override
  void initState() {
    appController.sendVerifyCode();
    appController.verifyCode.value = '';
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: Container(
        alignment: Alignment.center,
        child: Container(
          padding: EdgeInsets.symmetric(
            vertical: 15,
            horizontal: 20,
          ),
          width: 350,
          height: 500,
          alignment: Alignment.center,
          color: Colors.white,
          child: Column(
            children: [
              Row(
                children: [
                  Flexible(fit: FlexFit.tight, child: SizedBox()),
                  IconButton(
                    icon: Icon(
                      Icons.cancel_outlined,
                    ),
                    iconSize: 30,
                    onPressed: () {
                      if (!appController.isVerifyEmailLoading.value) Get.back();
                    },
                  ),
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Verify Email',
                  style: styleVerifyEmailTitle,
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Align(
                alignment: Alignment.centerLeft,
                child: Obx(
                  () => Text(
                    'We have send a 6-digit OTP to your email ' +
                        appController.userInfo.value.data!.email.toString(),
                    style: styleVerifyEmailDescription,
                  ),
                ),
              ),
              SizedBox(
                height: 40,
              ),
              SizedBox(
                height: 50,
                child: VerificationCode(
                  onCompleted: (String value) {
                    appController.verifyCode.value = value;
                    appController.verifyEmail(callback: widget.callback);
                  },
                  onEditing: (bool value) {},
                  keyboardType: TextInputType.number,
                  length: 6,
                ),
              ),
              SizedBox(
                height: 40,
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: verifyEmailButtonBg,
                  fixedSize: Size(300, 40),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Obx(
                  () => appController.isVerifyEmailLoading.value == true
                      ? SpinKitCircle(
                          color: Colors.white,
                          size: 15,
                        )
                      : Text(
                          'Verify',
                        ),
                ),
                onPressed: () {
                  appController.verifyEmail(callback: widget.callback);
                },
              ),
              SizedBox(
                height: 5,
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.white,
                  fixedSize: Size(300, 40),
                  side: BorderSide(
                    width: 1,
                    color: resendOtpBorder,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Obx(
                  () => appController.isSendVerifyCodeLoading.value == true
                      ? SpinKitCircle(
                          color: Colors.black,
                          size: 15,
                        )
                      : Text(
                          'Resend OTP',
                          style: TextStyle(
                            color: resendOtpText,
                            fontSize: 14,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                ),
                onPressed: () {
                  appController.sendVerifyCode();
                },
              ),
              SizedBox(
                height: 30,
              ),
              Text(
                'Wrong email address?',
                style: TextStyle(
                  color: wrongEmailAddressText,
                ),
              ),
              SizedBox(
                height: 30,
                child: TextButton(
                  style: ButtonStyle(
                    padding: MaterialStateProperty.all(EdgeInsets.all(0)),
                  ),
                  child: Text('change email.'),
                  onPressed: () {
                    if (widget.callback != null) {
                      widget.callback!('changeEmail');
                    } else {
                      Get.toNamed('/editProfile');
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

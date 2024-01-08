import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/app_web_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class BossPointPage extends StatefulWidget {
  const BossPointPage({Key? key}) : super(key: key);

  @override
  State<BossPointPage> createState() => _BossPointPageState();
}

class _BossPointPageState extends State<BossPointPage> {
  final ConfigService _configService = Get.find();
  final AuthController authController = Get.find();
  String? url;

  @override
  void initState() {
    super.initState();
    this.init();
  }

  void init() async {
    url =
        'https://bossjob.com.ph/jobseeker-login-redirect?redirectUrl=/dashboard/bosspoint&isAppRedirectModalClosed=false&token=' +
            authController.token.value;
    setState(() {});
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: url != null
          ? AppWebViewWidget(
              title: 'Bosspoints',
              url: url!,
            )
          : SpinKitCircle(
              color: primaryColor,
            ),
    );
  }
}

import 'package:bossjobapp/Widgets/Common/PageScreen.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Test1 extends StatelessWidget {
  const Test1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PageScreen(
      doubleClickExit: true,
      onBack: () {
        Future.delayed(Duration(seconds: 1), () {
          Fluttertoast.showToast(msg: 'msg');
        });
      },
      child: Container(),
    );
  }
}

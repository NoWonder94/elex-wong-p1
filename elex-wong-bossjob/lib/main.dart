import 'dart:io';

import 'package:bossjobapp/Services/InitService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'Constants/messages.dart';
import 'Core/router.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() async {
  HttpOverrides.global = new MyHttpOverrides();
  WidgetsFlutterBinding.ensureInitialized();
  await initServices();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        translations: Messages(),
        title: 'Bossjob.',
        // translations: Messages(), // your translations
        locale: Locale('en', 'US'),
        debugShowCheckedModeBanner: false,
        initialRoute: '/',
        getPages: pages,
        routingCallback: (routing) {
          if (routing!.current == '/home') {
            // do something
          }
        });
  }
}

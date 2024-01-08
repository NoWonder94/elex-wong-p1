import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Pages/Messages.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:bossjobapp/Services/ApiService.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_performance/firebase_performance.dart';

Future initServices() async {
  // initialize Firebase Config
  await Firebase.initializeApp();
  FirebasePerformance.instance;
  // Pass all uncaught errors from the framework to Crashlytics.
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;
  AnalyticsService().init();
  await setupNotification();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  String? fcmToken = await FirebaseMessaging.instance.getToken();
  // initialize App Setting
  await Get.putAsync(() => SharedPreferences.getInstance());
  Get.put(GetStorage());
  var logService = Get.put(LogService());
  logService.logPrint(fcmToken!);
  var apiService = Get.put(ApiService());
  var authController = Get.put(AuthController());
  apiService.init();
  await authController.init(fcmToken);
  Get.put(ConfigService());
}

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
}

Future setupNotification() async {
  // Android Channel
  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    'high_importance_channel', // id
    'High Importance Notifications', // title
    description:
        'This channel is used for important notifications.', // description
    importance: Importance.max,
  );

  /// initialize local notification configuration
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);

  // initialise the plugin. app_icon needs to be a added as a drawable resource to the Android head project
  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('ic_launcher');

  final IOSInitializationSettings initializationSettingsIOS =
      IOSInitializationSettings(
          onDidReceiveLocalNotification: onDidReceiveLocalNotification);

  final InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid, iOS: initializationSettingsIOS);

  flutterLocalNotificationsPlugin.initialize(initializationSettings,
      onSelectNotification: (payload) async {});

  FirebaseMessaging.instance.getInitialMessage().then((message) {
    if (message != null) {
      print('Message clicked Init!');
      print(message.data);
    }
  });

  // background
  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) async {
    //  "data": {
    //     "type": "message",
    //     "id": 10001
    //   }
    await flutterLocalNotificationsPlugin.cancelAll();
    if (message.data.isNotEmpty) {
      notifyToNav(message);
    } else {
      print("No data");
    }
  });

  // foreground
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    RemoteNotification? notification = message.notification;
    // AndroidNotification? android = message.notification?.android;
    AppController appController = Get.put(AppController());
    // If `onMessage` is triggered with a notification, construct our own
    // local notification to show to users using the created channel.
    if (appController.tabIndex.value != 1) {
      showDialog(
        context: Get.context!,
        builder: (BuildContext context) => CupertinoAlertDialog(
          title: Text(notification!.title ?? ''),
          content: Text(notification.body ?? ''),
          actions: [
            CupertinoDialogAction(
              isDefaultAction: true,
              child: Text('Ok'),
              onPressed: () async {
                await flutterLocalNotificationsPlugin.cancelAll();
                Navigator.of(context, rootNavigator: true).pop();
                notifyToNav(message);
              },
            )
          ],
        ),
      );
    }
  });
}

void onDidReceiveLocalNotification(
    int id, String? title, String? body, String? payload) async {
  // display a dialog with the notification details, tap ok to go to another page
  showDialog(
    context: Get.context!,
    builder: (BuildContext context) => CupertinoAlertDialog(
      title: Text(title ?? ''),
      content: Text(body ?? ''),
      actions: [
        CupertinoDialogAction(
          isDefaultAction: true,
          child: Text('Ok'),
          onPressed: () async {
            print(payload);
            Navigator.of(context, rootNavigator: true).pop();
          },
        )
      ],
    ),
  );
}

void notifyToNav(RemoteMessage message) {
  AppController appController = Get.put(AppController());
  switch (message.data['type']) {
    case "message":
      appController.setTabIndex(1);
      Navigator.push(
        Get.context!,
        MaterialPageRoute(
          builder: (_) => Messages(
            id: int.parse(message.data['id']),
          ),
        ),
      );
      break;
    default:
      print("default");
  }
}

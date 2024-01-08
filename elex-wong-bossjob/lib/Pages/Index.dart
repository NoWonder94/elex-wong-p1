import 'dart:async';
import 'dart:developer';

import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:bossjobapp/Pages/ProfilePage.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:bossjobapp/Widgets/Common/PageScreen.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/FooterBar.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Pages/Jobs.dart';
import 'package:bossjobapp/Pages/Chat.dart';
import 'package:uni_links/uni_links.dart';

bool _initialUriIsHandled = false;

class Index extends StatefulWidget {
  @override
  _IndexState createState() => _IndexState();
}

class _IndexState extends State<Index> {
  final List<Widget> pageList = [
    Jobs(),
    Chat(),
    ProfilePage(),
  ];
  StreamSubscription? _sub;
  AuthController authController = Get.find();
  LogService logService = Get.find();
  AppController appController = Get.put(AppController());
  SearchJobController searchJobController = Get.put(SearchJobController());

  @override
  void initState() {
    _handleIncomingLinks();
    _handleInitialLink();
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
    var withoutScheme = link.toLowerCase().split(scheme.toLowerCase());
    if (withoutScheme.length == 1) {
      logService.logPrint(link.toString() + 'no page type');
      return;
    } else if (withoutScheme.length == 2) {
      var splitParams = withoutScheme[1].split('/');
      if (splitParams.length == 1) {
        deeplinkRoute(
          page: splitParams[0],
        );
      } else {
        deeplinkRoute(
          page: splitParams[0],
          params: splitParams[1],
        );
      }
    }
  }

  void deeplinkRoute({String? page, String? params}) {
    if (authController.isLogin()) {
      switch (page) {
        case 'job-list':
          searchJobController.searchJob();
          Get.toNamed('/search');
          Get.toNamed('/searchResult');
          break;
        case 'job-detail':
          Get.toNamed('/jobDetail', arguments: {
            'route': 'deeplink',
            'id': params,
          });
          break;
        case 'company':
          Get.toNamed('/companyDetail', arguments: {
            'companyID': params,
            'is_show_job': false,
          });
          break;
        case 'chat':
          appController.setTabIndex(1);
          break;
        case 'manage_resume':
          Get.toNamed('/manageResume');
          break;
        case 'account_setting':
          Get.toNamed('/editProfile');
          break;
        default:
      }
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

  Widget build(BuildContext context) {
    AppController appController = Get.put(AppController());

    return PageScreen(
      doubleClickExit: true,
      appBar: HeaderBar(),
      bottomNavigationBar: FooterBar(),
      child: RefreshIndicator(
        onRefresh: appController.refresh,
        child: Obx(() => pageList[appController.tabIndex.value]),
      ),
    );
  }
}

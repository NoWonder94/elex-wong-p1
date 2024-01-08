import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PageScreen extends StatelessWidget {
  const PageScreen({
    Key? key,
    this.onBack,
    this.child,
    this.drawer,
    this.bgColor = background,
    this.doubleClickExit = false,
    this.appBar,
    this.bottomNavigationBar,
  }) : super(key: key);

  final Function? onBack;
  final Widget? child;
  final Drawer? drawer;
  final Color? bgColor;
  final bool doubleClickExit;
  final PreferredSizeWidget? appBar;
  final Widget? bottomNavigationBar;

  @override
  Widget build(BuildContext context) {
    LogService logService = Get.find();
    return Obx(() => Scaffold(
          appBar: appBar,
          drawer: drawer,
          floatingActionButton: logService.logEnable.value
              ? FloatingActionButton(
                  child: Icon(Icons.note_alt),
                  onPressed: () {
                    Get.toNamed('/logs');
                  },
                )
              : Container(),
          bottomNavigationBar: bottomNavigationBar,
          body: DoubleBackToCloseApp(
              onBack: onBack,
              enable: doubleClickExit,
              snackBar: const SnackBar(
                content: Text('Tap back again to leave'),
              ),
              child: child!),
        ));
  }
}

class DoubleBackToCloseApp extends StatefulWidget {
  /// The [SnackBar] shown when the user taps the back-button.
  final SnackBar snackBar;

  /// The widget below this widget in the tree.
  final Widget child;

  /// The on double back function enable
  final bool enable;

  /// Override on back action
  final Function? onBack;

  /// Creates a widget that allows the user to close the app by double tapping
  /// the back-button.
  const DoubleBackToCloseApp({
    Key? key,
    required this.snackBar,
    required this.child,
    this.enable = true,
    this.onBack,
  }) : super(key: key);

  @override
  _DoubleBackToCloseAppState createState() => _DoubleBackToCloseAppState();
}

class _DoubleBackToCloseAppState extends State<DoubleBackToCloseApp> {
  /// The last time the user tapped Android's back-button.
  DateTime? _lastTimeBackButtonWasTapped;

  /// Returns whether the current platform is Android.
  bool get _isAndroid => Theme.of(context).platform == TargetPlatform.android;

  /// Returns whether the [DoubleBackToCloseApp.snackBar] is currently visible.
  ///
  /// The snack-bar is going to be considered visible if the duration of the
  /// snack-bar is greater than the difference from now to the
  /// [_lastTimeBackButtonWasTapped].
  ///
  /// This is not quite accurate since the snack-bar could've been dismissed by
  /// the user, so this algorithm needs to be improved, as described in #2.
  bool get _isSnackBarVisible {
    final lastTimeBackButtonWasTapped = _lastTimeBackButtonWasTapped;
    return (lastTimeBackButtonWasTapped != null) &&
        (widget.snackBar.duration >
            DateTime.now().difference(lastTimeBackButtonWasTapped));
  }

  /// Returns whether the next back navigation of this route will be handled
  /// internally.
  ///
  /// Returns true when there's a widget that inserted an entry into the
  /// local-history of the current route, in order to handle pop. This is done
  /// by [Drawer], for example, so it can close on pop.
  bool get _willHandlePopInternally =>
      ModalRoute.of(context)?.willHandlePopInternally ?? false;

  @override
  Widget build(BuildContext context) {
    assert(() {
      _ensureThatContextContainsScaffold();
      return true;
    }());

    // if (_isAndroid) {
    //   return WillPopScope(
    //     onWillPop: _handleWillPop,
    //     child: widget.child,
    //   );
    // } else {
    //   return widget.child;
    // }
    return WillPopScope(
      onWillPop: _handleWillPop,
      child: widget.child,
    );
  }

  /// Handles [WillPopScope.onWillPop].
  Future<bool> _handleWillPop() async {
    if (widget.enable) {
      if (_isSnackBarVisible || _willHandlePopInternally) {
        return true;
      } else {
        _lastTimeBackButtonWasTapped = DateTime.now();
        final scaffoldMessenger = ScaffoldMessenger.of(context);
        scaffoldMessenger.hideCurrentSnackBar();
        scaffoldMessenger.showSnackBar(widget.snackBar);
        return false;
      }
    } else {
      widget.onBack!();
      return false;
    }
  }

  /// Throws a [FlutterError] if this widget was not wrapped in a [Scaffold].
  void _ensureThatContextContainsScaffold() {
    if (Scaffold.maybeOf(context) == null) {
      throw FlutterError(
        '`DoubleBackToCloseApp` must be wrapped in a `Scaffold`.',
      );
    }
  }
}
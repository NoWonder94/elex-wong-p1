import 'dart:async';
import 'dart:io';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webview_flutter/webview_flutter.dart';

class AppWebViewWidget extends StatefulWidget {
  final String title;
  final String url;

  const AppWebViewWidget({Key? key, required this.title, required this.url})
      : super(key: key);

  @override
  State<AppWebViewWidget> createState() => _WebViewWidgetState();
}

class _WebViewWidgetState extends State<AppWebViewWidget> {
  bool isLoading = true;
  String webTitle = '';
  String webUrl = '';
  final Completer<WebViewController> _controller =
      Completer<WebViewController>();
  late WebViewController webController;

  @override
  void initState() {
    super.initState();
    // if (Platform.isAndroid) WebView.platform = SurfaceAndroidWebView();
    // if (Platform.isIOS) WebView.platform = CupertinoWebView();
    if (widget.title.isNotEmpty) {
      webTitle = widget.title;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      InkWell(
                        onTap: () => Get.back(),
                        child: const Icon(
                          Icons.arrow_back_ios_new,
                          color: Colors.white,
                          size: 25,
                        ),
                      ),
                      Text(webTitle.toString(),
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.subtitle1!),
                      InkWell(
                        onTap: () {
                          bottomMenuDrawer(context);
                        },
                        child: const Icon(
                          Icons.more_vert,
                          color: Colors.white,
                          size: 25,
                        ),
                      )
                    ],
                  ),
                ),
                Expanded(
                  child: WebView(
                    initialUrl: widget.url,
                    onWebViewCreated: (WebViewController webViewController) {
                      _controller.complete(webViewController);
                      webController = webViewController;
                    },
                    onPageFinished: (String url) {
                      setState(() {
                        isLoading = false;
                      });
                      webController.getTitle().then((value) {
                        // print(value);
                        // setState(() {
                        //   webTitle = value!;
                        // });
                      });
                    },
                    javascriptMode: JavascriptMode.unrestricted,
                  ),
                ),
              ],
            ),
            Visibility(
              visible: isLoading,
              child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.9,
                child: const Center(
                  child: CircularProgressIndicator(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bottomMenuDrawer(context) {
    return showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return Container(
            color: Colors.black,
            height: MediaQuery.of(context).size.height * 0.2,
            child: Column(
              children: [
                ListTile(
                  title: const Text(
                    "Copy",
                    style: TextStyle(color: Colors.white),
                  ),
                  leading: const Icon(
                    Icons.content_copy,
                    color: Colors.white,
                  ),
                  onTap: () {
                    // copy(url);
                  },
                ),
                FutureBuilder(
                    future: _controller.future,
                    builder:
                        (context, AsyncSnapshot<WebViewController> snapshot) {
                      if (snapshot.hasData) {
                        return SingleChildScrollView(
                          child: Column(
                            children: [
                              ListTile(
                                title: const Text(
                                  "Reload",
                                  style: TextStyle(color: Colors.white),
                                ),
                                leading: const Icon(
                                  Icons.replay,
                                  color: Colors.white,
                                ),
                                onTap: () {
                                  if (snapshot.connectionState ==
                                      ConnectionState.done) {
                                    webController.reload();
                                    // showSuccess('Reload', 'Reload Complete');
                                    Navigator.of(context).pop();
                                  }
                                },
                              ),
                              // ListTile(
                              //   title: const Text(
                              //     "Clear Cache",
                              //     style: TextStyle(color: Colors.white),
                              //   ),
                              //   leading: const Icon(
                              //     Icons.cached_outlined,
                              //     color: Colors.white,
                              //   ),
                              //   onTap: () async {
                              //     await webController.clearCache();
                              //     // showSuccess('Cache', 'Cache Cleared');
                              //     Navigator.of(context).pop();
                              //   },
                              // ),
                            ],
                          ),
                        );
                      }
                      return Container();
                    })
              ],
            ),
          );
        });
  }
}

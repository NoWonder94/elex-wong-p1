import 'dart:convert';

import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Services/LogService.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:bossjobapp/Widgets/Common/JsonViewer.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

class LogPage extends StatefulWidget {
  const LogPage({Key? key}) : super(key: key);

  @override
  _LogPageState createState() => _LogPageState();
}

class _LogPageState extends State<LogPage> {
  final LogService logService = Get.find();
  int tab = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Debug Log'),
      ),
      body: SingleChildScrollView(
        child: Container(
          child: Obx(() => Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ElevatedButton(
                          onPressed: () {
                            logService.clearLog();
                          },
                          child: Text('Clear Log'),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              if (tab == 0) {
                                tab = 1;
                              } else {
                                tab = 0;
                              }
                            });
                          },
                          child: Text(tab == 1 ? 'Api Logs' : 'Print Logs'),
                        ),
                      ),
                    ],
                  ),
                  if (logService.logs2.length == 0)
                    Center(
                        child: Text(
                      'No Logs, Please trigger api call before check.',
                      style: TextStyle(color: primaryColor),
                    )),
                  if (tab == 1) PrintLog(),
                  if (tab == 0)
                    for (var i = 0; i < logService.logs2.length; i++)
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          InkWell(
                            onTap: () {
                              Clipboard.setData(ClipboardData(
                                  text: logService.logs2[i].response.realUri
                                      .toString()));

                              showSuccess(
                                  'Copied',
                                  logService.logs2[i].response.realUri
                                      .toString());
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                logService.logs2[i].response.realUri.toString(),
                                style: TextStyle(color: primaryColor),
                              ),
                            ),
                          ),
                          JsonViewer(jsonDecode(
                              logService.logs2[i].response.toString())),
                          Divider(),
                        ],
                      ),
                ],
              )),
        ),
      ),
    );
  }
}

class PrintLog extends StatelessWidget {
  const PrintLog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final LogService logService = Get.find();
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: logService.printLog
            .map((element) => Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      InkWell(
                        onTap: () {
                          Clipboard.setData(
                              ClipboardData(text: element.toString()));

                          showSuccess('Copied', element.toString());
                        },
                        child: Text(
                          element.toString(),
                          style: TextStyle(color: primaryColor),
                        ),
                      ),
                    ],
                  ),
                ))
            .toList(),
      ),
    );
  }
}

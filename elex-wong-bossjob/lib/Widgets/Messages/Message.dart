import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:bossjobapp/Constants/textStyle.dart';

class Message extends StatelessWidget {
  final String title;
  final String desc;
  final String content;
  final String time;
  final Function()? onPressed;
  final bool unread;

  const Message({
    Key? key,
    this.title = '',
    this.content = '',
    this.time = '',
    this.onPressed,
    this.desc = '',
    this.unread = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          margin: EdgeInsets.only(bottom: 10),
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(0),
              ),
            ),
            child: Row(
              children: [
                Flexible(
                  child: Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      title,
                                      style: styleJobListTitleText,
                                    ),
                                  ),
                                  SizedBox(
                                    width: 30,
                                  ),
                                  Text(
                                    time,
                                    style: styleJobListPriceText,
                                  ),
                                ],
                              ),
                              if (desc.isNotEmpty)
                                SizedBox(
                                  height: 5,
                                ),
                              if (desc.isNotEmpty)
                                Text(
                                  desc,
                                  style: styleJobListDescText,
                                ),
                            ],
                          ),
                        ),
                        Container(
                          width: w(context, 0.8),
                          height: h(context, 0.1),
                          padding: EdgeInsets.only(left: 2),
                          child: Html(
                            data: content,
                            style: {
                              "p": Style(color: Colors.black54),
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // if (unread)
                //   Container(
                //     width: 2,
                //     height: h(context, 0.15),
                //     decoration: BoxDecoration(
                //         color: Colors.red[500],
                //         borderRadius: BorderRadius.circular(120)),
                //   ),
              ],
            ),
            onPressed: onPressed,
          ),
        ),
        if (unread)
          Positioned(
            bottom: w(context, 0.1),
            right: w(context, 0.1),
            child: Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                  color: Colors.red[500],
                  borderRadius: BorderRadius.circular(120)),
            ),
          )
      ],
    );
  }
}

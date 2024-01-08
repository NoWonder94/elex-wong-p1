import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import 'package:flutter_html/flutter_html.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/Job.dart';
import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/ChatController.dart';

class Messages extends StatefulWidget {
  //初始化websocket
  final WebSocketChannel channel =
      IOWebSocketChannel.connect('wss://workerman.bossjob.com:7171/');

  final int id;
  Messages({
    this.id = 0,
  });

  @override
  _MessagesState createState() => new _MessagesState(channel: channel);
}

class _MessagesState extends State<Messages> {
  //初始化websocket
  final WebSocketChannel channel;
  _MessagesState({required this.channel}) {
    channel.stream.listen((data) {
      setState(() {
        // print(data);

        //监听数据
        bool result = chatController.receiveMsg(data);
        if (result) {
          //自动滑到最下方
          _scrollToBottom();
        }
      });
    });
  }

  AuthController authController = Get.put(AuthController());
  AppController appController = Get.put(AppController());
  ChatController chatController = Get.put(ChatController());
  final ScrollController scrollController = ScrollController();
  var textEditingController = TextEditingController();
  int page = 1;
  String msg = '';
  List date = [];

  @override
  void initState() {
    appController.getUserProfile();
    //获取token
    final String? token = authController.getToken();
    // print(token);
    //用token登入websocket
    channel.sink.add('{"type": "login", "token": "' + token! + '"}');

    chatController.getChatDetail(
      dialogueId: widget.id,
      page: this.page,
    );
    AnalyticsService().clickChat();
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
              scrollController.position.maxScrollExtent * 0.8 &&
          !chatController.isChatDetailLoading.value &&
          page < chatController.totalPage.value) {
        chatController.getChatDetail(
          dialogueId: widget.id,
          page: ++this.page,
        );
      }
    });

    super.initState();
  }

  @override
  void dispose() {
    channel.sink.close();
    scrollController.dispose();
    super.dispose();
  }

  _buildMessage(bool isMe, String? avatar, String recipientAvatar, String msg,
      String time) {
    return Column(
      children: [
        ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: 200,
          ),
          child: Container(
            margin: EdgeInsets.symmetric(
              vertical: 15,
            ),
            padding: EdgeInsets.symmetric(
              vertical: 5,
              horizontal: 10,
            ),
            decoration: BoxDecoration(
              color: Color(0xFFEDEDED),
              borderRadius: BorderRadius.all(
                Radius.circular(30),
              ),
            ),
            child: Text(
              formatDate(time),
              style: TextStyle(
                color: Color(0xFFA5A5A5),
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ),
        Align(
          alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            margin: isMe
                ? const EdgeInsets.only(right: 15)
                : const EdgeInsets.only(left: 15),
            padding: const EdgeInsets.symmetric(
              vertical: 5.0,
              horizontal: 10.0,
            ),
            width: MediaQuery.of(context).size.width * 0.50,
            decoration: BoxDecoration(
              color: isMe ? Color(0xFF528DFF) : Color(0xFFFFFFFF),
              borderRadius: isMe
                  ? BorderRadius.only(
                      topLeft: Radius.circular(15.0),
                      topRight: Radius.circular(15.0),
                      bottomLeft: Radius.circular(15.0),
                    )
                  : BorderRadius.only(
                      topLeft: Radius.circular(15.0),
                      topRight: Radius.circular(15.0),
                      bottomRight: Radius.circular(15.0),
                    ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Html(data: msg, style: {
                  'body': isMe
                      ? Style(
                          color: Colors.white,
                          fontSize: FontSize(16),
                        )
                      : Style(
                          color: Colors.black,
                          fontSize: FontSize(16),
                        ),
                }),
                Align(
                  alignment: Alignment.bottomRight,
                  child: Text(
                    formatTime(time),
                    style: TextStyle(
                      color: isMe ? Colors.white : Colors.black,
                      fontWeight: FontWeight.normal,
                      fontSize: 10,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  _buildMessageComposer() {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 8.0,
      ),
      height: 70.0,
      color: Colors.white,
      child: Row(
        children: <Widget>[
          SizedBox(
            width: 25.0,
          ),
          Expanded(
            child: TextField(
              controller: textEditingController,
              decoration: InputDecoration.collapsed(
                hintText: 'Send a message...',
              ),
              onChanged: (value) {
                setState(() {
                  msg = value;
                });
              },
            ),
          ),
          IconButton(
            icon: Icon(
              Icons.send,
            ),
            iconSize: 25.0,
            color: Theme.of(context).primaryColor,
            onPressed: () {
              if (msg != '') {
                var result = chatController.addMsg(
                  dialogueId: widget.id,
                  content: msg,
                );

                if (result != '') {
                  //发送信息给websocket
                  channel.sink.add(result);

                  msg = '';
                  textEditingController.clear();
                }
              }
            },
          ),
          SizedBox(
            width: 15.0,
          ),
        ],
      ),
    );
  }

  _scrollToBottom() {
    Timer(
      Duration(milliseconds: 30),
      () => scrollController.animateTo(
        scrollController.position.minScrollExtent,
        duration: Duration(milliseconds: 60),
        curve: Curves.fastOutSlowIn,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        chatController.clearChatDetail();
        Get.back();
        return Future.delayed(Duration(seconds: 1), () {
          return false;
        });
      },
      child: Scaffold(
        backgroundColor: Colors.grey[100],
        appBar: HeaderBar(
          isShowOnBack: true,
          onBackClick: () {
            chatController.clearChatDetail();
            Get.back();
          },
        ),
        body: GestureDetector(
          child: Column(
            children: <Widget>[
              Obx(
                () => Container(
                  decoration: BoxDecoration(color: primaryColor),
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      if (this
                          .chatController
                          .chatRecipientAvatar
                          .value
                          .isNotEmpty)
                        CircleAvatar(
                          backgroundImage: NetworkImage(
                            chatController.chatRecipientAvatar.value,
                          ),
                          radius: 15,
                        ),
                      SizedBox(width: 10.0),
                      Text(
                        this.chatController.chatRecipientName.value,
                        style: TextStyle(
                            fontSize: 15,
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
              Obx(
                () => Job(
                  title: this.chatController.jobTitle.toString(),
                  price: formatJobPrice(this.chatController.salaryRangeFrom,
                      this.chatController.salaryRangeTo),
                  jobs: this.chatController.jobLocation.toString(),
                  year: this.chatController.xpLevel.toString(),
                  graduate: this.chatController.master.toString(),
                  time: this.chatController.fullTime.toString(),
                ),
              ),
              Expanded(
                child: Container(
                  margin: EdgeInsets.only(
                    bottom: 20,
                  ),
                  child: Obx(
                    () => ListView.builder(
                        controller: scrollController,
                        padding: EdgeInsets.only(top: 15.0),
                        reverse: true,
                        itemCount: chatController.chatDetail.length,
                        itemBuilder: (BuildContext context, int index) {
                          final bool isMe = chatController.chatDetail[index]
                                  ['send_user_id'] ==
                              appController.getUserId();
                          return _buildMessage(
                            isMe,
                            appController.getUserAvatar(),
                            chatController.chatDetail[index]
                                        ['send_user_avatar'] !=
                                    null
                                ? chatController.chatDetail[index]
                                    ['send_user_avatar']
                                : '',
                            chatController.chatDetail[index]['content'],
                            chatController.chatDetail[index]['created_at'],
                          );
                        }),
                  ),
                ),
              ),
              _buildMessageComposer(),
            ],
          ),
          onTap: () => FocusScope.of(context).unfocus(),
        ),
      ),
    );
  }
}

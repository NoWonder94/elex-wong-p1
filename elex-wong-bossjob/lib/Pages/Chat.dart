import 'package:bossjobapp/Controllers/AuthController.dart';
import 'package:bossjobapp/Services/AnalyticsService.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Pages/Messages.dart';
import 'package:bossjobapp/Widgets/Messages/Message.dart';
import 'package:bossjobapp/Controllers/ChatController.dart';
import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class Chat extends StatefulWidget {
  @override
  _ChatState createState() => new _ChatState();
}

class _ChatState extends State<Chat> {
  ChatController chatController = Get.put(ChatController());
  AuthController authController = Get.put(AuthController());

  final ScrollController scrollController = ScrollController();
  var textEditingController = TextEditingController();
  int page = 1;
  String status = 'Active';
  String keyword = '';
  final WebSocketChannel channel =
      IOWebSocketChannel.connect('wss://workerman.bossjob.com:7171/');
  //初始化websocket
  _ChatState() {
    channel.stream.listen((data) {
      setState(() {
        chatController.refreshList();
      });
    });
  }

  @override
  void initState() {
    AnalyticsService().clickChatList();
    super.initState();

    final String? token = authController.getToken();
    channel.sink.add('{"type": "login", "token": "' + token! + '"}');
    chatController.clearChatList();

    chatController.getChatList(
      page: this.page,
    );
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
              scrollController.position.maxScrollExtent &&
          chatController.isChatListLoading.value == false) {
        chatController.getChatList(
          page: ++this.page,
        );
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    channel.sink.close();
    scrollController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      controller: scrollController,
      child: Stack(
        children: [
          Column(
            children: [
              Container(
                margin: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 20,
                ),
                padding: EdgeInsets.only(
                  bottom: 6,
                ),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      width: 1,
                      color: messagesDivider,
                    ),
                  ),
                ),
                child: Row(
                  children: [
                    TextButton(
                      style: TextButton.styleFrom(
                        padding: EdgeInsets.zero,
                      ),
                      child: Row(
                        children: [
                          DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              style: styleMessagesStatusText,
                              icon: Icon(
                                Icons.arrow_drop_down,
                                color: icon,
                              ),
                              underline: Container(),
                              items: <String>[
                                'Active',
                                'Close',
                                'Archive'
                              ].map<DropdownMenuItem<String>>((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(
                                    value,
                                  ),
                                );
                              }).toList(),
                              value: status,
                              onChanged: (String? value) {
                                setState(() {
                                  status = value!;
                                  chatController.getChatListByStatus(
                                    status: value,
                                  );
                                });
                              },
                            ),
                          ),
                        ],
                      ),
                      onPressed: () {},
                    ),
                    Flexible(fit: FlexFit.tight, child: SizedBox()),
                    Container(
                        padding: EdgeInsets.symmetric(
                          vertical: 8,
                          horizontal: 20,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(
                            width: 1,
                            color: searchBorder,
                          ),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          children: [
                            SizedBox(
                              width: 120,
                              height: 20,
                              child: TextFormField(
                                controller: textEditingController,
                                decoration: new InputDecoration.collapsed(
                                  hintText: 'Search by job title',
                                  hintStyle: styleSearchHint,
                                ),
                                style: styleSearchInputText,
                                onChanged: (value) {
                                  setState(() {
                                    keyword = value;
                                  });
                                },
                              ),
                            ),
                            SizedBox(
                              width: 30,
                            ),
                            IconButton(
                              padding: EdgeInsets.zero,
                              constraints: BoxConstraints(),
                              icon: Icon(
                                Icons.search,
                                color: messagesSearchIcon,
                              ),
                              onPressed: () {
                                chatController.getChatListByFilter(
                                  keyword: keyword,
                                );
                                //textEditingController.clear();
                              },
                            ),
                          ],
                        )),
                  ],
                ),
              ),
              Obx(() => chatController.isChatListLoading.value
                  ? SpinKitChasingDots(
                      color: primaryColor,
                    )
                  : Container()),
              Obx(() {
                if (chatController.isChatListLoading.value) return Container();
                if (chatController.chatList.length < 1)
                  return Text('No Message');
                return ListView.separated(
                  physics: NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemBuilder: (context, index) {
                    if (chatController.chatList[index]['latest_chat'] == null) {
                      return Container();
                    }
                    return Message(
                      unread: chatController.chatList[index]['is_unread'],
                      desc: chatController.chatList[index]['job_title'] ?? '',
                      title: chatController.chatList[index]['recipient']
                              ['first_name'] ??
                          '',
                      content: chatController.chatList[index]['latest_chat']
                              ?['content'] ??
                          '',
                      time: formatChatDate(chatController.chatList[index]
                              ['latest_chat']?['created_at'] ??
                          ''),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => Messages(
                              id: chatController.chatList[index]['id'],
                            ),
                          ),
                        );
                      },
                    );
                  },
                  separatorBuilder: (context, index) {
                    return Container();
                  },
                  itemCount: chatController.chatList.length,
                );
              }),
            ],
          ),
        ],
      ),
    );
  }
}

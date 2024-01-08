import 'package:get/get.dart';
import 'dart:convert';
import 'package:bossjobapp/Constants/common.dart';
import 'package:bossjobapp/Controllers/BaseController.dart';

class ChatController extends BaseController {
  RxList chatList = [].obs;
  RxBool isUnread = false.obs;
  RxInt statusId = 1.obs;
  RxString keyword = ''.obs;
  RxString keywordType = ''.obs;
  RxString jobTitle = ''.obs;
  RxString chatRecipientAvatar = ''.obs;
  RxString chatRecipientName = ''.obs;
  int salaryRangeFrom = 0;
  int salaryRangeTo = 0;
  RxString jobLocation = ''.obs;
  RxString xpLevel = ''.obs;
  RxString master = ''.obs;
  RxString fullTime = ''.obs;
  RxList chatDetail = [].obs;
  RxBool isChatListLoading = false.obs;
  RxBool isChatDetailLoading = false.obs;
  RxInt totalPage = 0.obs;
  RxInt size = 0.obs;

  @override
  void onInit() async {
    super.onInit();
  }

  void refreshList() {
    // clearChatList();
    getChatList(page: 1, loadingEnable: false);
  }

  Future getChatList({page = 1, loadingEnable = true}) async {
    if (this.isChatListLoading.value == true) {
      return false;
    }

    if (page == 1 && loadingEnable) {
      this.isChatListLoading.value = true;
    }

    var userId = prefs.getInt('user_id');
    if (userId! <= 0) {
      return false;
    }

    var params = {
      "is_unread": this.isUnread.value == false ? null : 1,
      "page": page,
      "query": this.keyword.value != '' ? this.keyword.value : null, //search
      "query_field":
          this.keywordType.value != '' ? this.keywordType.value : null, //search
      "role_id": 1,
      "size": 8,
      "status_id": this.statusId.value,
    };
    var result = await apiService.getChatList(userId, params);
    if (result['success'] == true && result['data'] != null) {
      if (result['data']['chats'] != null &&
          result['data']['chats'].length > 0) {
        if (page == 1) {
          this.chatList.value = result['data']['chats'];
        } else {
          this.chatList.addAll(result['data']['chats']);
        }
      }
    }
    this.isChatListLoading.value = false;
  }

  Future getChatListByStatus({status = ''}) async {
    this.clearChatList();
    this.resetChatListStatus();
    switch (status) {
      case 'Active':
        this.statusId.value = 1;
        break;
      case 'Close':
        this.statusId.value = 2;
        break;
      case 'Archive':
        this.statusId.value = 3;
        break;
      default:
        this.statusId.value = 1;
        break;
    }
    this.getChatList();
  }

  void resetChatListStatus() {
    this.isUnread.value = false;
    this.statusId.value = 1;
  }

  Future getChatListByFilter({keyword = ''}) async {
    this.clearChatList();
    if (keyword != '') {
      //this.keywordType.value = 'name';
      this.keywordType.value = 'job_title';
    } else {
      this.keywordType.value = '';
    }
    this.keyword.value = keyword;
    this.getChatList();
  }

  Future getChatDetail({dialogueId = 0, page = 1}) async {
    if (this.isChatDetailLoading.value == true) {
      return false;
    }

    // if (page > currentPage.value)

    var userId = prefs.getInt('user_id');
    if (userId! <= 0) {
      return false;
    }

    if (dialogueId <= 0) {
      return false;
    }

    this.isChatDetailLoading.value = true;
    var params = {
      'page': page,
      'size': 10,
    };
    var result = await apiService.getChatDetail(userId, dialogueId, params);
    if (result['success'] == true && result['data'] != null) {
      if (result['data']['job'] != null) {
        this.jobTitle.value = result['data']['job']['job_title'] != null
            ? result['data']['job']['job_title']
            : '';
        this.salaryRangeFrom =
            result['data']['job']['salary_range_from'] != null
                ? result['data']['job']['salary_range_from']
                : 0;
        this.salaryRangeTo = result['data']['job']['salary_range_to'] != null
            ? result['data']['job']['salary_range_to']
            : 0;
        this.jobLocation.value = result['data']['job']['job_location'] != null
            ? result['data']['job']['job_location']
            : '';
        this.xpLevel.value = result['data']['job']['xp_lvl'] != null
            ? result['data']['job']['xp_lvl']
            : '';
        this.master.value = result['data']['job']['degree'] != null
            ? result['data']['job']['degree']
            : '';
        this.fullTime.value = result['data']['job']['job_type'] != null
            ? result['data']['job']['job_type']
            : '';
        this.chatRecipientName.value =
            result['data']['recipient']['first_name'] != null
                ? result['data']['recipient']['first_name']
                : '';
        this.chatRecipientAvatar.value =
            result['data']['recipient']['avatar'] != null
                ? result['data']['recipient']['avatar']
                : '';
      }

      if (result['data']['chats'] != null &&
          result['data']['chats'].length > 0) {
        List list = result['data']['chats'].reversed.toList();
        this.chatDetail.addAll(list);
        size.value = result['data']['total_num'];
        totalPage.value = result['data']['total_pages'];
      }
    }
    this.isChatDetailLoading.value = false;
  }

  String addMsg({dialogueId = 0, content = ''}) {
    var userId = prefs.getInt('user_id');
    if (userId! > 0 && content != '') {
      var params = {
        "type": "say",
        "content": "<p>" + content + "</p>",
        "action": 1,
        "dialogue_id": dialogueId,
        "status": 1,
        "status_mark": getUnixTime(),
        "from_user_id": userId,
      };

      return jsonEncode(params);
    }

    return '';
  }

  bool receiveMsg(data) {
    refreshList();
    var json = jsonDecode(data);
    if (json['type'] == 'say') {
      List array = [
        {
          "send_user_id": json['from_user_id'],
          "receive_user_avatar": json['recipient_avatar'],
          "content": json['content'],
          "created_at": json['time'],
        }
      ];
      this.chatDetail.insertAll(0, array);
      return true;
    }

    return false;
  }

  Future clearChatList() async {
    this.statusId.value = 1;
    this.chatList.clear();
  }

  Future clearChatDetail() async {
    this.jobTitle.value = '';
    this.chatRecipientAvatar.value = '';
    this.chatRecipientName.value = '';
    this.salaryRangeFrom = 0;
    this.salaryRangeTo = 0;
    this.jobLocation.value = '';
    this.xpLevel.value = '';
    this.master.value = '';
    this.fullTime.value = '';
    size.value = 0;
    totalPage.value = 0;
    this.chatDetail.clear();
  }
}

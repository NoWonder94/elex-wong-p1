import 'package:firebase_analytics/firebase_analytics.dart';

class AnalyticsService {
  FirebaseAnalytics analytics = FirebaseAnalytics();

  void init() {
    analytics.setAnalyticsCollectionEnabled(true);
  }

  void setId(id) {
    analytics.setUserId(id.toString());
  }

  /// When user sign up successfully using email
  void signUp(signUpMethod) async {
    analytics.logEvent(
        name: 'signup_success', parameters: {"signup_source": signUpMethod});
  }

  /// When user log in to product using any means
  void login(loginMethod) async {
    analytics.logEvent(
        name: 'login_success', parameters: {"login_source": loginMethod});
  }

  /// When user skip the onboarding (add info) screen
  void skipInfo(from) async {
    analytics
        .logEvent(name: 'add_info_skip', parameters: {"add_info_source": from});
  }

  /// When user finish the onboarding process successfully
  void addInfo(from) async {
    analytics.logEvent(
        name: 'add_info_success', parameters: {"add_info_source": from});
  }

  /// When user view any job detail page
  void viewJob(
    from, {
    id,
    String? location,
    String? type,
    String? cate,
  }) async {
    analytics.logEvent(name: 'view_job', parameters: {
      "view_job_source": from,
      "job_id": id,
      "job_location": location,
      "job_type": type,
      "job_category": cate,
    });
  }

  /// When user view any company detail page
  void viewCompany({id, String? industry, int jobsCount = 0}) async {
    analytics.logEvent(name: 'view_company', parameters: {
      "company_id": id,
      "company_industry": industry,
      "company_jobs_no": jobsCount
    });
  }

  /// When user click apply and view the apply job page
  void viewApplyJob(
      {id,
      String? location,
      String? type,
      String? cate,
      int isEmailVerify = 0}) async {
    analytics.logEvent(name: 'view_apply_job', parameters: {
      "job_id": id,
      "job_location": location,
      "job_type": type,
      "job_category": cate,
      "user_email_isverify": isEmailVerify,
    });
  }

  /// When user submit the application form successfully
  void applyJobSuccess({
    id,
    String? location,
    String? type,
    String? cate,
  }) async {
    analytics.logEvent(name: 'apply_job_success', parameters: {
      "job_id": id,
      "job_location": location,
      "job_type": type,
      "job_category": cate,
    });
  }

  /// When user click on Chat tab and view the list of chats
  void clickChatList() {
    analytics.logEvent(name: 'click_chat_lists');
  }

  /// When user click on any chat and view the specific chat
  void clickChat() {
    analytics.logEvent(name: 'click_chat');
  }

  /// When user click on Profile tab
  void clickProfile() {
    analytics.logEvent(name: 'click_profile');
  }

  /// When user click on manage resume tab
  void clickManageResume() {
    analytics.logEvent(name: 'click_manage_resume');
  }

  /// When user click on account setting
  void clickAccountSetting() {
    analytics.logEvent(name: 'click_account_setting');
  }

  /// When user update resume
  void updateResume(field) {
    analytics.logEvent(name: 'update_resume', parameters: {
      "field": field,
    });
  }

  /// When user update account
  void updateAccount(field) {
    analytics.logEvent(name: 'update_account', parameters: {
      "field": field,
    });
  }

  /// When user click on application history
  void clickAppsHistory(int count) {
    analytics.logEvent(
        name: 'click_application_history', parameters: {"user_app_no": count});
  }

  /// When user click on any quick links on the home page
  void clickQuickLink(String name) {
    analytics.logEvent(
        name: 'click_quick_links', parameters: {"quick_link_name": name});
  }

  /// When user click on any top company on home page
  void clickTopCom(id) {
    analytics
        .logEvent(name: 'click_top_company', parameters: {"company_id": id});
  }

  /// When user use the search bar to search for jobs
  void search(Map<String, dynamic> filter) {
    analytics.logEvent(name: 'search', parameters: filter);
  }
}

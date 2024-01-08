import 'package:bossjobapp/Pages/EditProfile/EditEmail.dart';
import 'package:bossjobapp/Pages/EditProfile/EditMobile.dart';
import 'package:bossjobapp/Pages/EditProfile/EditPassword.dart';
import 'package:bossjobapp/Pages/EditProfile/EditProfile.dart';
import 'package:bossjobapp/Pages/HomePage.dart';
import 'package:bossjobapp/Pages/JobsDetails/company_info.dart';
import 'package:bossjobapp/Pages/JobsDetails/job_info.dart';
import 'package:bossjobapp/Pages/Log/logs.dart';
import 'package:bossjobapp/Pages/LoginSignUpPage.dart';
import 'package:bossjobapp/Pages/ManageResume.dart';
import 'package:bossjobapp/Pages/ManageResume/EditEducationExperience.dart';
import 'package:bossjobapp/Pages/ManageResume/EditWorkExperience.dart';
import 'package:bossjobapp/Pages/ManageResume/EducationExperience.dart';
import 'package:bossjobapp/Pages/ManageResume/JobPreference.dart';
import 'package:bossjobapp/Pages/ManageResume/ProfileUpdate.dart';
import 'package:bossjobapp/Pages/ManageResume/SkillsSoftware.dart';
import 'package:bossjobapp/Pages/ManageResume/WorkExperience.dart';
import 'package:bossjobapp/Pages/ProfileHistory.dart';
import 'package:bossjobapp/Pages/ProfilePage.dart';
import 'package:bossjobapp/Pages/RegisterFlow.dart';
import 'package:bossjobapp/Pages/SearchCareerPlatform.dart';
import 'package:bossjobapp/Pages/SearchJob.dart';
import 'package:bossjobapp/Pages/SearchResult.dart';
import 'package:bossjobapp/Pages/SplashPage.dart';
import 'package:bossjobapp/Pages/Index.dart';
import 'package:bossjobapp/Pages/Jobs.dart';
import 'package:bossjobapp/Pages/Chat.dart';
import 'package:bossjobapp/Pages/Messages.dart';
import 'package:bossjobapp/Pages/ApplyJob.dart';
import 'package:bossjobapp/Pages/ApplyJobSimple.dart';
import 'package:bossjobapp/Pages/Test/test1.dart';
import 'package:bossjobapp/Pages/bosspoints.dart';
import 'package:bossjobapp/Pages/onboarding.dart';
import 'package:get/route_manager.dart';

var pages = [
  GetPage(name: '/', page: () => SplashPage()),
  GetPage(name: '/auth', page: () => LoginSignUpPage()),
  GetPage(name: '/home', page: () => HomePage()),
  GetPage(name: '/index', page: () => Index()),
  GetPage(name: '/jobs', page: () => Jobs()),
  GetPage(name: '/chat', page: () => Chat()),
  GetPage(name: '/messages', page: () => Messages()),
  GetPage(name: '/profile', page: () => ProfilePage()),
  GetPage(name: '/editProfile', page: () => EditProfile()),
  GetPage(name: '/editEmail', page: () => EditEmail()),
  GetPage(name: '/editMobile', page: () => EditMobile()),
  GetPage(name: '/editPassword', page: () => EditPassword()),
  GetPage(name: '/profileHistory', page: () => ProfileHistory()),
  GetPage(name: '/registerFlow', page: () => RegisterFlow()),
  GetPage(name: '/search', page: () => SearchJob()),
  GetPage(name: '/searchResult', page: () => SearchResult()),
  GetPage(name: '/searchCareer', page: () => SearchCareerPlatform()),
  GetPage(name: '/applyJob', page: () => ApplyJob()),
  GetPage(name: '/applyJobSimple', page: () => ApplyJobSimple()),
  GetPage(name: '/manageResume', page: () => ManageResume()),
  GetPage(name: '/profileUpdate', page: () => ProfileUpdate()),
  GetPage(name: '/jobPreference', page: () => JobPreference()),
  GetPage(name: '/workExperience', page: () => WorkExperience()),
  GetPage(name: '/editWorkExperience', page: () => EditWorkExperience()),
  GetPage(name: '/educationExperience', page: () => EducationExperience()),
  GetPage(
      name: '/editEducationExperience', page: () => EditEducationExperience()),
  GetPage(name: '/skillsSoftware', page: () => SkillsSoftware()),
  GetPage(name: '/onboarding', page: () => OnBoarding()),
  GetPage(name: '/jobDetail', page: () => JobInfomation()),
  GetPage(name: '/companyDetail', page: () => CompanyInfomation()),
  GetPage(name: '/test1', page: () => Test1()),
  GetPage(name: '/logs', page: () => LogPage()),
  GetPage(name: '/bosspoints', page: () => BossPointPage()),
];

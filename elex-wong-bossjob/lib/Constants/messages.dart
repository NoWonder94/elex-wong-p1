import 'package:get/get.dart';

class Messages extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'en_US': {
          'success': 'Success',
          'resumeUpdated': 'Resume Updated',
          'avatarUpdated': 'Avatar Updated',
          'jobAppliedSuccess': 'Job Application Submitted',
          'updateSuccess': 'Succesfully Updated',
          'createSuccess': 'Succesfully Created',
          'emailChangedSuccess': 'Email Updated',
          'phoneChangedSuccess': 'Phone Number Updated',
          'passChangedSuccess': 'Password Updated',
          'profileUpdateSuccess': 'Profile Updated',
          'otpSent': 'OTP Sent Successfully.',
          'otpSentDesc': 'A 6-digit OTP has been sent to your mobile number.',
          // ERROR MESSAGES
          'error': 'Error',
          'verifyCodeEmpty_error': 'Please enter 6-digit verification code',
          'mobileEmpty_error': 'Please enter Mobile Number',
          'locationEmpty_error': 'Please select Location',
          'prefSpecEmpty_error': 'Please select Preferred Specialization',
          'availbilityEmpty_error': 'Please select Availability',
          'jobTitleEmpty_error': 'Please enter Job Title',
          'jobSpecEmpty_error': 'Please select Job Specialization',
          'jobCateEmpty_error': 'Please select Job Category',
          'comNameEmpty_error': 'Please enter Company Name',
          'industryEmpty_error': 'Please select Industry ',
          'salaryEmpty_error': 'Please enter Salary',
          'endAfterStartDate_error': 'End Date should be after Start Date',
          'schoolEmpty_error': 'Please enter School Name',
          'fieldStudyEmpty_error': 'Please enter Field of Study ',
          'eduLvlEmpty_error': 'Please select Education Level',
          'verifyEmail_error': 'Please verify your email',
          'messageEmpty_error': 'Please fill in the required message/answers',
          'emailEmpty_error': 'Please enter Email Address',
          'somethingWrong_error':
              'Oops, somethings wents wrong, please contact us at support@bossjob.com',
          'newPasswordNotSame_error':
              'The passwords you entered do not match. Please re-enter your password',
          'firstNameEmpty_error': 'Please enter First Name',
          'lastNameEmpty_error': 'Please enter Last Name',
          'expYrsEmpty_error': 'Please select Years of Experience',
          'choose_a_country': 'Choose a country',
          'nation_area': 'Country',
        },
      };
}

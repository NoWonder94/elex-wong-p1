import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/EditPasswordController.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EditPassword extends StatelessWidget {
  const EditPassword({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    EditPasswordController editPasswordController =
        Get.put(EditPasswordController());
    AppController appController = Get.put(AppController());
    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
        isClear: true,
      ),
      body: Stack(
        children: [
          Container(
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.only(top: 30.0, left: 30.0, right: 30.0),
                child: Column(
                  children: [
                    getInputWidget(
                      label: 'Current Password',
                      obscure: true,
                      onChange: (val) {
                        editPasswordController.setCurrentPwd(val);
                      },
                    ),
                    SizedBox(height: 15.0),
                    getInputWidget(
                      label: 'New Password',
                      obscure: true,
                      onChange: (val) {
                        editPasswordController.setNewPwd(val);
                      },
                    ),
                    SizedBox(height: 15.0),
                    getInputWidget(
                      label: 'Confirm Password',
                      obscure: true,
                      onChange: (val) {
                        editPasswordController.setconfirmPwd(val);
                      },
                    ),
                  ],
                ),
              ),
            ),
          ),
          /* save button */
          Align(
            alignment: Alignment.bottomCenter,
            child: Obx(
              () => FooterSubmitButton(
                label: 'Save',
                isActive: editPasswordController.isSubmit.value,
                onPressed: () {
                  editPasswordController
                      .submitPwdReset(appController.userInfo.value.data!.email);
                },
              ),
            ),
          )
        ],
      ),
    );
  }
}

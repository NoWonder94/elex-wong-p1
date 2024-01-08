import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/EditEmailController.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormInput.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormNumberInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EditEmail extends StatelessWidget {
  const EditEmail({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    EditEmailController editEmailController = Get.put(EditEmailController());
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
                padding: EdgeInsets.only(
                    top: 30.0, left: 30.0, right: 30.0, bottom: 95.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    getInputWidget(
                      label: 'Email',
                      hintText: 'New Email',
                      onChange: (val) {
                        editEmailController.setNewEmail(val);
                      },
                    ),
                    SizedBox(height: 10.0),
                    InkWell(
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            vertical: 5.0, horizontal: 10.0),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.grey,
                          ),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: Text('Resend'),
                      ),
                      onTap: () {
                        editEmailController.checkEmailValid();
                      },
                    ),
                    SizedBox(height: 20.0),
                    getNumberInputWidget(
                      label: 'Verification Code',
                      onChange: (val) {
                        editEmailController.setVarificationCode(val);
                      },
                    ),
                    SizedBox(height: 50.0),
                    Obx(
                      () => editEmailController.isHintShow.value
                          ? Text('A 6 digit verification code has been sent to ' +
                              appController.userInfo.value.data!.email
                                  .toString() +
                              ' . \nPlease enter the code to confirm your action to change email.')
                          : Container(),
                    ),
                  ],
                ),
              ),
            ),
          ),
          /* save button */
          Obx(
            () => Align(
              alignment: Alignment.bottomCenter,
              child: FooterSubmitButton(
                label: 'Save',
                onPressed: () {
                  editEmailController.submitResetEmail(
                      appController.userInfo.value.data!.email);
                },
                isActive: editEmailController.isSubmit.value,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

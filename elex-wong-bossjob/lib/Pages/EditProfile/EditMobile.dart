import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/AppController.dart';
import 'package:bossjobapp/Controllers/EditMobileController.dart';
import 'package:bossjobapp/Models/ConfigData.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/FormNumberInput.dart';
import 'package:bossjobapp/Widgets/app_country_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

class EditMobile extends StatefulWidget {
  const EditMobile({Key? key}) : super(key: key);

  @override
  _EditMobileState createState() => _EditMobileState();
}

class _EditMobileState extends State<EditMobile> {
  EditMobileController editMobileController = Get.put(EditMobileController());
  AppController appController = Get.put(AppController());
  String countryLabel = 'choose_a_country'.tr;

  @override
  Widget build(BuildContext context) {
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
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    renderNationArea(context),
                    SizedBox(height: 10.0),
                    getNumberInputWidget(
                      label: 'Mobile',
                      onChange: (val) {
                        editMobileController.setNewMobile(val);
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
                        child: Text('Request OTP'),
                      ),
                      onTap: () {
                        editMobileController.getOtpRequest();
                      },
                    ),
                    getNumberInputWidget(
                      label: 'Verification Code',
                      onChange: (val) {
                        editMobileController.setVarificationCode(val);
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
                isActive: editMobileController.isSubmit.value,
                onPressed: () {
                  editMobileController.submitResetPhone(
                      appController.userInfo.value.data!.email);
                },
              ),
            ),
          )
        ],
      ),
    );
  }

  InkWell renderNationArea(BuildContext context) {
    return InkWell(
        onTap: () {
          showModalBottomSheet(
              context: context,
              builder: (context) {
                return AppCountryList(
                  onSelected: (GameBetModelDataInputsSmsCountryLists country) {
                    setState(() {
                      editMobileController
                          .setNewCountryKey(country.key.toString());
                      editMobileController
                          .setNewMobileCode(country.code.toString());
                      countryLabel = country.value.toString() +
                          ' ' +
                          country.code.toString();
                    });
                  },
                );
              });
        },
        child: Container(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'nation_area'.tr,
                style: inputLabel,
              ),
              SizedBox(
                height: 5,
              ),
              Container(
                  padding: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.grey),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        countryLabel,
                        style: TextStyle(
                          color: countryLabel == 'choose_a_country'.tr
                              ? inactiveInputBorder
                              : Colors.black,
                        ),
                      ),
                      Icon(
                        Icons.chevron_right,
                        color: inactiveInputBorder,
                      ),
                    ],
                  )),
            ],
          ),
        ));
  }
}

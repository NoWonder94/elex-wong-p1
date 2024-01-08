import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Controllers/SkillSoftwareController.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/ManageResume/MultilineInput.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

class SkillsSoftware extends StatelessWidget {
  const SkillsSoftware({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SkillSoftwareController skillSoftwareController =
        Get.put(SkillSoftwareController());

    return Scaffold(
      appBar: HeaderBar(
        isShowOnBack: true,
        isClear: true,
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.only(
                  top: 25.0, left: 20.0, right: 20.0, bottom: 130.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  /* Job skills */
                  Obx(
                    () => skillSoftwareController.userJobSkillList.length < 1
                        ? Container()
                        : Wrap(
                            children: skillSoftwareController.userJobSkillList
                                .map((skill) => Container(
                                      margin:
                                          EdgeInsets.only(right: 5, bottom: 5),
                                      padding: EdgeInsets.all(5.0),
                                      decoration: BoxDecoration(
                                        border: Border.all(color: black),
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: Wrap(
                                        children: [
                                          Text(
                                            skill.toString(),
                                            style: TextStyle(
                                                color: black, fontSize: 12),
                                          ),
                                          InkWell(
                                            onTap: () {
                                              skillSoftwareController
                                                  .removeSelectedSkill(skill);
                                            },
                                            child: Icon(
                                              Icons.close,
                                              size: 15,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ))
                                .toList(),
                          ),
                  ),
                  SizedBox(height: 15.0),
                  /* input filter */
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      getMultilineInput(
                          label: 'Add skills and software',
                          maxLines: 2,
                          hintText: 'Search',
                          onchange: (val) {
                            skillSoftwareController.getInputSkillSuggest(val);
                            skillSoftwareController.setInputSkill(val);
                          }),
                      SizedBox(height: 10.0),
                      /* filter results */
                      Obx(() {
                        if (skillSoftwareController.inputSkill.value == '') {
                          return Container();
                        }

                        if (skillSoftwareController.skillFilterLoading.value) {
                          return SpinKitWave(
                            color: primaryColor,
                            size: 15,
                          );
                        }

                        if (skillSoftwareController.filterJobSkillList.length >
                            0) {
                          return Wrap(
                            children: skillSoftwareController.filterJobSkillList
                                .map(
                                  (skill) => Container(
                                    margin:
                                        EdgeInsets.only(right: 5, bottom: 5),
                                    padding: EdgeInsets.all(5.0),
                                    decoration: BoxDecoration(
                                      border: Border.all(color: black),
                                      borderRadius: BorderRadius.circular(5),
                                    ),
                                    child: InkWell(
                                      onTap: () {
                                        skillSoftwareController
                                            .addSeletedSkill(skill);
                                      },
                                      child: Text(
                                        skill.toString(),
                                      ),
                                    ),
                                  ),
                                )
                                .toList(),
                          );
                        }

                        return Container();
                      }),
                    ],
                  ),
                ],
              ),
            ),
          ),
          /* save button */
          Align(
            alignment: Alignment.bottomCenter,
            child: FooterSubmitButton(
              label: 'Update',
              onPressed: () {
                skillSoftwareController.submitSkills();
              },
            ),
          )
        ],
      ),
    );
  }
}

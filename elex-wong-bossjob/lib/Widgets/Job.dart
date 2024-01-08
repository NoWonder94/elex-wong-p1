import 'package:flutter/material.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';

class Job extends StatelessWidget {
  final String title;
  final String price;
  final List jobSkills;
  final String companyName;
  final String jobs;
  final String year;
  final String graduate;
  final String time;
  final String logo;
  final Function()? onPressed;

  const Job({
    Key? key,
    this.title = '',
    this.price = '',
    this.jobSkills = const [],
    this.companyName = '',
    this.jobs = '',
    this.year = '',
    this.graduate = '',
    this.time = '',
    this.logo = '',
    this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          InkWell(
            onTap: onPressed,
            child: Container(
              color: Colors.white,
              padding: EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 30,
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        flex: 10,
                        child: Text(
                          title,
                          style: styleJobListTitleText,
                        ),
                      ),
                      Flexible(fit: FlexFit.tight, child: SizedBox()),
                      Text(
                        price,
                        style: styleJobListPriceText,
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 7,
                  ),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Wrap(
                      children: [
                        for (var i = 0; i < jobSkills.length; i++)
                          Container(
                            margin: EdgeInsets.only(
                              right: 6,
                              bottom: 5,
                            ),
                            padding: EdgeInsets.all(3.0),
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: jobListCategoryBorder,
                              ),
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: Text(
                              jobSkills[i],
                              style: styleJobListCategoryText,
                            ),
                          ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Row(
                    children: [
                      logo.isNotEmpty
                          ? Flexible(
                              child: Image.network(logo,
                                  height: 50, fit: BoxFit.fill),
                            )
                          : Container(),
                      logo.isNotEmpty
                          ? SizedBox(
                              width: 15,
                            )
                          : Container(),
                      Flexible(
                        child: Text(
                          companyName,
                          style: styleJobListCompanyText,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 15,
                  ),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Wrap(
                      spacing: 10,
                      children: [
                        IconText(
                          logoPath: imgLocation,
                          text: jobs,
                        ),
                        IconText(
                          logoPath: imgJobs,
                          text: year,
                        ),
                        IconText(
                          logoPath: imgGraduate,
                          text: graduate,
                        ),
                        IconText(
                          logoPath: imgTime,
                          text: time,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(
            height: 15,
          ),
        ],
      ),
    );
  }
}

class IconText extends StatelessWidget {
  const IconText({Key? key, this.logoPath, this.text}) : super(key: key);
  final String? logoPath;
  final String? text;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 5.0),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Image.asset(
            logoPath!,
            scale: 1.6,
          ),
          SizedBox(
            width: 5,
          ),
          Text(
            text!,
            style: styleJobListIconText,
          ),
        ],
      ),
    );
  }
}

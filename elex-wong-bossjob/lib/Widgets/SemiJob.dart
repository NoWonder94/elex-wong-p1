import 'package:flutter/material.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Utils/Common.dart';

class SemiJob extends StatelessWidget {
  final Function()? onPressed;
  final String? jobTitle;
  final String? price;
  final String? expLvl;
  final String? degree;
  final String? jobLocation;
  final String? jobType;

  const SemiJob({
    Key? key,
    this.onPressed,
    this.jobTitle,
    this.price,
    this.expLvl,
    this.degree,
    this.jobLocation,
    this.jobType,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: w(context, 70),
      child: Column(
        children: [
          InkWell(
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.grey,
                ),
                borderRadius: BorderRadius.circular(10),
              ),
              padding: EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 15,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    jobTitle!,
                    style: styleJobListTitleText,
                  ),
                  SizedBox(
                    height: 7,
                  ),
                  Row(
                    children: [
                      Row(
                        children: [
                          Image.asset(
                            imgLocation,
                            scale: 1.6,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            jobLocation!,
                            style: styleJobListIconText,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Image.asset(
                            imgJobs,
                            scale: 1.6,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            expLvl!,
                            style: styleJobListIconText,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Row(
                    children: [
                      Row(
                        children: [
                          Image.asset(
                            imgGraduate,
                            scale: 1.6,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            degree!,
                            style: styleJobListIconText,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Image.asset(
                            imgTime,
                            scale: 1.6,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            jobType!,
                            style: styleJobListIconText,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Text(
                    price!,
                    style: styleJobListPriceText,
                  ),
                ],
              ),
            ),
            onTap: onPressed,
          ),
        ],
      ),
    );
  }
}

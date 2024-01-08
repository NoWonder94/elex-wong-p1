import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Pages/ProfilePage.dart';
import 'package:flutter/material.dart';

class ProfileNavList extends StatelessWidget {
  const ProfileNavList({
    Key? key,
    required this.proList,
  }) : super(key: key);

  final List<ProfileList> proList;

  @override
  Widget build(BuildContext context) {
    return Column(
        children: proList
            .map(
              (list) => Column(
                children: [
                  InkWell(
                    onTap: () {
                      list.onPressed();
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            list.icon,
                            SizedBox(width: 10.0),
                            Text(
                              list.title,
                              style: TextStyle(fontSize: 13.0),
                            ),
                          ],
                        ),
                        list.isEndIcon
                            ? Icon(
                                Icons.arrow_forward_ios_rounded,
                                size: 13.0,
                                color: lightGrey,
                              )
                            : Container(),
                      ],
                    ),
                  ),
                  Divider(thickness: 1.5),
                ],
              ),
            )
            .toList());
  }
}

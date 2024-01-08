import 'package:bossjobapp/Constants/color.dart';
import 'package:flutter/material.dart';

class BorderText extends StatelessWidget {
  final String label;
  final Color? textColor;

  const BorderText({
    Key? key,
    this.label = '',
    this.textColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(3.0),
        padding: const EdgeInsets.all(3.0),
        decoration: BoxDecoration(border: Border.all(color: borderGrey)),
        child: Text(
          label,
          style: TextStyle(
              color: borderWidgetText,
              fontSize: 11,
              fontWeight: FontWeight.w500),
        ));
  }
}

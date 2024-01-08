import 'package:bossjobapp/Constants/color.dart';
import 'package:flutter/material.dart';

class CheckBox extends StatelessWidget {
  const CheckBox({Key? key, this.onChange, this.isActive = false})
      : super(key: key);

  final Function()? onChange;
  final bool isActive;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onChange,
      child: Container(
        width: 20,
        height: 20,
        decoration: BoxDecoration(
            border: Border.all(color: searchBorder),
            color: isActive ? primaryColor : Colors.white,
            borderRadius: BorderRadius.circular(5)),
      ),
    );
  }
}

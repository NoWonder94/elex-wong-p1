import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Widgets/Button.dart';
import 'package:flutter/material.dart';

class FooterSubmitButton extends StatelessWidget {
  final String label;
  final Function()? onPressed;
  final bool isActive;

  const FooterSubmitButton({
    Key? key,
    this.label = '',
    this.onPressed,
    this.isActive = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 90.0,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(width: 1.0, color: divider),
        ),
      ),
      padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 20.0),
      child: Button(
        backgroundColor: isActive ? primaryColor : lightGrey,
        label: label,
        textColor: Colors.white,
        onPressed: onPressed,
      ),
    );
  }
}

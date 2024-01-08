import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Utils/Common.dart';
import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String label;
  final Function()? onPressed;
  final Color? textColor;
  final Color? backgroundColor;
  final Widget? widget;

  const Button(
      {Key? key,
      this.label = '',
      this.onPressed,
      this.textColor,
      this.backgroundColor,
      this.widget})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    Widget comp = Container();
    if (widget == null) {
      comp = Text(
        label,
        style: TextStyle(color: textColor, fontSize: 15),
      );
    }
    return InkWell(
      onTap: onPressed,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 15, horizontal: 10),
        alignment: Alignment.center,
        width: w(context, 1),
        decoration: BoxDecoration(
          color: backgroundColor ?? primaryColor,
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.4),
              blurRadius: 6,
              spreadRadius: 0.1,
              offset: Offset(0, 5),
            ),
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              blurRadius: 1,
              offset: Offset(0, -1),
            ),
          ],
          borderRadius: BorderRadius.circular(10),
        ),
        child: widget == null ? comp : widget,
      ),
    );
  }
}

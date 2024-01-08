import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter/material.dart';

Widget getMultilineInput({label, hintText, maxLines, onchange, initialValue}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        label,
        style: inputLabel,
      ),
      SizedBox(height: 5),
      TextFormField(
        maxLines: maxLines,
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          hintText: hintText,
          contentPadding:
              EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
          hintStyle: TextStyle(
            fontSize: 15.0,
            color: inputInsideLabel,
          ),
        ),
        onChanged: onchange,
        initialValue: initialValue,
      )
    ],
  );
}

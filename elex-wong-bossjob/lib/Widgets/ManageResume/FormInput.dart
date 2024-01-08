import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter/material.dart';

Widget getInputWidget(
    {label, hintText, onChange, initialValue = '', obscure = false}) {
  return Container(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: inputLabel,
        ),
        SizedBox(
          height: 5,
        ),
        Container(
          color: Colors.white,
          child: TextFormField(
            decoration: new InputDecoration(
              hintText: hintText,
              hintStyle: TextStyle(color: inactiveInputBorder),
              isDense: true,
              fillColor: Colors.white,
              focusColor: Colors.white,
              border: OutlineInputBorder(
                borderSide: BorderSide(color: inactiveInputBorder),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            obscureText: obscure,
            initialValue: initialValue,
            onChanged: onChange,
            style: inputText,
          ),
        ),
      ],
    ),
  );
}

import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

Widget getNumberInputWidget(
    {label,
    hintText,
    onChange,
    initialValue = '',
    obscure = false,
    maxLength}) {
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
            maxLength: maxLength,
            inputFormatters: [
              FilteringTextInputFormatter.allow(RegExp(r'[0-9]')),
            ],
            keyboardType: TextInputType.number,
            onChanged: onChange,
            style: inputText,
          ),
        ),
      ],
    ),
  );
}

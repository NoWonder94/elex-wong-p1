import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';

Widget getDateDropDownSearch(List<String> month, List<String> year,
    {label, onChangedMonth, onChangedYear}) {
  return Container(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: inputLabel,
        ),
        SizedBox(height: 5.0),
        Row(
          children: [
            Expanded(
              flex: 1,
              child: DropdownSearch(
                  items: month, hint: 'January', onChanged: onChangedMonth),
            ),
            SizedBox(width: 20.0),
            Expanded(
              flex: 1,
              child: DropdownSearch(
                  items: year, hint: '2021', onChanged: onChangedYear),
            ),
          ],
        )
      ],
    ),
  );
}

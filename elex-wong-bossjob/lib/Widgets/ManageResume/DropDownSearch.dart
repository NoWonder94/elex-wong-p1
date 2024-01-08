import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';

Widget getDropDownSearch(List<String> menuList,
    {label, hintText, onChange, selectedItem = ''}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        label,
        style: inputLabel,
      ),
      SizedBox(height: 5),
      DropdownSearch(
        searchBoxDecoration: new InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30.0),
          ),
        ),
        hint: hintText,
        // mode: Mode.MENU,
        items: menuList,
        onChanged: onChange ?? print,
        selectedItem: selectedItem,
      ),
    ],
  );
}

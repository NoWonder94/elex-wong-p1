import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class AInput extends StatefulWidget {
  const AInput({
    Key? key,
    this.label = '',
    this.onChange,
    this.initialValue = '',
    this.hint = '',
    this.disabled = false,
    this.formatter,
    this.maxLines = 1,
  }) : super(key: key);
  final String label;
  final String initialValue;
  final String hint;
  final Function? onChange;
  final bool disabled;
  final MaskTextInputFormatter? formatter;
  final int maxLines;
  @override
  _AInputState createState() => _AInputState();
}

class _AInputState extends State<AInput> {
  final _focusNode = FocusNode();
  TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (_controller.text.isEmpty) {
      _controller.text = widget.initialValue;
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        widget.label.isNotEmpty
            ? Column(
                children: [
                  Text(widget.label, style: inputLabel),
                  // SizedBox(
                  //   height: h(context, 0.01),
                  // ),
                ],
              )
            : Container(),
        new TextFormField(
          maxLines: widget.maxLines,
          controller: _controller,
          inputFormatters: widget.formatter != null ? [widget.formatter!] : [],
          enabled: !widget.disabled,
          focusNode: _focusNode,
          decoration: new InputDecoration(
              hintText: widget.hint,
              hintStyle: TextStyle(color: inactiveInputBorder),
              isDense: true,
              border: InputBorder.none),
          onChanged: (v) {
            widget.onChange!(v);
          },
          style: inputText,
        ),
        Divider(
          thickness: 1,
          height: 1,
          color: _focusNode.hasFocus ? activeInputBorder : inactiveInputBorder,
        ),
      ],
    );
  }
}

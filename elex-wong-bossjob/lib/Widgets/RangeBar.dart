import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/images.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class RangeBar extends StatefulWidget {
  final String labelLeft;
  final String labelRight;
  final Function? onChanged;
  final double min;
  final double max;
  final double? defaultMin;
  final double? defaultMax;

  const RangeBar({
    Key? key,
    this.labelLeft = '',
    this.labelRight = '',
    this.onChanged,
    this.min = 10000,
    this.max = 1000000,
    this.defaultMin,
    this.defaultMax,
  }) : super(key: key);

  @override
  _RangeBarState createState() => _RangeBarState();
}

class _RangeBarState extends State<RangeBar> {
  late RangeValues values;
  TextEditingController startCtrl = new TextEditingController();
  TextEditingController endCtrl = new TextEditingController();
  String? error;

  @override
  void initState() {
    if (widget.defaultMax != null && widget.defaultMin != null) {
      values = RangeValues(
          widget.defaultMin! == 0 ? widget.min : widget.defaultMin!,
          widget.defaultMax!);
      startCtrl.value =
          TextEditingValue(text: widget.defaultMin!.toInt().toString());
      endCtrl.value =
          TextEditingValue(text: widget.defaultMax!.toInt().toString());
    } else {
      values = RangeValues(widget.min, widget.max);
      startCtrl.value = TextEditingValue(text: widget.min.toInt().toString());
      endCtrl.value = TextEditingValue(text: widget.max.toInt().toString());
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 75.0,
            child: Stack(
              children: [
                Align(
                  alignment: Alignment.topCenter,
                  child: SizedBox(
                    width: 270.0,
                    child: Image.asset(rangeBar),
                  ),
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    height: 50.0,
                    child: SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        trackHeight: 2.0,
                      ),
                      child: RangeSlider(
                        activeColor: Color.fromARGB(255, 226, 226, 226),
                        inactiveColor: Color.fromARGB(255, 226, 226, 226),
                        values: values,
                        min: widget.min,
                        max: widget.max,
                        divisions: 5000,
                        labels: RangeLabels(
                          values.start.round().toString(),
                          values.end.round().toString(),
                        ),
                        onChanged: (RangeValues val) {
                          if (widget.onChanged != null) {
                            widget.onChanged!(val);
                          }

                          setState(() {
                            error = null;
                            values = val;
                            startCtrl.value = TextEditingValue(
                                text: val.start.toInt().toString());
                            endCtrl.value = TextEditingValue(
                                text: val.end.toInt().toString());
                          });
                        },
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 10.0),
          /* range bar input form */
          Row(
            children: [
              getDisplayRangeWidget(
                values.start,
                errorText: error,
                controller: startCtrl,
                initialValue: values.start.toInt().toString(),
                label: widget.labelLeft,
                onChange: (String v) {
                  var newStart = double.parse(v);
                  if (newStart < widget.min || newStart >= widget.max) {
                    setState(() {
                      error =
                          "MIN: ${widget.min.toInt()}, MAX: ${widget.max.toInt()}";
                    });
                    return;
                  }
                  var newVal = RangeValues(newStart, values.end);
                  setState(() {
                    error = null;
                    values = newVal;
                  });
                  if (widget.onChanged != null) {
                    widget.onChanged!(values);
                  }
                },
              ),
              SizedBox(width: 20.0),
              getDisplayRangeWidget(
                values.end,
                errorText: error,
                controller: endCtrl,
                initialValue: values.end.toInt().toString(),
                label: widget.labelRight,
                onChange: (String v) {
                  var newEnd = double.parse(v);
                  if (newEnd <= widget.min || newEnd >= widget.max) {
                    setState(() {
                      error =
                          "MIN: ${widget.min.toInt}, MAX: ${widget.max.toInt()}";
                    });
                    return;
                  }
                  var newVal = RangeValues(values.start, newEnd);
                  setState(
                    () {
                      error = null;
                      values = newVal;
                    },
                  );
                  if (widget.onChanged != null) {
                    widget.onChanged!(values);
                  }
                },
              ),
            ],
          ),
          if (error != null)
            Text(
              error!.toString(),
              style: TextStyle(color: Colors.red, fontSize: 10),
            ),
        ],
      ),
    );
  }

  Widget getDisplayRangeWidget(
    plotValue, {
    initialValue = "",
    label,
    onChange,
    controller,
    errorText,
  }) {
    var numberFormatter = FilteringTextInputFormatter.digitsOnly;
    return Expanded(
      flex: 1,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: inputLabel,
          ),
          SizedBox(height: 5.0),
          // default text view
          // Container(
          //   width: double.infinity,
          //   height: 40.0,
          //   padding: EdgeInsets.all(10.0),
          //   decoration: BoxDecoration(
          //     border: Border.all(
          //       color: inactiveInputBorder,
          //     ),
          //     borderRadius: BorderRadius.circular(5.0),
          //   ),
          //   child: Text(
          //     'SGD ' + plotValue.round().toString(),
          //     style: TextStyle(
          //       color: Colors.blue,
          //       fontSize: 15,
          //     ),
          //   ),
          // ),
          // Input Range
          Container(
            alignment: Alignment.centerLeft,
            width: double.infinity,
            height: 40.0,
            decoration: BoxDecoration(
              border: Border.all(
                color: inactiveInputBorder,
              ),
              borderRadius: BorderRadius.circular(5.0),
            ),
            child: TextFormField(
              // initialValue: initialValue,
              controller: controller,
              keyboardType: TextInputType.number,
              inputFormatters: [numberFormatter],
              validator: (v) {
                return v;
              },
              decoration: new InputDecoration(
                prefix: Text(
                  '₱ ',
                  style: TextStyle(
                    color: Colors.blue,
                    fontSize: 15,
                  ),
                ),
                // errorText: error,
                hintStyle: TextStyle(color: inactiveInputBorder),
                isDense: true,
                fillColor: Colors.white,
                focusColor: Colors.white,
                border: OutlineInputBorder(
                  borderSide: BorderSide.none,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onChanged: onChange,
              style: TextStyle(
                color: Colors.blue,
                fontSize: 15,
              ),
            ),
          ),
          SizedBox(
            height: 5,
          ),
          // Text(
          //   errorText,
          //   style: TextStyle(color: Colors.red, fontSize: 10),
          // ),
        ],
      ),
    );
  }
}

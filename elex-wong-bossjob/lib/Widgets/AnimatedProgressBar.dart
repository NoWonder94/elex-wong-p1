import 'package:flutter/material.dart';
import 'package:bossjobapp/Constants/color.dart';

class AnimatedProgressBar extends StatelessWidget {
  const AnimatedProgressBar(
    List<String> stepsText,
    int curStep,
    double height,
    double width,
    double dotRadius,
    Color activeColor,
    Color inactiveColor,
    TextStyle headerStyle,
    TextStyle stepsStyle, {
    Key? key,
    required this.decoration,
    required this.padding,
    this.lineHeight = 2.0,
  })  : _stepsText = stepsText,
        _curStep = curStep,
        _height = height,
        _width = width,
        _dotRadius = dotRadius,
        _activeColor = activeColor,
        _inactiveColor = inactiveColor,
        assert(curStep > 0 == true && curStep <= stepsText.length),
        assert(width > 0),
        assert(height >= 2 * dotRadius),
        assert(width >= dotRadius * 2 * stepsText.length),
        super(key: key);

//height of the container
  final double _height;
//width of the container
  final double _width;
//container decoration
  final BoxDecoration decoration;
//list of texts to be shown for each step
  final List<String> _stepsText;
//cur step identifier
  final int _curStep;
//active color
  final Color _activeColor;
//in-active color
  final Color _inactiveColor;
//dot radius
  final double _dotRadius;
//container padding
  final EdgeInsets padding;
//line height
  final double lineHeight;

  List<Widget> _buildDots() {
    var wids = <Widget>[];
    _stepsText.asMap().forEach((i, text) {
      var circleColor =
          (i == 0 || _curStep >= i + 1) ? _activeColor : _inactiveColor;

      var lineColor = _inactiveColor;

      wids.add(CircleAvatar(
        radius: _dotRadius,
        backgroundColor: circleColor,
      ));

      //add a line separator
      //0-------0--------0
      if (i != _stepsText.length - 1) {
        wids.add(Expanded(
            child: Container(
          height: lineHeight,
          color: lineColor,
        )));
      }
    });

    return wids;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: background,
      body: Container(
          padding: padding,
          height: this._height,
          width: this._width,
          decoration: this.decoration,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                child: Text(_stepsText[(_curStep - 1)].toString(),
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              ),
              SizedBox(height: 15),
              Row(
                children: _buildDots(),
              ),
            ],
          )),
    );
  }
}

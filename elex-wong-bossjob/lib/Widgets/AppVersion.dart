import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';

class AppVersion extends StatefulWidget {
  AppVersion({Key? key}) : super(key: key);

  @override
  _AppVersionState createState() => _AppVersionState();
}

class _AppVersionState extends State<AppVersion> {
  String version = '';

  @override
  void initState() {
    _initPackageInfo();
    super.initState();
  }

  Future<void> _initPackageInfo() async {
    final info = await PackageInfo.fromPlatform();
    setState(() {
      version = info.version + '.' + info.buildNumber;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Text(
            'Ver: ',
            style: TextStyle(color: Colors.grey),
          ),
          Text(
            version,
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }
}

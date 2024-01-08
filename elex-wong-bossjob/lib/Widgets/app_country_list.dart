import 'package:animate_do/animate_do.dart';
import 'package:bossjobapp/Constants/constant.dart';
import 'package:bossjobapp/Models/ConfigData.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppCountryList extends StatefulWidget {
  const AppCountryList({Key? key, this.onSelected}) : super(key: key);

  final Function? onSelected;

  @override
  State<AppCountryList> createState() => _AppCountryListState();
}

class _AppCountryListState extends State<AppCountryList> {
  GameBetModelDataInputsSmsCountryLists selectedCountry =
      GameBetModelDataInputsSmsCountryLists();
  TextEditingController searchCtl = TextEditingController();
  FocusNode focusNode = FocusNode();
  List<GameBetModelDataInputsSmsCountryLists?>? countryList = [];
  List<GameBetModelDataInputsSmsCountryLists?>? filteredList = [];

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 100), () {
      getList();
    });
  }

  Future<List> getList() async {
    ConfigService configService = Get.find();
    if (configService.getConfig.data != null &&
        configService.getConfig.data!.inputs!.smsCountryLists != null) {
      setState(() {
        countryList = configService.getConfig.data!.inputs!.smsCountryLists;
        filteredList = configService.getConfig.data!.inputs!.smsCountryLists;
      });
      return configService.getConfig.data!.inputs!.smsCountryLists!;
    }
    return [];
  }

  void onFilter(String keyword) {
    var result = countryList!.where((element) {
      String country = element!.value!;
      String code = element.code!;
      bool isNameLike = country.toLowerCase().contains(keyword.toLowerCase());
      bool isCodeLike = code.toLowerCase().contains(keyword.toLowerCase());
      return isNameLike || isCodeLike;
    });
    setState(() {
      filteredList = result.toList();
    });
  }

  void onClearFilter() {
    searchCtl.clear();
    focusNode.unfocus();
    setState(() {
      filteredList = countryList;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: InkWell(
        onTap: () {
          setState(() {
            focusNode.unfocus();
          });
        },
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(
                top: defaultPadding,
                left: defaultPadding / 2,
                right: defaultPadding / 2,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'choose_a_country'.tr,
                    style: Theme.of(context).textTheme.subtitle1,
                  ),
                  InkWell(
                    onTap: () {
                      Get.back();
                    },
                    child: Text(
                      'Done',
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: defaultPadding / 2),
              child: Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: searchCtl,
                      focusNode: focusNode,
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        filled: true,
                        icon: Icon(Icons.search, color: Colors.black),
                        contentPadding: EdgeInsets.zero,
                      ),
                      onChanged: onFilter,
                    ),
                  ),
                  if (searchCtl.text.isNotEmpty)
                    SlideInRight(
                      child: IconButton(
                          onPressed: onClearFilter,
                          icon: const Icon(
                            Icons.clear,
                            color: Colors.black,
                          )),
                    ),
                ],
              ),
            ),
            SizedBox(
              height: defaultPadding,
            ),
            Expanded(
                child: ListView.separated(
              itemBuilder: (context, index) {
                var item = filteredList![index];
                return InkWell(
                  onTap: () {
                    setState(() {
                      selectedCountry = item!;
                      focusNode.unfocus();
                    });
                    if (widget.onSelected != null) {
                      widget.onSelected!(selectedCountry);
                      Get.back();
                    }
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                        item!.value.toString() + ' ' + item.code.toString(),
                        style: TextStyle(
                            color: item.code.toString() == selectedCountry.code
                                ? Theme.of(context).primaryColorLight
                                : Colors.black)),
                  ),
                );
              },
              separatorBuilder: (context, index) {
                return const Divider(
                  height: 20,
                  color: Colors.black,
                );
              },
              itemCount: filteredList!.length,
            ))
          ],
        ),
      ),
    );
  }
}

import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:bossjobapp/Services/ConfigService.dart';
import 'package:bossjobapp/Widgets/FooterSubmitButton.dart';
import 'package:bossjobapp/Widgets/HeaderBar.dart';
import 'package:bossjobapp/Widgets/RangeBar.dart';
import 'package:bossjobapp/Widgets/Search.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SearchJob extends StatefulWidget {
  const SearchJob({Key? key}) : super(key: key);

  @override
  _SearchJobState createState() => _SearchJobState();
}

class _SearchJobState extends State<SearchJob> {
  @override
  Widget build(BuildContext context) {
    SearchJobController searchJobController = Get.put(SearchJobController());
    ConfigService configService = Get.find();

    Widget getListWidget(title, list, setKey) {
      return Container(
        child: Column(
          children: [
            Theme(
              data:
                  Theme.of(context).copyWith(dividerColor: Colors.transparent),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 10.0),
                child: ListTileTheme(
                  dense: true,
                  child: ExpansionTile(
                    title: Text(
                      title,
                      style: styleJobListPriceText,
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 10.0),
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              for (var i = 0; i < list.length; i++)
                                Container(
                                  child: InkWell(
                                    onTap: () {
                                      searchJobController.setSelectedKey(
                                          list![i]!.value.toString(), setKey);
                                    },
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 20.0),
                                      child: Column(
                                        children: [
                                          SizedBox(
                                            height: 15,
                                          ),
                                          Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Obx(
                                                () => Container(
                                                  decoration: BoxDecoration(
                                                    border: Border.all(
                                                        width: 2.0,
                                                        color: searchBorder),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            6),
                                                    color: setKey.contains(
                                                            list![i]!
                                                                .value
                                                                .toString())
                                                        ? primaryColor
                                                        : Colors.white,
                                                  ),
                                                  width: 20,
                                                  height: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                list![i]!.value,
                                                style: styleJobListPriceText,
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                )
                            ]),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Divider(
              color: messagesDivider,
              indent: 20,
              endIndent: 20,
            ),
          ],
        ),
      );
    }

    Widget getSpecializationWidget(title, list, setKey) {
      return Container(
        child: Column(
          children: [
            Theme(
              data:
                  Theme.of(context).copyWith(dividerColor: Colors.transparent),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 10.0),
                child: ListTileTheme(
                  dense: true,
                  child: ExpansionTile(
                    title: Text(
                      title,
                      style: styleJobListPriceText,
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 10.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: list
                              .map<Widget>((e) => InkWell(
                                    onTap: () {
                                      searchJobController.setSelectedKey(
                                          e.key, setKey);
                                    },
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 20.0),
                                      child: Column(
                                        children: [
                                          SizedBox(
                                            height: 15,
                                          ),
                                          Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Obx(
                                                () => Container(
                                                  decoration: BoxDecoration(
                                                    border: Border.all(
                                                        width: 2.0,
                                                        color: searchBorder),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            6),
                                                    color:
                                                        setKey.contains(e.key)
                                                            ? primaryColor
                                                            : Colors.white,
                                                  ),
                                                  width: 20,
                                                  height: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                e.value,
                                                style: styleJobListPriceText,
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ))
                              .toList(),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Divider(
              color: messagesDivider,
              indent: 20,
              endIndent: 20,
            ),
          ],
        ),
      );
    }

    Widget getLocationWidget(setKey) {
      return Container(
        child: Column(
          children: [
            Theme(
                data: Theme.of(context)
                    .copyWith(dividerColor: Colors.transparent),
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 10.0),
                  child: ListTileTheme(
                    dense: true,
                    child: ExpansionTile(
                      title: Text(
                        'Location',
                        style: styleJobListPriceText,
                      ),
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(bottom: 10.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: configService
                                .getConfig.data!.inputs!.locationLists!
                                .map((item) => Theme(
                                    data: Theme.of(context).copyWith(
                                        dividerColor: Colors.transparent),
                                    child: Container(
                                      padding: EdgeInsets.symmetric(
                                          horizontal: 10.0),
                                      child: ListTileTheme(
                                        dense: true,
                                        child: ExpansionTile(
                                          title: Text(
                                            item!.displayName.toString(),
                                            style: styleJobListPriceText,
                                          ),
                                          leading: InkWell(
                                            onTap: () {
                                              searchJobController
                                                  .setLocationKey(
                                                      item.locations!
                                                          .map((e) => e!.value)
                                                          .toList()
                                                          .join(', '),
                                                      setKey,
                                                      item.displayName);
                                            },
                                            child: Obx(
                                              () => Container(
                                                decoration: BoxDecoration(
                                                  border: Border.all(
                                                      width: 2.0,
                                                      color: searchBorder),
                                                  borderRadius:
                                                      BorderRadius.circular(6),
                                                  color: searchJobController
                                                          .selectedRegion
                                                          .contains(
                                                              item.displayName)
                                                      ? primaryColor
                                                      : Colors.white,
                                                ),
                                                width: 20,
                                                height: 20,
                                              ),
                                            ),
                                          ),
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  left: 20.0, bottom: 10.0),
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: item.locations!
                                                    .map((e) => InkWell(
                                                          onTap: () {
                                                            searchJobController
                                                                .setLocationKey(
                                                                    e!.value,
                                                                    setKey,
                                                                    e.region);
                                                          },
                                                          child: Padding(
                                                            padding:
                                                                const EdgeInsets
                                                                        .symmetric(
                                                                    horizontal:
                                                                        10.0),
                                                            child: Column(
                                                              children: [
                                                                SizedBox(
                                                                  height: 15,
                                                                ),
                                                                Row(
                                                                  crossAxisAlignment:
                                                                      CrossAxisAlignment
                                                                          .start,
                                                                  children: [
                                                                    Obx(
                                                                      () =>
                                                                          Container(
                                                                        decoration:
                                                                            BoxDecoration(
                                                                          border: Border.all(
                                                                              width: 2.0,
                                                                              color: searchBorder),
                                                                          borderRadius:
                                                                              BorderRadius.circular(6),
                                                                          color: setKey.contains(e!.value)
                                                                              ? primaryColor
                                                                              : Colors.white,
                                                                        ),
                                                                        width:
                                                                            20,
                                                                        height:
                                                                            20,
                                                                      ),
                                                                    ),
                                                                    SizedBox(
                                                                      width: 20,
                                                                    ),
                                                                    Text(
                                                                      e!.value
                                                                          .toString(),
                                                                      style:
                                                                          styleJobListPriceText,
                                                                    ),
                                                                  ],
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ))
                                                    .toList(),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    )))
                                .toList(),
                          ),
                        ),
                      ],
                    ),
                  ),
                )),
            Divider(
              color: messagesDivider,
              indent: 20,
              endIndent: 20,
            ),
          ],
        ),
      );
    }

    Widget getSalaryWidget() {
      return Column(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 25.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                Text(
                  'Salary',
                  style: styleJobListPriceText,
                ),
                SizedBox(
                  height: 10,
                ),
                RangeBar(
                  labelLeft: 'Minimum',
                  labelRight: 'Maximum',
                  onChanged: (value) {
                    searchJobController.updateSalaryRange(value);
                  },
                ),
              ],
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Divider(
            color: messagesDivider,
            indent: 20,
            endIndent: 20,
          ),
        ],
      );
    }

    return Scaffold(
      appBar: HeaderBar(
        isShowClear: true,
        isClear: true,
      ),
      body: Container(
        child: Column(
          children: [
            Expanded(
                child: SingleChildScrollView(
              child: Container(
                child: Column(
                  children: [
                    Search(
                      goToSearch: false,
                    ),
                    SizedBox(height: 10),
                    getListWidget(
                        'Industry',
                        configService.getConfig.data!.inputs!.industryLists,
                        searchJobController.selectedIndustry),
                    getLocationWidget(searchJobController.selectedLocation),
                    getSalaryWidget(),
                    getListWidget(
                        'Job Type',
                        configService.getConfig.data!.inputs!.jobTypes,
                        searchJobController.selectedType),
                    getSpecializationWidget(
                        'Specialization',
                        configService.getConfig.data!.inputs!.jobCategoryLists,
                        searchJobController.selectedSpecialization),
                    getListWidget(
                        'Work Experience Requirement',
                        configService.getConfig.data!.inputs!.xpLvls,
                        searchJobController.selectedExperience),
                    getListWidget(
                        'Qualification Requirement',
                        configService.getConfig.data!.inputs!.degrees,
                        searchJobController.selectedDegree),
                    SizedBox(height: 10),
                  ],
                ),
              ),
            )),
            FooterSubmitButton(
              label: 'Search',
              onPressed: () {
                Get.toNamed('/searchResult');
                searchJobController.searchJob();
              },
            ),
          ],
        ),
      ),
    );
  }
}

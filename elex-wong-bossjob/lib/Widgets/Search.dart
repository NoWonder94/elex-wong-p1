import 'package:bossjobapp/Controllers/SearchJobController.dart';
import 'package:flutter/material.dart';
import 'package:bossjobapp/Constants/color.dart';
import 'package:bossjobapp/Constants/textStyle.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:get/get.dart';

class Search extends StatelessWidget {
  final bool goToSearch;
  final String slogan;
  const Search({Key? key, this.goToSearch = true, this.slogan = ''})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    var query = TextEditingController();
    SearchJobController searchJobController = Get.put(SearchJobController());
    return Container(
      padding: EdgeInsets.symmetric(
        vertical: 25,
        horizontal: 20,
      ),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: primaryColor,
      ),
      child: Column(
        children: [
          if (this.slogan.isNotEmpty)
            Text(
              slogan,
              style: styleSearchSlogan,
            ),
          if (this.slogan.isNotEmpty)
            SizedBox(
              height: 20,
            ),
          if (goToSearch)
            Container(
              padding: EdgeInsets.symmetric(
                vertical: 0,
                horizontal: 15,
              ),
              decoration: BoxDecoration(
                color: background,
                borderRadius: BorderRadius.circular(10),
              ),
              child: InkWell(
                onTap: () {
                  Get.toNamed('/search');
                  searchJobController.clearInput();
                },
                child: Row(
                  children: [
                    SizedBox(
                      width: 210,
                      height: 20,
                      child: Text(
                        'Search for job title and keywords',
                        style: styleSearchHint,
                      ),
                    ),
                    Flexible(fit: FlexFit.tight, child: SizedBox()),
                    IconButton(
                      icon: Icon(
                        Icons.search,
                        color: icon,
                      ),
                      onPressed: () {
                        Get.toNamed('/search');
                      },
                    ),
                  ],
                ),
              ),
            )
          else
            Container(
              child: Column(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(
                      vertical: 0,
                      horizontal: 15,
                    ),
                    decoration: BoxDecoration(
                      color: background,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        SizedBox(
                          width: 250,
                          height: 30,
                          child: TypeAheadField(
                            hideOnLoading: true,
                            hideOnEmpty: true,
                            hideOnError: true,
                            textFieldConfiguration: TextFieldConfiguration(
                              controller: query,
                              decoration: InputDecoration(
                                hintText: 'Search for job title and keywords',
                                hintStyle: styleSearchHint,
                                border: InputBorder.none,
                              ),
                              style: styleJobListPriceText,
                            ),
                            suggestionsCallback: (text) async {
                              searchJobController.updateSearchQuery(text);
                              await searchJobController.getSuggestion(text);
                              return searchJobController.suggestionList;
                            },
                            itemBuilder: (context, suggestion) {
                              return ListTile(
                                title: Text(suggestion.toString()),
                              );
                            },
                            onSuggestionSelected: (suggestion) {
                              query.text = suggestion.toString();
                              searchJobController.updateSearchQuery(suggestion);
                            },
                          ),
                        ),
                        Flexible(fit: FlexFit.tight, child: SizedBox()),
                        IconButton(
                          icon: Icon(
                            Icons.search,
                            color: icon,
                          ),
                          onPressed: () {},
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )
        ],
      ),
    );
  }
}

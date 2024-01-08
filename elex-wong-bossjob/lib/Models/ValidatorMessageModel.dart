///
/// Code generated by jsonToDartModel https://ashamp.github.io/jsonToDartModel/
///
class ValidatorMessageModelData {
/*
{
  "field": "email",
  "message": [
    "The email has already been taken."
  ]
} 
*/

  String? field;
  List<String?>? message;

  ValidatorMessageModelData({
    this.field,
    this.message,
  });
  ValidatorMessageModelData.fromJson(Map<String, dynamic> json) {
    field = json['field']?.toString();
    if (json['message'] != null) {
      final v = json['message'];
      final arr0 = <String>[];
      v.forEach((v) {
        arr0.add(v.toString());
      });
      message = arr0;
    }
  }
  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['field'] = field;
    if (message != null) {
      final v = message;
      final arr0 = [];
      v!.forEach((v) {
        arr0.add(v);
      });
      data['message'] = arr0;
    }
    return data;
  }
}

class ValidatorMessageModel {
/*
{
  "message": "Unprocessable Entity",
  "data": [
    {
      "field": "email",
      "message": [
        "The email has already been taken."
      ]
    }
  ],
  "status_code": 422
} 
*/

  String? message;
  List<ValidatorMessageModelData?>? data;
  int? statusCode;

  ValidatorMessageModel({
    this.message,
    this.data,
    this.statusCode,
  });
  ValidatorMessageModel.fromJson(Map<String, dynamic> json) {
    message = json['message']?.toString();
    if (json['data'] != null) {
      final v = json['data'];
      final arr0 = <ValidatorMessageModelData>[];
      v.forEach((v) {
        arr0.add(ValidatorMessageModelData.fromJson(v));
      });
      this.data = arr0;
    }
    statusCode = json['status_code']?.toInt();
  }
  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['message'] = message;
    if (this.data != null) {
      final v = this.data;
      final arr0 = [];
      v!.forEach((v) {
        arr0.add(v!.toJson());
      });
      data['data'] = arr0;
    }
    data['status_code'] = statusCode;
    return data;
  }
}
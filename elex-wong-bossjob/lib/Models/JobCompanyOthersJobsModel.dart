///
/// Code generated by jsonToDartModel https://ashamp.github.io/jsonToDartModel/
///
class JobCompanyOthersJobsModelDataJobs {
/*
{
  "id": 57780,
  "job_title": "Voice Support Representative | 30,000* Joining Bonus (EL 971)",
  "xp_lvl": "1 - 3 years",
  "job_location": "Mandaluyong",
  "job_type": "Full-time",
  "degree": "Diploma",
  "is_salary_hidden": true,
  "salary_range_from": "Login to view salary",
  "salary_range_to": "Login to view salary"
} 
*/

  int? id;
  String? jobTitle;
  String? xpLvl;
  String? jobLocation;
  String? jobType;
  String? degree;
  bool? isSalaryHidden;
  String? salaryRangeFrom;
  String? salaryRangeTo;

  JobCompanyOthersJobsModelDataJobs({
    this.id,
    this.jobTitle,
    this.xpLvl,
    this.jobLocation,
    this.jobType,
    this.degree,
    this.isSalaryHidden,
    this.salaryRangeFrom,
    this.salaryRangeTo,
  });
  JobCompanyOthersJobsModelDataJobs.fromJson(Map<String, dynamic> json) {
    id = json["id"]?.toInt();
    jobTitle = json["job_title"]?.toString();
    xpLvl = json["xp_lvl"]?.toString();
    jobLocation = json["job_location"]?.toString();
    jobType = json["job_type"]?.toString();
    degree = json["degree"]?.toString();
    isSalaryHidden = json["is_salary_hidden"];
    salaryRangeFrom = json["salary_range_from"]?.toString();
    salaryRangeTo = json["salary_range_to"]?.toString();
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["id"] = id;
    data["job_title"] = jobTitle;
    data["xp_lvl"] = xpLvl;
    data["job_location"] = jobLocation;
    data["job_type"] = jobType;
    data["degree"] = degree;
    data["is_salary_hidden"] = isSalaryHidden;
    data["salary_range_from"] = salaryRangeFrom;
    data["salary_range_to"] = salaryRangeTo;
    return data;
  }
}

class JobCompanyOthersJobsModelData {
/*
{
  "current_num": 6,
  "total_num": 195,
  "current_page": 1,
  "total_pages": 33,
  "jobs": [
    {
      "id": 57780,
      "job_title": "Voice Support Representative | 30,000* Joining Bonus (EL 971)",
      "xp_lvl": "1 - 3 years",
      "job_location": "Mandaluyong",
      "job_type": "Full-time",
      "degree": "Diploma",
      "is_salary_hidden": true,
      "salary_range_from": "Login to view salary",
      "salary_range_to": "Login to view salary"
    }
  ]
} 
*/

  int? currentNum;
  int? totalNum;
  int? currentPage;
  int? totalPages;
  List<JobCompanyOthersJobsModelDataJobs?>? jobs;

  JobCompanyOthersJobsModelData({
    this.currentNum,
    this.totalNum,
    this.currentPage,
    this.totalPages,
    this.jobs,
  });
  JobCompanyOthersJobsModelData.fromJson(Map<String, dynamic> json) {
    currentNum = json["current_num"]?.toInt();
    totalNum = json["total_num"]?.toInt();
    currentPage = json["current_page"]?.toInt();
    totalPages = json["total_pages"]?.toInt();
    if (json["jobs"] != null) {
      final v = json["jobs"];
      final arr0 = <JobCompanyOthersJobsModelDataJobs>[];
      v.forEach((v) {
        arr0.add(JobCompanyOthersJobsModelDataJobs.fromJson(v));
      });
      jobs = arr0;
    }
  }

  get isEmpty => null;
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["current_num"] = currentNum;
    data["total_num"] = totalNum;
    data["current_page"] = currentPage;
    data["total_pages"] = totalPages;
    if (jobs != null) {
      final v = jobs;
      final arr0 = [];
      v!.forEach((v) {
        arr0.add(v!.toJson());
      });
      data["jobs"] = arr0;
    }
    return data;
  }
}

class JobCompanyOthersJobsModel {
/*
{
  "message": "OK",
  "data": {
    "current_num": 6,
    "total_num": 195,
    "current_page": 1,
    "total_pages": 33,
    "jobs": [
      {
        "id": 57780,
        "job_title": "Voice Support Representative | 30,000* Joining Bonus (EL 971)",
        "xp_lvl": "1 - 3 years",
        "job_location": "Mandaluyong",
        "job_type": "Full-time",
        "degree": "Diploma",
        "is_salary_hidden": true,
        "salary_range_from": "Login to view salary",
        "salary_range_to": "Login to view salary"
      }
    ]
  },
  "status_code": 200
} 
*/

  String? message;
  JobCompanyOthersJobsModelData? data;
  int? statusCode;

  JobCompanyOthersJobsModel({
    this.message,
    this.data,
    this.statusCode,
  });
  JobCompanyOthersJobsModel.fromJson(Map<String, dynamic> json) {
    message = json["message"]?.toString();
    data = (json["data"] != null)
        ? JobCompanyOthersJobsModelData.fromJson(json["data"])
        : null;
    statusCode = json["status_code"]?.toInt();
  }

  get isEmpty => null;
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["message"] = message;
    if (data != null) {
      data["data"] = this.data!.toJson();
    }
    data["status_code"] = statusCode;
    return data;
  }
}

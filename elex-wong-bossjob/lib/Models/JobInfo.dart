class JobInfo {
  int? id;
  String? degree;
  String? jobLocation;
  String? jobTitle;
  String? jobType;
  int? salaryRangeFrom;
  int? salaryRangeTo;
  String? xpLvl;

  JobInfo({
    this.id,
    this.degree,
    this.jobLocation,
    this.jobTitle,
    this.jobType,
    this.salaryRangeFrom,
    this.salaryRangeTo,
    this.xpLvl,
  });
  JobInfo.fromJson(Map<String, dynamic> json) {
    id = json["id"]?.toInt();
    degree = json["degree"]?.toString();
    jobLocation = json["job_location"]?.toString();
    jobTitle = json["job_title"]?.toString();
    jobType = json["job_type"]?.toString();
    salaryRangeFrom = json["salary_range_from"]?.toInt();
    salaryRangeTo = json["salary_range_to"]?.toInt();
    xpLvl = json["xp_lvl"]?.toString();
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["id"] = id;
    data["degree"] = degree;
    data["job_location"] = jobLocation;
    data["job_title"] = jobTitle;
    data["job_type"] = jobType;
    data["salary_range_from"] = salaryRangeFrom;
    data["salary_range_to"] = salaryRangeTo;
    data["xp_lvl"] = xpLvl;
    return data;
  }
}
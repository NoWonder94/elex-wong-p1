///
/// Code generated by jsonToDartModel https://ashamp.github.io/jsonToDartModel/
///
class JobFilterModelDataJobsCategories {
/*
{
  "updated_at": "2021-07-19T14:30:27.000000Z",
  "created_at": "2021-07-19T14:30:27.000000Z",
  "id": 35,
  "value": "Sales - Financial Services",
  "key": "sales-financial-services",
  "is_approve": true
} 
*/

  String? updatedAt;
  String? createdAt;
  int? id;
  String? value;
  String? key;
  bool? isApprove;

  JobFilterModelDataJobsCategories({
    this.updatedAt,
    this.createdAt,
    this.id,
    this.value,
    this.key,
    this.isApprove,
  });
  JobFilterModelDataJobsCategories.fromJson(Map<String, dynamic> json) {
    updatedAt = json["updated_at"]?.toString();
    createdAt = json["created_at"]?.toString();
    id = json["id"]?.toInt();
    value = json["value"]?.toString();
    key = json["key"]?.toString();
    isApprove = json["is_approve"];
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["updated_at"] = updatedAt;
    data["created_at"] = createdAt;
    data["id"] = id;
    data["value"] = value;
    data["key"] = key;
    data["is_approve"] = isApprove;
    return data;
  }
}

class JobFilterModelDataJobs {
/*
{
  "job_type": "Freelance",
  "xp_lvl": "1 - 3 years",
  "expired_at": "2021-11-08T09:48:50.000000Z",
  "job_skills": "Sales and Marketing,Customer Relationship Management,Relationship Building",
  "company_address": "Unit 803, Taipan Place, F. Ortigas Jr. Road, Pasig City",
  "company_logo": "https://assets.bossjob.com/companies/21750/logo/DdXyKr8AyFeW9zjgvAFq9kk4srUglo64yUnD6VG7.jpeg",
  "refreshed_at": "2021-09-02 17:50:05",
  "updated_at": "2021-09-02T06:23:13.000000Z",
  "is_salary_hidden": 0,
  "id": 56017,
  "categories": [
    {
      "updated_at": "2021-07-19T14:30:27.000000Z",
      "created_at": "2021-07-19T14:30:27.000000Z",
      "id": 35,
      "value": "Sales - Financial Services",
      "key": "sales-financial-services",
      "is_approve": true
    }
  ],
  "job_title": "Insurance Sales Specialist",
  "salary_range_to": 60000,
  "company_id": 21750,
  "highlighted": 1,
  "salary_range_from": 30000,
  "degree": "Bachelor",
  "company_country": "Philippines",
  "job_description_html": "<ul><li>Conduct financial needs analysis and annual policy review.</li><li>Provide financial planning and support to clients in order to help them achieve their financial goals.</li><li>Recommend the appropriate financial product in order to meet the goals of your clients.</li></ul><ul><li>College graduate from a reputable university</li><li>Good communication and interpersonal skills</li><li>Energetic and with a pleasing personality</li><li>No sales background required</li><li>Fresh graduates are also welcome to apply</li></ul>",
  "screening_message": null,
  "job_country_key": "ph",
  "is_company_verify": false,
  "company_industry": "Insurance",
  "job_description": "Conduct financial needs analysis and annual policy review.Provide financial planning and support to clients in order to help them achieve their financial goals.Recommend the appropriate financial product in order to meet the goals of your clients.College graduate from a reputable universityGood communication and interpersonal skillsEnergetic and with a pleasing personalityNo sales background requiredFresh graduates are also welcome to apply",
  "job_region": "Homebased",
  "company_name": "AXA Philippines (Wonderful World Branch)",
  "job_country": "Philippines",
  "company_location": "Pasig",
  "job_category": null,
  "job_location": "Homebased",
  "is_featured": 1,
  "is_saved": false
} 
*/

  String? jobType;
  String? xpLvl;
  String? expiredAt;
  String? jobSkills;
  String? companyAddress;
  String? companyLogo;
  String? refreshedAt;
  String? updatedAt;
  int? isSalaryHidden;
  int? id;
  List<JobFilterModelDataJobsCategories?>? categories;
  String? jobTitle;
  int? salaryRangeTo;
  int? companyId;
  int? highlighted;
  int? salaryRangeFrom;
  String? degree;
  String? companyCountry;
  String? jobDescriptionHtml;
  String? screeningMessage;
  String? jobCountryKey;
  bool? isCompanyVerify;
  String? companyIndustry;
  String? jobDescription;
  String? jobRegion;
  String? companyName;
  String? jobCountry;
  String? companyLocation;
  String? jobCategory;
  String? jobLocation;
  int? isFeatured;
  bool? isSaved;

  JobFilterModelDataJobs({
    this.jobType,
    this.xpLvl,
    this.expiredAt,
    this.jobSkills,
    this.companyAddress,
    this.companyLogo,
    this.refreshedAt,
    this.updatedAt,
    this.isSalaryHidden,
    this.id,
    this.categories,
    this.jobTitle,
    this.salaryRangeTo,
    this.companyId,
    this.highlighted,
    this.salaryRangeFrom,
    this.degree,
    this.companyCountry,
    this.jobDescriptionHtml,
    this.screeningMessage,
    this.jobCountryKey,
    this.isCompanyVerify,
    this.companyIndustry,
    this.jobDescription,
    this.jobRegion,
    this.companyName,
    this.jobCountry,
    this.companyLocation,
    this.jobCategory,
    this.jobLocation,
    this.isFeatured,
    this.isSaved,
  });
  JobFilterModelDataJobs.fromJson(Map<String, dynamic> json) {
    jobType = json["job_type"]?.toString();
    xpLvl = json["xp_lvl"]?.toString();
    expiredAt = json["expired_at"]?.toString();
    jobSkills = json["job_skills"]?.toString();
    companyAddress = json["company_address"]?.toString();
    companyLogo = json["company_logo"]?.toString();
    refreshedAt = json["refreshed_at"]?.toString();
    updatedAt = json["updated_at"]?.toString();
    isSalaryHidden = json["is_salary_hidden"]?.toInt();
    id = json["id"]?.toInt();
    if (json["categories"] != null) {
      final v = json["categories"];
      final arr0 = <JobFilterModelDataJobsCategories>[];
      v.forEach((v) {
        arr0.add(JobFilterModelDataJobsCategories.fromJson(v));
      });
      categories = arr0;
    }
    jobTitle = json["job_title"]?.toString();
    salaryRangeTo = (json["salary_range_to"] is String)
        ? null
        : json["salary_range_to"]?.toInt();
    companyId = json["company_id"]?.toInt();
    highlighted = json["highlighted"]?.toInt();
    salaryRangeFrom = (json["salary_range_from"] is String)
        ? null
        : json["salary_range_from"]?.toInt();
    degree = json["degree"]?.toString();
    companyCountry = json["company_country"]?.toString();
    jobDescriptionHtml = json["job_description_html"]?.toString();
    screeningMessage = json["screening_message"]?.toString();
    jobCountryKey = json["job_country_key"]?.toString();
    isCompanyVerify = json["is_company_verify"];
    companyIndustry = json["company_industry"]?.toString();
    jobDescription = json["job_description"]?.toString();
    jobRegion = json["job_region"]?.toString();
    companyName = json["company_name"]?.toString();
    jobCountry = json["job_country"]?.toString();
    companyLocation = json["company_location"]?.toString();
    jobCategory = json["job_category"]?.toString();
    jobLocation = json["job_location"]?.toString();
    isFeatured = json["is_featured"]?.toInt();
    isSaved = json["is_saved"];
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["job_type"] = jobType;
    data["xp_lvl"] = xpLvl;
    data["expired_at"] = expiredAt;
    data["job_skills"] = jobSkills;
    data["company_address"] = companyAddress;
    data["company_logo"] = companyLogo;
    data["refreshed_at"] = refreshedAt;
    data["updated_at"] = updatedAt;
    data["is_salary_hidden"] = isSalaryHidden;
    data["id"] = id;
    if (categories != null) {
      final v = categories;
      final arr0 = [];
      v!.forEach((v) {
        arr0.add(v!.toJson());
      });
      data["categories"] = arr0;
    }
    data["job_title"] = jobTitle;
    data["salary_range_to"] = salaryRangeTo;
    data["company_id"] = companyId;
    data["highlighted"] = highlighted;
    data["salary_range_from"] = salaryRangeFrom;
    data["degree"] = degree;
    data["company_country"] = companyCountry;
    data["job_description_html"] = jobDescriptionHtml;
    data["screening_message"] = screeningMessage;
    data["job_country_key"] = jobCountryKey;
    data["is_company_verify"] = isCompanyVerify;
    data["company_industry"] = companyIndustry;
    data["job_description"] = jobDescription;
    data["job_region"] = jobRegion;
    data["company_name"] = companyName;
    data["job_country"] = jobCountry;
    data["company_location"] = companyLocation;
    data["job_category"] = jobCategory;
    data["job_location"] = jobLocation;
    data["is_featured"] = isFeatured;
    data["is_saved"] = isSaved;
    return data;
  }
}

class JobFilterModelData {
/*
{
  "jobs": [
    {
      "job_type": "Freelance",
      "xp_lvl": "1 - 3 years",
      "expired_at": "2021-11-08T09:48:50.000000Z",
      "job_skills": "Sales and Marketing,Customer Relationship Management,Relationship Building",
      "company_address": "Unit 803, Taipan Place, F. Ortigas Jr. Road, Pasig City",
      "company_logo": "https://assets.bossjob.com/companies/21750/logo/DdXyKr8AyFeW9zjgvAFq9kk4srUglo64yUnD6VG7.jpeg",
      "refreshed_at": "2021-09-02 17:50:05",
      "updated_at": "2021-09-02T06:23:13.000000Z",
      "is_salary_hidden": 0,
      "id": 56017,
      "categories": [
        {
          "updated_at": "2021-07-19T14:30:27.000000Z",
          "created_at": "2021-07-19T14:30:27.000000Z",
          "id": 35,
          "value": "Sales - Financial Services",
          "key": "sales-financial-services",
          "is_approve": true
        }
      ],
      "job_title": "Insurance Sales Specialist",
      "salary_range_to": 60000,
      "company_id": 21750,
      "highlighted": 1,
      "salary_range_from": 30000,
      "degree": "Bachelor",
      "company_country": "Philippines",
      "job_description_html": "<ul><li>Conduct financial needs analysis and annual policy review.</li><li>Provide financial planning and support to clients in order to help them achieve their financial goals.</li><li>Recommend the appropriate financial product in order to meet the goals of your clients.</li></ul><ul><li>College graduate from a reputable university</li><li>Good communication and interpersonal skills</li><li>Energetic and with a pleasing personality</li><li>No sales background required</li><li>Fresh graduates are also welcome to apply</li></ul>",
      "screening_message": null,
      "job_country_key": "ph",
      "is_company_verify": false,
      "company_industry": "Insurance",
      "job_description": "Conduct financial needs analysis and annual policy review.Provide financial planning and support to clients in order to help them achieve their financial goals.Recommend the appropriate financial product in order to meet the goals of your clients.College graduate from a reputable universityGood communication and interpersonal skillsEnergetic and with a pleasing personalityNo sales background requiredFresh graduates are also welcome to apply",
      "job_region": "Homebased",
      "company_name": "AXA Philippines (Wonderful World Branch)",
      "job_country": "Philippines",
      "company_location": "Pasig",
      "job_category": null,
      "job_location": "Homebased",
      "is_featured": 1,
      "is_saved": false
    }
  ],
  "max_score": null,
  "page": 1,
  "total_pages": 856,
  "size": 6,
  "total_num": 5132,
  "sort": 1,
  "query": "g",
  "params": "query_fields=job_title%2Cjob_description%2Cjob_requirements%2Ccompany_name&query=g"
} 
*/

  List<JobFilterModelDataJobs?>? jobs;
  String? maxScore;
  int? page;
  int? totalPages;
  int? size;
  int? totalNum;
  int? sort;
  String? query;
  String? params;

  JobFilterModelData({
    this.jobs,
    this.maxScore,
    this.page,
    this.totalPages,
    this.size,
    this.totalNum,
    this.sort,
    this.query,
    this.params,
  });
  JobFilterModelData.fromJson(Map<String, dynamic> json) {
    if (json["jobs"] != null) {
      final v = json["jobs"];
      final arr0 = <JobFilterModelDataJobs>[];
      v.forEach((v) {
        arr0.add(JobFilterModelDataJobs.fromJson(v));
      });
      jobs = arr0;
    }
    maxScore = json["max_score"]?.toString();
    page = json["page"]?.toInt();
    totalPages = json["total_pages"]?.toInt();
    size = json["size"]?.toInt();
    totalNum = json["total_num"]?.toInt();
    sort = json["sort"]?.toInt();
    query = json["query"]?.toString();
    params = json["params"]?.toString();
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    if (jobs != null) {
      final v = jobs;
      final arr0 = [];
      v!.forEach((v) {
        arr0.add(v!.toJson());
      });
      data["jobs"] = arr0;
    }
    data["max_score"] = maxScore;
    data["page"] = page;
    data["total_pages"] = totalPages;
    data["size"] = size;
    data["total_num"] = totalNum;
    data["sort"] = sort;
    data["query"] = query;
    data["params"] = params;
    return data;
  }
}

class JobFilterModel {
/*
{
  "message": "OK",
  "data": {
    "jobs": [
      {
        "job_type": "Freelance",
        "xp_lvl": "1 - 3 years",
        "expired_at": "2021-11-08T09:48:50.000000Z",
        "job_skills": "Sales and Marketing,Customer Relationship Management,Relationship Building",
        "company_address": "Unit 803, Taipan Place, F. Ortigas Jr. Road, Pasig City",
        "company_logo": "https://assets.bossjob.com/companies/21750/logo/DdXyKr8AyFeW9zjgvAFq9kk4srUglo64yUnD6VG7.jpeg",
        "refreshed_at": "2021-09-02 17:50:05",
        "updated_at": "2021-09-02T06:23:13.000000Z",
        "is_salary_hidden": 0,
        "id": 56017,
        "categories": [
          {
            "updated_at": "2021-07-19T14:30:27.000000Z",
            "created_at": "2021-07-19T14:30:27.000000Z",
            "id": 35,
            "value": "Sales - Financial Services",
            "key": "sales-financial-services",
            "is_approve": true
          }
        ],
        "job_title": "Insurance Sales Specialist",
        "salary_range_to": 60000,
        "company_id": 21750,
        "highlighted": 1,
        "salary_range_from": 30000,
        "degree": "Bachelor",
        "company_country": "Philippines",
        "job_description_html": "<ul><li>Conduct financial needs analysis and annual policy review.</li><li>Provide financial planning and support to clients in order to help them achieve their financial goals.</li><li>Recommend the appropriate financial product in order to meet the goals of your clients.</li></ul><ul><li>College graduate from a reputable university</li><li>Good communication and interpersonal skills</li><li>Energetic and with a pleasing personality</li><li>No sales background required</li><li>Fresh graduates are also welcome to apply</li></ul>",
        "screening_message": null,
        "job_country_key": "ph",
        "is_company_verify": false,
        "company_industry": "Insurance",
        "job_description": "Conduct financial needs analysis and annual policy review.Provide financial planning and support to clients in order to help them achieve their financial goals.Recommend the appropriate financial product in order to meet the goals of your clients.College graduate from a reputable universityGood communication and interpersonal skillsEnergetic and with a pleasing personalityNo sales background requiredFresh graduates are also welcome to apply",
        "job_region": "Homebased",
        "company_name": "AXA Philippines (Wonderful World Branch)",
        "job_country": "Philippines",
        "company_location": "Pasig",
        "job_category": null,
        "job_location": "Homebased",
        "is_featured": 1,
        "is_saved": false
      }
    ],
    "max_score": null,
    "page": 1,
    "total_pages": 856,
    "size": 6,
    "total_num": 5132,
    "sort": 1,
    "query": "g",
    "params": "query_fields=job_title%2Cjob_description%2Cjob_requirements%2Ccompany_name&query=g"
  },
  "status_code": 200
} 
*/

  String? message;
  JobFilterModelData? data;
  int? statusCode;

  JobFilterModel({
    this.message,
    this.data,
    this.statusCode,
  });
  JobFilterModel.fromJson(Map<String, dynamic> json) {
    message = json["message"]?.toString();
    data = (json["data"] != null)
        ? JobFilterModelData.fromJson(json["data"])
        : null;
    statusCode = json["status_code"]?.toInt();
  }
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

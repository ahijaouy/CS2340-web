# CS2340-web
Thirsty Goat Web Interface


#API Instructions
##Source Report API
Get a list of all source reports
GET thirstygoat.myoberon.com/api/source_reports

Get a specific source report
GET thirstygoat.myoberon.com/api/source_reports/[source_report_id you want to get]

Delete a specific source report
DELETE thirstygoat.myoberon.com/api/source_reports/[source_report_id you want to delete]

Create a new source report
POST thirstygoat.myoberon.com/api/source_reports
Include in body: location,water_type,water_condition,date_modified, user_modified

##Purity Report API
Get a list of all purity reports
GET thirstygoat.myoberon.com/api/purity_reports

Create a new purity report
POST thirstygoat.myoberon.com/api/purity_reports
Include in body: source_id, overall_condition, virus_ppm, contaminant_ppm, date_modified, user_modified


Get a specific purity report
GET thirstygoat.myoberon.com/api/purity_reports/[purity_report_id you want to get]

Delete a specific purity report
DELETE thirstygoat.myoberon.com/api/purity_reports/[purity_report_id you want to delete]



export const timeTransForms = (data, format = "YYYY-MM-DD hh:mm:ss") => {
  var _data = data;
  //如果是13位正常，如果是10位则需要转化为毫秒
  if (String(data).length == 13) {
    _data = data
  } else {
    _data = data * 1000
  }
  _data = Number(_data);
  var time = new Date(_data);
  var Y = time.getFullYear();
  var Mon = time.getMonth() + 1;
  Mon = Mon < 10 ? ('0' + Mon) : Mon
  var Day = time.getDate();
  Day = Day < 10 ? ('0' + Day) : Day
  var H = time.getHours();
  H = H < 10 ? ('0' + H) : H
  var Min = time.getMinutes();
  Min = Min < 10 ? ('0' + Min) : Min
  var S = time.getSeconds();
  S = S < 10 ? ('0' + S) : S
  //自定义选择想要返回的类型
  return format.replace('YYYY', Y).replace("MM", Mon).replace('DD', Day).replace('hh', H).replace('mm', Min).replace('ss', S)
}
// 数字保留9位数
export const handle9Number = (n) =>{
	if(!n) return '0.00000000'
	let NumberVal
	let val = typeof(n) == 'number' ? n.toString() : n;
	let [zhengshu="", xiaoshu=""] = val.split('.')
	if (zhengshu.length >= 9) {
		NumberVal = zhengshu
	} else if(xiaoshu){
		NumberVal = val.padEnd(10,'0')
	}else{
		val += ".0"
		NumberVal = val.padEnd(10,'0')
	}
	return NumberVal
  }

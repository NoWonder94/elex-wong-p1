let utils = {};

utils.sorting_data = function(data, arr) {
  let x = [];
  let result = [];

  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < data[i].length; k++) {
      x.push(data[i][k]);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < x.length; k++) {
      if (x[k].id == arr[i]) {
        result.push(x[k]);
        break;
      }
    }
  }

  return result;
};

utils.sorting_data_bydate = function(data) {
  let temp = [];
  if (typeof data[0][0] == 'undefined') {
    temp = data;
  } else {
    for (var i = 0; i < data.length; i++) {
      for (var k = 0; k < data[i].length; k++) {
        temp.push(data[i][k]);
      }
    }
  }

  for (var i = 0; i < temp.length; i++) {
    for (var k = i + 1; k < temp.length; k++) {
      if (new Date(temp[i].dateFormat) > new Date(temp[k].dateFormat)) {
        let temp_data = {};
        temp_data = temp[i];
        temp[i] = temp[k];
        temp[k] = temp_data;
      }
    }
  }

  return temp.reverse();
};

export default {
  install(Vue, options) {
    Vue.prototype.$utils = utils;
  }
};

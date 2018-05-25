"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToolClass = undefined;

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToolClass = exports.ToolClass = {};
// 接口调用封装 参数：地址 接口路径 GET/POST请求方式 redux请求 redux接收 数据处理函数 POST请求类型 POST请求初始数据
/**
 * Created by Admin on 2018/5/25.
 */
ToolClass.lanPath = function (url, path, method, request, receive, handleFun, postType, postData) {
    switch (method) {
        case "GET":
            return function (dispatch) {
                dispatch(request(path));
                return ToolClass._fetch((0, _isomorphicFetch2.default)(url, {
                    method: method,
                    mode: "cors"
                }), 30000).then(function (e) {
                    return e.json();
                }).then(function (json) {
                    if (handleFun && handleFun != "") {
                        json = handleFun(json);
                    }
                    if (receive && receive != "") {
                        return dispatch(receive(path, json));
                    }
                }).catch(function (error) {
                    return dispatch(receive(path, ToolClass.errorHandel(error)));
                });
            };
            break;
        case "POST":
            if (postType == "formData") {
                var data = ToolClass.formData(postData);
                return function (dispatch) {
                    dispatch(request(postData));
                    return ToolClass._fetch((0, _isomorphicFetch2.default)(url, {
                        method: "POST",
                        mode: "cors",
                        body: data
                    }), 30000).then(function (e) {
                        return e.json();
                    }).then(function (json) {
                        if (handleFun && handleFun != "") {
                            json = handleFun(json);
                        }
                        if (receive && receive != "") {
                            return dispatch(receive(path, json));
                        }
                    }).catch(function (error) {
                        console.log(error);
                        return dispatch(receive(path, ToolClass.errorHandel(error)));
                    });
                };
            } else if (postType == "paramType") {
                var _data = ToolClass.paramType(postData);
                url = url + _data;
                return function (dispatch) {
                    dispatch(request(path));
                    return ToolClass._fetch((0, _isomorphicFetch2.default)(url, {
                        method: "POST",
                        mode: "cors"
                    }), 30000).then(function (e) {
                        return e.json();
                    }).then(function (json) {
                        if (handleFun && handleFun != "") {
                            json = handleFun(json);
                        }
                        if (receive && receive != "") {
                            return dispatch(receive(path, json));
                        }
                    }).catch(function (error) {
                        return dispatch(receive(path, ToolClass.errorHandel(error)));
                    });
                };
            }
            break;
        default:
            break;
    }
};

ToolClass.errorHandel = function (errorMsg) {
    var temp = {};
    if (errorMsg && errorMsg.message == "响应超时，请稍后再试") {
        temp = errorMsg;
    } else {
        temp = {
            result: "fail",
            message: "接口调用出错"
        };
    }
    return temp;
};

//响应超时封装接口
ToolClass._fetch = function (fetch_promise, timeout) {
    var abort_fn = null;
    //这是一个可以被reject的promise
    var abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function abort_fn() {
            var json = {
                result: "fail",
                message: '响应超时，请稍后再试'
            };
            reject(json);
        };
    });
    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortable_promise = Promise.race([fetch_promise, abort_promise]);
    setTimeout(function () {
        abort_fn();
    }, timeout);
    return abortable_promise;
};

ToolClass.paramType = function (data) {
    var paramArr = [];
    var paramStr = '';
    for (var attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr + "&random=" + Math.random();
    return encodeURI(paramStr);
};

ToolClass.formData = function (data) {
    var formData = new FormData();
    for (var attr in data) {
        formData.append(attr, data[attr]);
    }
    return formData;
};

ToolClass.listSelectKey = function (json, name) {
    for (var i = 0; i < json.length; i++) {
        json[i].key = json[i][name];
    }
    return json;
};

ToolClass.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);return null;
};

//手机号 省份证加密
ToolClass.changeAsterisk = function (str, beforeIndex, nextIndex) {
    var str_length = str.length;
    var str_return = str.substr(0, beforeIndex);
    for (var i = 0; i <= str_length - beforeIndex - nextIndex; i++) {
        str_return = str_return + "*";
    }
    return str_return + str.substr(str_length - nextIndex);
};
//判断字符长度
ToolClass.judgeCharLen = function (str) {
    var l = str.length;
    var blen = 0;
    for (var i = 0; i < l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen++;
        }
        blen++;
    }
    return blen;
};
//获取前一天日期 yyyy-MM-dd
ToolClass.getYesterdayDate = function () {
    var date = new Date();
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};
//金额格式转换 100,000.00
ToolClass.changeMoneyFormat = function (money) {
    var srt_money = parseFloat(money).toFixed(2).toString();
    var arr_money = srt_money.split(".");
    var num = arr_money[0];
    var result = '',
        counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) {
            result = ',' + result;
        }
    }
    return result + "." + arr_money[1];
};
//获取当前日期 yyyy 年 MM 月 dd 日
ToolClass.showToday = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "    年    " + month + "    月    " + strDate + "    日";
    return currentdate;
};
//获取当前日期 yyyy-MM-dd
ToolClass.getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};
//日期格式化 yyyy-MM-dd
ToolClass.formatDate = function (date) {
    var pad = function pad(n) {
        return n < 10 ? "0" + n : n;
    };
    var dateStr = date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
    return "" + dateStr;
};

/**
 输入框格式处理 type 1：正整数 2：2位小数 3：中文 数字 字母 #  4：中文 数字 字母  5：字母 6：中文 7：字母 数字 8：中文 字母
 9：中文 数字
 **/
ToolClass.matchInput = function (str, type) {
    var temp_str = str;
    switch (type) {
        case "1":
            if (temp_str.toString().match('^[0-9]*$') != null) {
                return Trim(temp_str);
            }
            break;
        case "2":
            if (temp_str.match('^[0-9]+([.]{1}[0-9]{1,2})?$') != null) {
                return Trim(temp_str);
            }
            if (temp_str.toString().substr(temp_str.length - 1, 1) == ".") {
                if (temp_str.toString().split(".").length < 2) {
                    return Trim(temp_str);
                }
            }
            break;
        case "3":
            if (temp_str.toString().split("#").length < 2) {
                if (temp_str.toString().match("^[\u4E00-\u9FA5A-Za-z0-9]+$") != null) {
                    return Trim(temp_str);
                }
            } else {
                var temp_arr = temp_str.toString().split("#");
                var flag = true;
                for (var i = 0; i < temp_arr.length - 1; i++) {
                    if (temp_arr[i].toString().match("^[\u4E00-\u9FA5A-Za-z0-9]+$") == null) {
                        flag = false;
                    }
                }
                if (flag) {
                    return Trim(temp_str);
                }
            }
            break;
        case "4":
            if (temp_str.toString().match("^[\u4E00-\u9FA5A-Za-z0-9]+$") != null) {
                return Trim(temp_str);
            }
            break;
        case "5":
            if (temp_str.toString().match('^[A-Za-z]+$') != null) {
                return Trim(temp_str);
            }
            break;
        case "6":
            if (temp_str.toString().match("^[\u4E00-\u9FA5]{0,}$") != null) {
                return Trim(temp_str);
            }
            break;
        case "7":
            if (temp_str.toString().match('^[A-Za-z0-9]+$') != null) {
                return Trim(temp_str);
            }
            break;
        case "8":
            if (temp_str.toString().match("^[\u4E00-\u9FA5A-Za-z]+$") != null) {
                return Trim(temp_str);
            }
            break;
        case "9":
            if (temp_str.toString().match("^[\u4E00-\u9FA50-9]+$") != null) {
                return Trim(temp_str);
            }
            break;
        default:
            break;
    }
    if (temp_str == "") {
        return temp_str;
    }
};

function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
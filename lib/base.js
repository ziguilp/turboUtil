'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.formatTime = formatTime;
exports.formatNumber = formatNumber;
exports.hasOwn = hasOwn;
exports.isEmpty = isEmpty;
exports.isUndefined = isUndefined;
exports.isDefined = isDefined;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isPhone = isPhone;
exports.isEmail = isEmail;
exports.isUrl = isUrl;
exports.isWechat = isWechat;
exports.isEqual = isEqual;
exports.getString = getString;
exports.getNumber = getNumber;
exports.getArray = getArray;
exports.getObject = getObject;
exports.getFunction = getFunction;
exports.getQuery = getQuery;
exports.json = json;
exports.parse = parse;
exports.strToObject = strToObject;
exports.trim = trim;
exports.ltrim = ltrim;
exports.rtrim = rtrim;
exports.strim = strim;
exports.strlen = strlen;
exports.timeformat = timeformat;
exports.leavetime = leavetime;
exports.calcDistance = calcDistance;
exports.isWxMiniapp = isWxMiniapp;
exports.Countdown = Countdown;
/* eslint-disable */
function formatTime() {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
    n = parseInt(n).toString();
    return n[1] ? n : '0' + n;
}

function hasOwn(obj, type) {
    return Object.prototype.hasOwnProperty.call(obj, type);
}

function isEmpty(item) {
    item = getString(item);
    if ("" == strim(item)) return true;
    return false;
}

function isUndefined(item) {
    return typeof item === 'undefined';
}

function isDefined(item) {
    return !isUndefined(item);
}

function isString(item) {
    return typeof item === 'string';
}

function isNumber(item) {
    return typeof item === 'number';
}

function isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
}

function isObject(item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !isArray(item);
}

function isFunction(item) {
    return typeof item === 'function';
}

function isPhone(str) {
    return (/^1\d{10}$/.test(str)
    );
}

function isEmail(str) {
    return (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
    );
}

function isUrl(str) {
    return (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(str)
    );
}

function isWechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}

function isEqual(x, y) {
    if (x === y) {
        return true;
    }

    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    for (var p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            }
            if (_typeof(x[p]) !== "object") {
                return false;
            }
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
}

function getString(item, defaultStr) {
    if (isString(item)) return item.trim();
    if (isNumber(item)) return ('' + item).trim();
    return defaultStr || '';
}

function getNumber(item, defaultNum) {
    var matches = getString(item).match(/\d+/);
    return isNumber(matches && +matches[0]) ? +matches[0] : defaultNum;
}

function getArray(item, defaultArr) {
    item = strToObject(item);
    return isArray(item) ? item : defaultArr || [];
}

function getObject(item, defaultObj) {
    item = strToObject(item);
    return item ? item : defaultObj || {};
}

function getFunction(item) {
    return isFunction(item) ? item : noop;
}

function getQuery(name) {
    var reg = new RegExp(".*(^|\\#|\\?|\\&)" + name + "=([^\\&|\\#]*)(\\&|$)", 'i');
    var r = document.URL.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function json(item) {
    var str = {
        type: Object.prototype.toString.call(item)
    };
    try {
        str = JSON.stringify(item);
    } catch (e) {
        str.error = e && e.stack || '';
    }
    return isString(str) ? str : $json(str);
}

function parse(item) {
    var obj = {
        type: Object.prototype.toString.call(item)
    };
    try {
        obj = JSON.parse(item);
    } catch (e) {
        obj.error = e && e.stack || '';
    }
    return isObject(obj) ? obj : $parse(obj);
}

function strToObject(str) {
    var res = undefined;
    if (isObject(str)) return str;
    try {
        res = JSON.parse(str);
    } catch (e) {}
    if (!res instanceof Object) {
        res = undefined;
    }
    return res;
}

/**
 * 
 * @param {去除两边的空格} str 
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}
//删除左边的空格
function ltrim(str) {
    return str.replace(/(^\s*)/g, '');
}
//删除右边的空格
function rtrim(str) {
    return str.replace(/(\s*$)/g, '');
}
//去除所有空格
function strim(str) {
    return str.replace(/\s/g, '');
}
//字符串计算字符长度(英文一个字符,中文为2个字符)
function strlen(str) {
    var regch = /[\u4e00-\u9fa5]/;
    var length = 0;
    for (var i = 0; i < str.length; i++) {
        if (regch.test(str.charAt(i)) == true) {
            // 中文为2个字符
            length += 2;
        } else {
            // 英文一个字符
            length += 1;
        }
    }
    return length;
}

// 时间格式化
function timeformat(str, format, tissue) {
    var myDate = new Date();
    str = str === 0 || !str || str === 'undefined' || str === NaN ? myDate.getTime() : str;
    str = typeof str === 'string' ? str.replace(/\-/g, '/') : str;
    !format || format === '' ? format = 'y-m-d h:i:s' : format;
    var nowstamp = parseInt(myDate.getTime() / 1000),
        itemtime = parseInt(str),
        year,
        m,
        d,
        h,
        i,
        s;
    if (format == 'timestamp') {
        str === +str ? str = parseInt(str) : str = Date.parse(str);
        if (str > 100000000000) {
            str = str / 1000;
        }
        return str;
    }
    if (itemtime < 10000) {
        //普通时间直接转换
        itemtime = Date.parse(str);
    }
    if (itemtime > 100000000000) {
        itemtime = itemtime / 1000;
    }
    var timebe = nowstamp - itemtime;
    if (tissue && tissue > -1 && tissue < 864000 && timebe < tissue) {
        if (timebe > 86400) {
            //超过1天，按天计算
            return Math.floor(timebe / 86400) + '天前';
        } else if (timebe > 3600) {
            //超过1小时，按小时计算
            return Math.floor(timebe / 3600) + '小时前';
        } else if (timebe > 59) {
            //按分钟计算
            return Math.ceil(timebe / 60) + '分钟前';
        } else {
            return '刚刚';
        }
    } else {
        itemtime = myDate.setTime(itemtime * 1000);
        year = myDate.getFullYear();
        m = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
        d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
        h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
        i = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
        s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();

        if ("object" == format.toLowerCase()) {
            return {
                year: year,
                mon: m,
                day: d,
                hour: h,
                min: i,
                sec: s
            };
        }

        return format.replace('y', year).replace('m', m).replace('d', d).replace('h', h).replace('i', i).replace('s', s);
    }
}

// 查看剩余时间
function leavetime(timeE, format) {
    var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    timeE = timeformat(timeE || '2018-05-17 00:00:00', 'timestamp'); // 结束时间
    format = format || 'D天H时M分S秒';
    var now = timeformat(0, 'timestamp');
    var timec = timeE - now; // 时间差值
    var day = '',
        hour = '',
        min = '',
        sec = '',
        d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (timec > 86400) {
        d = Math.floor(timec / 86400);
        timec = timec % 86400;
    }
    if (timec > 3600) {
        h = Math.floor(timec / 3600);
        timec = timec % 3600;
    }
    if (timec > 59) {
        m = Math.floor(timec / 60);
        timec = Math.floor(timec % 60);
    }

    if ('object' === format.toLowerCase()) {
        return {
            day: formatNumber(d),
            hour: formatNumber(h),
            min: formatNumber(m),
            sec: formatNumber(timec)
        };
    }

    if (!auto) {
        return format.replace("D", formatNumber(d)).replace("H", formatNumber(h)).replace("M", formatNumber(m)).replace("S", formatNumber(timec));
    }
    var res = format;
    if (d > 0) {
        res = res.replace("D", formatNumber(d));
    }
    if (h > 0) {
        res = res.replace("H", formatNumber(h));
    }
    if (m > 0) {
        res = res.replace("M", formatNumber(m));
    }
    if (d == 0 && s > 0) {
        res = res.replace("S", formatNumber(timec));
    } else {
        res = res.replace("S秒", '');
    }
    return res;
}

function calcDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}

function isWxMiniapp() {
    if ('undefined' == typeof wx || !wx) {
        return false;
    }
    if (wx.hasOwnProperty('onNativeEvent') && "function" == typeof wx.onNativeEvent) {
        return true;
    }
    return false;
}

// 倒计时(正计时)
function Countdown(opt) {
    this.totalTime = opt.totalTime || 60; //总时间
    this.model = opt.model || "reduce"; // 计时方式（reduce倒计时、plus正计时）
    this.speed = opt.speed || 50; // 刷新速度 默认50毫秒一次
    this.setSec = opt.setSec || false; // 计时结果取秒
    this.start_callback = opt.start_callback || function () {}; // 计时开始回调函数
    this.callback = opt.callback || function () {}; // 计时中回调函数
    this.end_callback = opt.end_callback || function () {}; // 结束时回调函数
    this.init();
}

Countdown.prototype = {
    init: function init() {
        var dateTime = new Date();
        this.start = dateTime.getTime();
        this.dirt = this.totalTime;
        this.start_callback();
        if ("reduce" == this.model) {
            this.timer();
        } else {
            this.timer_plus();
        }
    },
    timer: function timer() {

        var _this = this;
        this.the_timer = setInterval(function () {
            var now = new Date();

            if (_this.setSec) {
                _this.dirt = _this.totalTime - Math.round((now.getTime() - _this.start) / 1000);
            } else {
                _this.dirt = _this.totalTime - now.getTime() + _this.start;
            }

            _this.callback(_this.dirt);

            if (0 >= _this.dirt) {
                clearInterval(_this.the_timer);
                _this.end_callback();
            }
        }, this.speed);
    },
    timer_plus: function timer_plus() {
        var _this = this;
        this.the_timer = setInterval(function () {
            var now = new Date();

            if (_this.setSec) {
                _this.dirt = Math.round((now.getTime() - _this.start) / 1000);
            } else {
                _this.dirt = now.getTime() - _this.start;
            }

            _this.callback(_this.dirt);

            if (_this.totalTime <= _this.dirt) {
                clearInterval(_this.the_timer);
                _this.end_callback();
            }
        }, this.speed);
    }
};

exports.default = {
    formatTime: formatTime,
    formatNumber: formatNumber,
    hasOwn: hasOwn,
    isArray: isArray,
    isDefined: isDefined,
    isEmail: isEmail,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isFunction: isFunction,
    isNumber: isNumber,
    isObject: isObject,
    isPhone: isPhone,
    isString: isString,
    isUndefined: isUndefined,
    isUrl: isUrl,
    isWechat: isWechat,
    getArray: getArray,
    getObject: getObject,
    getNumber: getNumber,
    getQuery: getQuery,
    getString: getString,
    getFunction: getFunction,
    json: json,
    parse: parse,
    strToObject: strToObject,
    rtrim: rtrim,
    trim: trim,
    ltrim: ltrim,
    strim: strim,
    strlen: strlen,
    leavetime: leavetime,
    timeformat: timeformat,
    calcDistance: calcDistance,
    isWxMiniapp: isWxMiniapp,
    Countdown: Countdown
};
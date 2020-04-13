"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var HTMLDecode = function HTMLDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    var ele = document.createElement('div');
    ele.innerHTML = str;
    return ele.innerText || ele.textContent || '';
};

var hasClass = function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

var removeClass = function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};

var IEVersion = function IEVersion() {
    if ('undefined' == typeof navigator) {
        return false;
    }
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1; //不是ie浏览器
    }
};

var copyToClipboard = function copyToClipboard(str) {
    try {
        var save = function save(e) {
            e.clipboardData.setData('text/plain', str); //下面会说到clipboardData对象
            e.preventDefault(); //阻止默认行为
        };
        document.addEventListener('copy', save);
        var res = document.execCommand("copy"); //使文档处于可编辑状态，否则无效
        if (res) return true;
    } catch (e) {
        console.log('复制error', e);
    }
    return false;
};

exports.default = {
    HTMLDecode: HTMLDecode,
    hasClass: hasClass,
    addClass: addClass,
    IEVersion: IEVersion,
    copyToClipboard: copyToClipboard
};
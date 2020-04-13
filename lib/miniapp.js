"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.page = page;
exports.toast = toast;
exports.confirm = confirm;
exports.loading = loading;
exports.closeToast = closeToast;
exports.navigator = navigator;
exports.saveImage = saveImage;
function page() {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = "/" == currentPage.route.substr(0, 1) ? currentPage.route : "/" + currentPage.route;
    return {
        pages: pages,
        current: currentPage,
        url: url,
        options: currentPage.options
    };
}

function toast(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? '操作成功' : _ref$title,
        _ref$icon = _ref.icon,
        icon = _ref$icon === undefined ? 'none' : _ref$icon,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 2000 : _ref$duration,
        _ref$success = _ref.success,
        success = _ref$success === undefined ? function () {} : _ref$success;

    wx.showToast({
        title: title,
        icon: icon,
        duration: duration,
        success: success
    });
}

function confirm(_ref2) {
    var _ref2$title = _ref2.title,
        title = _ref2$title === undefined ? '操作提示' : _ref2$title,
        _ref2$content = _ref2.content,
        content = _ref2$content === undefined ? '' : _ref2$content,
        _ref2$confirm = _ref2.confirm,
        confirm = _ref2$confirm === undefined ? function () {} : _ref2$confirm,
        _ref2$cancel = _ref2.cancel,
        cancel = _ref2$cancel === undefined ? function () {} : _ref2$cancel;

    wx.showModal({
        title: title,
        content: content,
        success: function success(res) {
            if (res.confirm) {
                console.log('用户点击确定');
                confirm();
            } else if (res.cancel) {
                console.log('用户点击取消');
                cancel();
            }
        }
    });
}

function loading(_ref3) {
    var _ref3$title = _ref3.title,
        title = _ref3$title === undefined ? '加载中...' : _ref3$title,
        _ref3$mask = _ref3.mask,
        mask = _ref3$mask === undefined ? false : _ref3$mask;

    wx.showLoading({
        title: title,
        mask: mask
    });
}

function closeToast() {
    wx.hideLoading();
    wx.hideToast();
}

function navigator(url) {
    var closeCurrentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var nowpage = page().url;
    if (nowpage == url) {
        return false;
    }
    if (closeCurrentPage === true) {
        return wx.redirectTo({
            url: url,
            fail: function fail(res) {
                navigator(url, false);
            }
        });
    }
    wx.navigateTo({
        url: url,
        fail: function fail(res) {
            wx.switchTab({
                url: url,
                fail: function fail(res1) {
                    console.log("【APP】跳转失败", res, res1);
                }
            });
        }
    });
}

/**
 * 保存网络图片
 */
function saveImage(url) {
    var showResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success: function success(res) {
                if (res.authSetting['scope.writePhotosAlbum'] === false) {
                    return confirm({
                        title: '需要授权',
                        content: '需要您授权将图片保存在您的设备',
                        confirm: function confirm() {
                            wx.openSetting({});
                        },
                        cancel: function cancel(e) {
                            if (showResult) {
                                toast({
                                    title: '取消保存'
                                });
                            }
                            reject(new Error("用户取消授权"));
                        }
                    });
                }
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    return wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: function success() {
                            saveImage(url).then(function (s) {
                                resolve(s);
                            }).catch(function (e) {
                                reject(e);
                            });
                        },
                        fail: function fail(e) {
                            if (showResult) {
                                toast({
                                    title: '授权失败'
                                });
                            }
                            reject(e);
                        }
                    });
                }
                wx.downloadFile({
                    url: url,
                    success: function success(file) {
                        wx.saveImageToPhotosAlbum({
                            filePath: file.tempFilePath,
                            success: function success(res) {
                                if (showResult) {
                                    toast({
                                        title: '图片已经保存到相册'
                                    });
                                }
                                resolve(res);
                            },
                            fail: function fail(e) {
                                if (showResult) {
                                    toast({
                                        title: '图片保存失败'
                                    });
                                }
                                reject(e);
                            }
                        });
                    },
                    fail: function fail(e) {
                        if (showResult) {
                            toast({
                                title: '图片下载失败'
                            });
                        }
                        reject(e);
                    }
                });
            },

            fail: function fail(err) {
                if (showResult) {
                    toast({
                        title: '设置启动失败'
                    });
                }
                reject(err);
            }
        });
    });
}

exports.default = {
    page: page,
    toast: toast,
    confirm: confirm,
    loading: loading,
    closeToast: closeToast,
    navigator: navigator,
    saveImage: saveImage
};
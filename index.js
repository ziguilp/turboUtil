'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./lib/base');

var _base2 = _interopRequireDefault(_base);

var _miniapp = require('./lib/miniapp');

var _miniapp2 = _interopRequireDefault(_miniapp);

var _web = require('./lib/web');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = new Object();

util = Object.assign({}, _base2.default, _miniapp2.default, _web2.default);

exports.default = util;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _locator = require('../controllers/locator.controller');

var _locator2 = _interopRequireDefault(_locator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/locators/ - Get list of locator */
.get(_locator2.default.list);

router.route('/:app')
/** GET /api/locators/:app - Get list of app locator */
.get(_locator2.default.getAppLocator);

router.route('/:app/:key')
/** GET /api/locators/:app/:key - Get locator */
.get(_locator2.default.getAppLocatorByKey);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=locator.route.js.map

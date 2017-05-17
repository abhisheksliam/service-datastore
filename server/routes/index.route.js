'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _template = require('./template.route');

var _template2 = _interopRequireDefault(_template);

var _mapper = require('./mapper.route');

var _mapper2 = _interopRequireDefault(_mapper);

var _locator = require('./locator.route');

var _locator2 = _interopRequireDefault(_locator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount user routes at /users
router.use('/users', _user2.default);

// mount auth routes at /auth
router.use('/auth', _auth2.default);

// mount template routes at /templates
router.use('/templates', _template2.default);

// mount template routes at /templates
router.use('/mapper', _mapper2.default);

// mount template routes at /templates
router.use('/locators', _locator2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.route.js.map

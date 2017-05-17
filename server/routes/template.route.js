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

var _template = require('../controllers/template.controller');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/templates - Get list of templates */
.get(_template2.default.list);

router.route('/:templateId')
/** GET /api/templates/:templateId - Get template */
.get(_template2.default.getByTemplateId);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=template.route.js.map

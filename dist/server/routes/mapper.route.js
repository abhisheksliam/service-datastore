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

var _mapper = require('../controllers/mapper.controller');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/mapper - Get list of mapper */
.get(_mapper2.default.list);

router.route('/:templateId')
/** GET /api/mapper/:templateId - Get mapper */
.get(_mapper2.default.getMapperByTemplateId);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=mapper.route.js.map

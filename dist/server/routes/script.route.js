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

var _script = require('../controllers/script.controller');

var _script2 = _interopRequireDefault(_script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/scripts - Get list of scripts */
.get(_script2.default.list)

/** POST /api/scripts - Create new script */
.post(_script2.default.generateAndSaveScript);

router.route('/:scriptId')
/** GET /api/scripts/:scriptId - Get script */
.get(_script2.default.getByScriptId);

router.route('/task/:taskId')
/** GET /api/scripts/task/:taskId - Get script by task id */
.get(_script2.default.getScriptByTaskId);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=script.route.js.map

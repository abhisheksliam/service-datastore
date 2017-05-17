'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _template = require('../models/template.model');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get template
 * @returns {Template}
 */
function getByTemplateId(req, res) {
  var _q = { "uuid": req.params['templateId'] };

  _template2.default.get(_q).then(function (template) {
    return res.json(template);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get template list.
 * @property {number} req.query.skip - Number of templates to be skipped.
 * @property {number} req.query.limit - Limit number of templates to be returned.
 * @returns {Template[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _template2.default.list({ limit: limit, skip: skip }).then(function (templates) {
    return res.json(templates);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { getByTemplateId: getByTemplateId, list: list };
module.exports = exports['default'];
//# sourceMappingURL=template.controller.js.map

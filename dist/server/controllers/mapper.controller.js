'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapper = require('../models/mapper.model');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get mapper
 * @returns {Mapper}
 */
function getMapperByTemplateId(req, res) {
  var _q = { "template_id": req.params['templateId'] };

  _mapper2.default.get(_q).then(function (mapper) {
    return res.json(mapper);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get mapper list.
 * @property {number} req.query.skip - Number of mapper to be skipped.
 * @property {number} req.query.limit - Limit number of mapper to be returned.
 * @returns {Mapper[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _mapper2.default.list({ limit: limit, skip: skip }).then(function (mapper) {
    return res.json(mapper);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { getMapperByTemplateId: getMapperByTemplateId, list: list };
module.exports = exports['default'];
//# sourceMappingURL=mapper.controller.js.map

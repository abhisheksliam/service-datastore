'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Template Schema
 */
var TemplateSchema = new _mongoose2.default.Schema({
  "uuid": String,
  "name": String,
  "meta": {},
  "publish": {},
  "items": []
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TemplateSchema.method({});

/**
 * Statics
 */
TemplateSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of template.
   * @returns {Promise<User, APIError>}
   */
  get: function get(_q) {
    return this.findOne(_q).exec().then(function (template) {
      if (template) {
        return template;
      }
      var err = new _APIError2.default('No such template exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List template in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  }
};

/**
 * @typedef Template
 */
exports.default = _mongoose2.default.model('Template', TemplateSchema, 'templates');
module.exports = exports['default'];
//# sourceMappingURL=template.model.js.map

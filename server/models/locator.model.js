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
 * Mapper Schema
 */
var LocatorSchema = new _mongoose2.default.Schema({
  "app_type": String,
  "xpath": {
    "key": String,
    "value": String
  },
  "tags": []
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
LocatorSchema.method({});

/**
 * Statics
 */
LocatorSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of locator.
   * @returns {Promise<User, APIError>}
   */
  get: function get(_q) {
    return this.find(_q).exec().then(function (locator) {
      if (locator) {
        return locator;
      }
      var err = new _APIError2.default('No such locator exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List locator in descending order of 'createdAt' timestamp.
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
 * @typedef Locator
 */
exports.default = _mongoose2.default.model('Locator', LocatorSchema, 'locators');
module.exports = exports['default'];
//# sourceMappingURL=locator.model.js.map

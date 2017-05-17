'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locator = require('../models/locator.model');

var _locator2 = _interopRequireDefault(_locator);

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get locator
 * @returns {Locator}
 */
function getAppLocator(req, res) {
  var _q = { "app_type": req.params['app'] };

  _locator2.default.get(_q).then(function (locator) {
    return res.json(locator);
  }).catch(function (e) {
    return next(e);
  });
}

function getAppLocatorByKey(req, res) {

  var _q = { $and: [{ 'app_type': req.params.app }, { 'xpath.key': req.params.key }] };

  _locator2.default.get(_q).then(function (locator) {
    return res.json(locator);
  }).catch(function (e) {
    return next(e);
  });
}

function addUpdateLocator(req, res) {

  var _q = { $and: [{ 'app_type': req.body.app_type }, { 'xpath.key': req.body.xpath.key }] };

  _locator2.default.get(_q).then(function (locator) {
    if (locator && locator.length) {

      req.body.tags = arrayUnique(data[0].tags.concat(req.body.tags)); // todo: remove tags whenever applicable
      _locator2.default.findOneAndUpdate({ $and: [{ 'app_type': req.body.app_type }, { 'xpath.key': req.body.xpath.key }] }, { $set: { "tags": req.body.tags, "xpath.value": req.body.xpath.value } }, function (err, doc) {
        if (err) {
          res.json({
            "errors": {
              "errorMessage": err,
              "errorCode": "PROCESSING_ERROR"
            }
          });
        }

        doc.tags = req.body.tags;
        doc.xpath.value = req.body.xpath.value;

        res.json(doc);
      });
    } else {
      var xpath = new Xpath(req.body);
      xpath.save(function (err, xpathData) {
        if (err) {
          res.json({
            "errors": {
              "errorMessage": err,
              "errorCode": "PROCESSING_ERROR"
            }
          });
        }
        return res.json(xpathData);
      });
    }
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get locator list.
 * @property {number} req.query.skip - Number of locator to be skipped.
 * @property {number} req.query.limit - Limit number of locator to be returned.
 * @returns {Locator[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _locator2.default.list({ limit: limit, skip: skip }).then(function (locator) {
    return res.json(locator);
  }).catch(function (e) {
    return next(e);
  });
}

// todo: move to utils
function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

exports.default = { getAppLocator: getAppLocator, getAppLocatorByKey: getAppLocatorByKey, addUpdateLocator: addUpdateLocator, list: list };
module.exports = exports['default'];
//# sourceMappingURL=locator.controller.js.map

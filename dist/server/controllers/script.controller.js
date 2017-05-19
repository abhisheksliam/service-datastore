'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _script2 = require('../models/script.model');

var _script3 = _interopRequireDefault(_script2);

var _mapper = require('../models/mapper.model');

var _mapper2 = _interopRequireDefault(_mapper);

var _template = require('../models/template.model');

var _template2 = _interopRequireDefault(_template);

var _scriptConfig = require('../../config/script-config');

var _scriptConfig2 = _interopRequireDefault(_scriptConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get script
 * @returns {Script}
 */
function getByScriptId(req, res) {
  var _q = { "uuid": req.params['scriptId'] };

  _script3.default.get(_q).then(function (script) {
    return res.json(script);
  }).catch(function (e) {
    return next(e);
  });
}

function getScriptByTaskId(req, res) {
  var _q = { "task_id": req.params['taskId'] };

  _script3.default.get(_q).then(function (script) {
    return res.json(script);
  }).catch(function (e) {
    return next(e);
  });
}

function generateAndSaveScript(req, res, next) {
  // todo: change to promises and es6 syntax

  // request data
  var script_meta = {
    template_id: req.body.template_id,
    step_number: req.body.step_number,
    task_id: req.body.task_id,
    scenario: req.body.scenario,
    params: req.body.params,
    appName: ""
  };

  console.log(script_meta);

  prepareScriptItem(script_meta, function (script_item) {
    _getScriptByTaskId(script_meta.task_id + '.' + script_meta.scenario, function (script) {
      var scriptData;
      if (script) {
        console.log('************** script exist');
        // update existing script
        scriptData = script;
      } else {
        console.log('************** script do not exist');
        scriptData = {
          task_id: script_meta.task_id + '.' + script_meta.scenario,
          task_json: [{
            "items": [],
            "appName": script_meta.appName,
            "id": script_meta.task_id,
            "scenario": script_meta.scenario
          }]
        };
      }

      //update script item
      scriptData.task_json[0].items[parseInt(script_meta.step_number) - 1] = script_item;

      // save updated script
      var _script = new _script3.default(scriptData);

      _script.save().then(function (savedScript) {
        return res.json(savedScript);
      }).catch(function (e) {
        return next(e);
      });
    }, function (error) {
      console.log(error);
    });
  }, function (error) {
    console.log(error);
  });
}

/**
 * Get script list.
 * @property {number} req.query.skip - Number of scripts to be skipped.
 * @property {number} req.query.limit - Limit number of scripts to be returned.
 * @returns {Script[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _script3.default.list({ limit: limit, skip: skip }).then(function (scripts) {
    return res.json(scripts);
  }).catch(function (e) {
    return next(e);
  });
}

function getMapper(template_id, done, error) {

  // todo: reuse controllers

  var _q = { "template_id": template_id };

  _mapper2.default.get(_q).then(function (mapper) {
    done(mapper);
  }).catch(function (e) {
    return error(e);
  });
}

function getTemplateById(template_id, done, error) {
  var _q = { "uuid": template_id };

  _template2.default.get(_q).then(function (template) {
    done(template);
  }).catch(function (e) {
    return error(e);
  });
}

function mergeTemplateParams(template, mapper, params) {
  var delimeter = '$$';
  // todo: replace using regex

  function getKeyValue(key) {
    var ret = null;
    for (var i = 0; i < mapper.length; i++) {
      var el = mapper[i];
      if (delimeter + el['key'] + delimeter === key) {
        ret = el['refer']['ext_key'];
        break;
      }
    }
    if (ret !== null) {
      ret = params[ret] === undefined ? ret : params[ret];
    }
    return ret;
  };

  var _ret = JSON.stringify(template).replace(/\$\$.*?\$\$/gi, function myFunction(x) {
    return getKeyValue(x);
  });

  try {
    _ret = JSON.parse(_ret);
  } catch (e) {
    console.log(e);
  }

  return _ret;
}

function _getScriptByTaskId(taskid, done, error) {
  var _q = { "task_id": taskid };

  _script3.default.get(_q).then(function (script) {
    done(script);
  }).catch(function (e) {
    return error(e);
  });
}

function prepareScriptItem(script_meta, done, error) {

  getMapper(script_meta.template_id, function (mapper) {
    console.log(mapper);
    /*        var _mapper = mapper.map(function(x) {
              return {x: script_meta.skill_params[x]};
            });*/

    getTemplateById(script_meta.template_id, function (template) {
      console.log(template);
      script_meta.appName = template.meta.app;
      var template_item = template.items[0];

      template_item.template = {
        "id": script_meta.template_id,
        "revision": template.meta.version
      };

      var script_item = mergeTemplateParams(template_item, mapper.parameters, script_meta.params);

      done(script_item);
    }, function (e) {
      error(e);
    });
  }, function (e) {
    error(e);
  });
}

exports.default = { getByScriptId: getByScriptId, getScriptByTaskId: getScriptByTaskId, generateAndSaveScript: generateAndSaveScript, list: list };
module.exports = exports['default'];
//# sourceMappingURL=script.controller.js.map

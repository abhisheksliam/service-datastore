import Script from '../models/script.model';
import Mapper from '../models/mapper.model';
import Template from '../models/template.model';

import Service from '../services/scriptor';

import ScriptConfig from '../../config/script-config';

/**
 * Get script
 * @returns {Script}
 */
function getByScriptId(req, res) {
  let _q = {"uuid": req.params['scriptId']};

  Script.get(_q)
    .then((script) => {
      return res.json(script);
    })
    .catch(e => next(e));
}

function getScriptByTaskId(req, res) {
  let _q = {"sle_id": req.params['taskId']};

  Script.get(_q)
      .then((script) => {
          if(req.query.format === 'xml') {
              var xmlContent = Service.jsonToDistXml(script);
              res.set('Content-Type', 'text/xml');
              return res.send(xmlContent);
          } else if(req.query.format === 'java') {
              var javaContent = Service.jsonToDistJava(script);
              return res.json(javaContent);
          } else {
              return res.json(script);
          }
      })
      .catch(e => next(e));
}


function generateAndSaveScript(req, res, next ) {
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

  prepareScriptItem( script_meta, ( script_item ) => {
        _getScriptByTaskId((script_meta.task_id + '.' + script_meta.scenario), (script) => {
          var scriptData;
          if(script){
              console.log('************** script exist');
            // update existing script
            scriptData = script;
          } else {
              console.log('************** script do not exist');
                scriptData = {
                    sle_id: (script_meta.task_id + '.' + script_meta.scenario),
                    task_json: [
                      {
                        "items": [],
                        "appName" : script_meta.appName,
                        "id" : script_meta.task_id,
                        "scenario" : script_meta.scenario
                      },
                    [
                        ["\"1\", \"1\""],
                        "\"Primary\""
                    ]
                    ]
                  };
            }

          //update script item
              scriptData.task_json[0].items[parseInt(script_meta.step_number) -1] = script_item;

          // save updated script
              const _script = new Script(scriptData);

              _script.save()
                  .then(savedScript => res.json(savedScript))
                  .catch(e => next(e));

        },
        (error) => {
              console.log(error);
            })
        },
        ( error ) => {
          console.log(error);
        }
  );
}

/**
 * Get script list.
 * @property {number} req.query.skip - Number of scripts to be skipped.
 * @property {number} req.query.limit - Limit number of scripts to be returned.
 * @returns {Script[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Script.list({ limit, skip })
    .then(scripts => res.json(scripts))
    .catch(e => next(e));
}

function getMapper(template_id, done, error) {

  // todo: reuse controllers

  let _q = {"template_id": template_id};

  Mapper.get(_q)
      .then((mapper) => {
        done(mapper);
      })
      .catch(e => error(e));
}

function getTemplateById(template_id, done, error ) {
  let _q = {"uuid": template_id};

  Template.get(_q)
      .then((template) => {
        done(template);
      })
      .catch(e => error(e));
}

function mergeTemplateParams( template, mapper, params ) {
  var delimeter = '$$';
  // todo: replace using regex

  function getKeyValue(key){
      var ret = null;
      for (var i=0; i<mapper.length; i++){
          let el = mapper[i];
          if((delimeter + el['key'] + delimeter) === key) {
              ret = el['refer']['ext_key'];
              break;
          }
      }
      if (ret !== null) {
            ret = (params[ret] === undefined ? ret : params[ret]);
      }
      return ret;
  };

    var _ret = JSON.stringify(template).replace(/\$\$.*?\$\$/gi, function myFunction(x){return getKeyValue(x);});

    try {
        _ret = JSON.parse(_ret);
    } catch (e){ console.log(e)}

  return _ret;
}

function _getScriptByTaskId( taskid, done, error ) {
  let _q = {"sle_id": taskid};

  Script.get(_q)
      .then((script) => {
        done(script);
      })
      .catch(e => error(e));
}

function prepareScriptItem( script_meta, done, error ){

  getMapper(script_meta.template_id,function( mapper ){
    console.log(mapper);
/*        var _mapper = mapper.map(function(x) {
          return {x: script_meta.skill_params[x]};
        });*/

        getTemplateById(script_meta.template_id, function( template ) {
                console.log(template);
              script_meta.appName = template.meta.app;
              var template_item = template.items[0];

              template_item.template = {
                "id": script_meta.template_id,
                "revision": template.meta.version
              };

              var script_item = mergeTemplateParams(template_item, mapper.parameters, script_meta.params);

              done( script_item );
            },
            ( e ) => {
              error (e);
            }
        )

      },
      ( e ) => {
          error (e);
      }
  )
}



export default { getByScriptId, getScriptByTaskId, generateAndSaveScript, list };

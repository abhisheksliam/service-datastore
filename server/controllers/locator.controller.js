import Locator from '../models/locator.model';
import Utils from '../helpers/utils';

/**
 * Get locator
 * @returns {Locator}
 */
function getAppLocator(req, res) {
  let _q = {"app_type": req.params['app']};

  Locator.get(_q)
    .then((locator) => {
      return res.json(locator);
    })
    .catch(e => next(e));
}

function getAppLocatorByKey(req, res) {

  let _q = {$and: [
    {'app_type': req.params.app},
    {'xpath.key': req.params.key}
  ]}

  Locator.get(_q)
    .then((locator) => {
      return res.json(locator);
    })
    .catch(e => next(e));
}

function addUpdateLocator(req, res) {

  let _q = {$and: [
    {'app_type': req.body.app_type},
    {'xpath.key': req.body.xpath.key}
  ]}

  Locator.get(_q)
    .then((locator) => {
      if(locator && locator.length) {

        req.body.tags = arrayUnique(data[0].tags.concat(req.body.tags));    // todo: remove tags whenever applicable
        Locator.findOneAndUpdate({$and: [
            {'app_type': req.body.app_type},
            {'xpath.key': req.body.xpath.key}
          ]}
          , {$set: {"tags" : req.body.tags, "xpath.value":req.body.xpath.value}}, function(err, doc){
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
        xpath.save(function(err, xpathData) {
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
    })
    .catch(e => next(e));
}

/**
 * Get locator list.
 * @property {number} req.query.skip - Number of locator to be skipped.
 * @property {number} req.query.limit - Limit number of locator to be returned.
 * @returns {Locator[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Locator.list({ limit, skip })
    .then(locator => res.json(locator))
    .catch(e => next(e));
}

// todo: move to utils
function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};


export default { getAppLocator, getAppLocatorByKey, addUpdateLocator, list };

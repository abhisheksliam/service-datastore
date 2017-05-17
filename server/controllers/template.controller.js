import Template from '../models/template.model';

/**
 * Get template
 * @returns {Template}
 */
function getByTemplateId(req, res) {
  let _q = {"uuid": req.params['templateId']};

  Template.get(_q)
    .then((template) => {
      return res.json(template);
    })
    .catch(e => next(e));
}


/**
 * Get template list.
 * @property {number} req.query.skip - Number of templates to be skipped.
 * @property {number} req.query.limit - Limit number of templates to be returned.
 * @returns {Template[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Template.list({ limit, skip })
    .then(templates => res.json(templates))
    .catch(e => next(e));
}

export default { getByTemplateId, list };

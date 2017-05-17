import Mapper from '../models/mapper.model';

/**
 * Get mapper
 * @returns {Mapper}
 */
function getMapperByTemplateId(req, res) {
  let _q = {"template_id": req.params['templateId']};

  Mapper.get(_q)
    .then((mapper) => {
      return res.json(mapper);
    })
    .catch(e => next(e));
}


/**
 * Get mapper list.
 * @property {number} req.query.skip - Number of mapper to be skipped.
 * @property {number} req.query.limit - Limit number of mapper to be returned.
 * @returns {Mapper[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Mapper.list({ limit, skip })
    .then(mapper => res.json(mapper))
    .catch(e => next(e));
}

export default { getMapperByTemplateId, list };

import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import templateCtrl from '../controllers/template.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/templates - Get list of templates */
  .get(templateCtrl.list)

router.route('/:templateId')
  /** GET /api/templates/:templateId - Get template */
  .get(templateCtrl.getByTemplateId)

export default router;

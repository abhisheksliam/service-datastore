import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import mapperCtrl from '../controllers/mapper.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/mapper - Get list of mapper */
  .get(mapperCtrl.list)

router.route('/:templateId')
  /** GET /api/mapper/:templateId - Get mapper */
  .get(mapperCtrl.getMapperByTemplateId)

export default router;

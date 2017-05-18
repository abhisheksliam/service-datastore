import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import scriptCtrl from '../controllers/script.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/scripts - Get list of scripts */
  .get(scriptCtrl.list)

/** POST /api/scripts - Create new script */
    .post(scriptCtrl.generateAndSaveScript);

/**
 *
 {
"template_id": "sample_template_uuid_1",
"step_number": "1",
"task_id": "SKJ16.XL.01.01.09",
"scenario": "A1"
}
 */

router.route('/:scriptId')
  /** GET /api/scripts/:scriptId - Get script */
  .get(scriptCtrl.getByScriptId)

router.route('/task/:taskId')
/** GET /api/scripts/task/:taskId - Get script by task id */
    .get(scriptCtrl.getScriptByTaskId)

export default router;

import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import locatorCtrl from '../controllers/locator.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/locators/ - Get list of locator */
  .get(locatorCtrl.list)

router.route('/:app')
  /** GET /api/locators/:app - Get list of app locator */
  .get(locatorCtrl.getAppLocator)

router.route('/:app/:key')
  /** GET /api/locators/:app/:key - Get locator */
  .get(locatorCtrl.getAppLocatorByKey)

export default router;

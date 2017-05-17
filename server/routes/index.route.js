import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import templateRoutes from './template.route';
import mapperRoutes from './mapper.route';
import locatorRoutes from './locator.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount template routes at /templates
router.use('/templates', templateRoutes);

// mount template routes at /templates
router.use('/mapper', mapperRoutes);

// mount template routes at /templates
router.use('/locators', locatorRoutes);

export default router;

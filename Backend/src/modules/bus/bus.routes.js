import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import {
  postBusRoute,
  getBusRoutes,
  getBusRoute,
  patchBusRoute,
  removeBusRoute,
  postBusLocation,
  getBusLatestLocation,
  getBusRecentLocations,
  webhookBusLocation,
  getBusLatestLocationByBusId
} from './bus.controller.js';

const router = Router();

router.post(
  '/webhook/:busId',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      busId: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      speed: Joi.number().optional(),
      heading: Joi.number().optional()
    }).unknown(true)
  }),
  webhookBusLocation
);

router.use(ensureAuthenticated);

router
  .route('/')
  .get(getBusRoutes)
  .post(
    requireRoles('Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        busId: Joi.string().required(),
        routeName: Joi.string().required(),
        driverName: Joi.string().allow('', null),
        driverContact: Joi.string().allow('', null),
        startTime: Joi.string().allow('', null),
        endTime: Joi.string().allow('', null),
        stops: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            arrivalTime: Joi.string().allow('', null)
          })
        ),
        metadata: Joi.object().unknown(true)
      })
    }),
    postBusRoute
  );

router
  .route('/:id')
  .get(requireRoles('Admin', 'Faculty'), getBusRoute)
  .patch(
    requireRoles('Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        routeName: Joi.string(),
        driverName: Joi.string().allow('', null),
        driverContact: Joi.string().allow('', null),
        startTime: Joi.string().allow('', null),
        endTime: Joi.string().allow('', null),
        active: Joi.boolean(),
        stops: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            arrivalTime: Joi.string().allow('', null)
          })
        ),
        metadata: Joi.object().unknown(true)
      })
    }),
    patchBusRoute
  )
  .delete(requireRoles('Admin'), removeBusRoute);

router.post(
  '/:id/locations',
  requireRoles('Admin', 'Faculty'),
  celebrate({
    [Segments.BODY]: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      speed: Joi.number().optional(),
      heading: Joi.number().optional()
    })
  }),
  postBusLocation
);

router.get('/:id/latest', requireRoles('Student', 'Faculty', 'Admin'), getBusLatestLocation);
router.get(
  '/:id/history',
  requireRoles('Student', 'Faculty', 'Admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      limit: Joi.number().integer().min(1).max(100).default(20)
    })
  }),
  getBusRecentLocations
);

router.get('/bus/:busId/latest', requireRoles('Student', 'Faculty', 'Admin'), getBusLatestLocationByBusId);

export default router;

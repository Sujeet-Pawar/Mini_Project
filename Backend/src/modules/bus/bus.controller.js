import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import env from '../../config/env.js';
import {
  createBusRoute,
  listBusRoutes,
  getBusRouteById,
  updateBusRoute,
  deleteBusRoute,
  recordBusLocation,
  recordBusLocationByBusId,
  getLatestLocation,
  getLatestLocationByBusId,
  getRecentLocations,
  verifyWebhookSecret
} from './bus.service.js';

export const postBusRoute = asyncHandler(async (req, res) => {
  const route = await createBusRoute(req.body);
  successResponse(res, { statusCode: 201, message: 'Bus route created', data: route });
});

export const getBusRoutes = asyncHandler(async (req, res) => {
  const { active } = req.query;
  const routes = await listBusRoutes({ active: active !== undefined ? active === 'true' : undefined });
  successResponse(res, { data: routes });
});

export const getBusRoute = asyncHandler(async (req, res) => {
  const route = await getBusRouteById(req.params.id);
  successResponse(res, { data: route });
});

export const patchBusRoute = asyncHandler(async (req, res) => {
  const route = await updateBusRoute(req.params.id, req.body);
  successResponse(res, { data: route, message: 'Bus route updated' });
});

export const removeBusRoute = asyncHandler(async (req, res) => {
  await deleteBusRoute(req.params.id);
  successResponse(res, { message: 'Bus route deleted' });
});

export const postBusLocation = asyncHandler(async (req, res) => {
  const location = await recordBusLocation({
    busRouteId: req.params.id,
    ...req.body,
    source: 'Manual'
  });
  successResponse(res, { statusCode: 201, message: 'Bus location recorded', data: location });
});

export const getBusLatestLocation = asyncHandler(async (req, res) => {
  const location = await getLatestLocation(req.params.id);
  successResponse(res, { data: location });
});

export const getBusRecentLocations = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const locations = await getRecentLocations({ busRouteId: req.params.id, limit });
  successResponse(res, { data: locations });
});

export const webhookBusLocation = asyncHandler(async (req, res) => {
  const signature = req.headers['x-bus-signature'];
  if (!verifyWebhookSecret(signature, env.BUS_WEBHOOK_SECRET)) {
    return res.status(401).json({ status: 'error', message: 'Invalid webhook signature' });
  }

  const location = await recordBusLocationByBusId({
    busId: req.params.busId,
    ...req.body,
    source: 'Webhook',
    rawPayload: req.body
  });

  successResponse(res, { statusCode: 202, message: 'Location accepted', data: location });
});

export const getBusLatestLocationByBusId = asyncHandler(async (req, res) => {
  const location = await getLatestLocationByBusId(req.params.busId);
  successResponse(res, { data: location });
});

export default {
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
};

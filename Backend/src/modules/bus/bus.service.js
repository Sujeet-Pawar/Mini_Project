import createError from 'http-errors';
import { BusRoute, BusLocation } from './bus.model.js';
import logger from '../../config/logger.js';

export const createBusRoute = async ({ busId, routeName, driverName, driverContact, startTime, endTime, stops, metadata }) => {
  const existing = await BusRoute.findOne({ busId });
  if (existing) {
    throw createError(409, 'Bus ID already exists');
  }

  const route = await BusRoute.create({
    busId,
    routeName,
    driverName,
    driverContact,
    startTime,
    endTime,
    stops,
    metadata
  });

  return route;
};

export const listBusRoutes = async ({ active }) => {
  const query = {};
  if (active !== undefined) {
    query.active = active;
  }

  const routes = await BusRoute.find(query).sort({ routeName: 1 });
  return routes;
};

export const getBusRouteById = async (id) => {
  const route = await BusRoute.findById(id);
  if (!route) {
    throw createError(404, 'Bus route not found');
  }
  return route;
};

export const getBusRouteByBusId = async (busId) => {
  const route = await BusRoute.findOne({ busId });
  if (!route) {
    throw createError(404, 'Bus route not found');
  }
  return route;
};

export const updateBusRoute = async (id, payload) => {
  const route = await BusRoute.findByIdAndUpdate(id, payload, { new: true });
  if (!route) {
    throw createError(404, 'Bus route not found');
  }
  return route;
};

export const deleteBusRoute = async (id) => {
  const route = await BusRoute.findById(id);
  if (!route) {
    throw createError(404, 'Bus route not found');
  }

  await BusLocation.deleteMany({ bus: route._id });
  await route.deleteOne();
};

export const recordBusLocation = async ({ busRouteId, latitude, longitude, speed, heading, source = 'Manual', rawPayload }) => {
  const route = await BusRoute.findById(busRouteId);
  if (!route) {
    throw createError(404, 'Bus route not found');
  }

  const location = await BusLocation.create({
    bus: route._id,
    latitude,
    longitude,
    speed,
    heading,
    source,
    rawPayload
  });

  return location;
};

export const recordBusLocationByBusId = async ({ busId, latitude, longitude, speed, heading, source = 'Webhook', rawPayload }) => {
  const route = await BusRoute.findOne({ busId });
  if (!route) {
    throw createError(404, 'Bus route not found');
  }

  const location = await BusLocation.create({
    bus: route._id,
    latitude,
    longitude,
    speed,
    heading,
    source,
    rawPayload
  });

  return location;
};

export const getLatestLocation = async (busRouteId) => {
  const location = await BusLocation.findOne({ bus: busRouteId }).sort({ recordedAt: -1, createdAt: -1 });
  if (!location) {
    throw createError(404, 'No location data available for this bus');
  }
  return location;
};

export const getLatestLocationByBusId = async (busId) => {
  const route = await BusRoute.findOne({ busId });
  if (!route) {
    throw createError(404, 'Bus route not found');
  }

  return getLatestLocation(route._id);
};

export const getRecentLocations = async ({ busRouteId, limit = 20 }) => {
  const locations = await BusLocation.find({ bus: busRouteId })
    .sort({ recordedAt: -1, createdAt: -1 })
    .limit(limit);

  return locations;
};

export const verifyWebhookSecret = (providedSecret, expectedSecret) => {
  if (!expectedSecret) {
    logger.warn('Webhook secret not configured. Rejecting request.');
    return false;
  }

  return Boolean(providedSecret && providedSecret === expectedSecret);
};

export default {
  createBusRoute,
  listBusRoutes,
  getBusRouteById,
  getBusRouteByBusId,
  updateBusRoute,
  deleteBusRoute,
  recordBusLocation,
  recordBusLocationByBusId,
  getLatestLocation,
  getLatestLocationByBusId,
  getRecentLocations,
  verifyWebhookSecret
};

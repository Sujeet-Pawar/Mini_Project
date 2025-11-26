import mongoose from 'mongoose';

const BusStopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    arrivalTime: {
      type: String
    }
  },
  { _id: false }
);

const BusRouteSchema = new mongoose.Schema(
  {
    busId: {
      type: String,
      required: true,
      unique: true
    },
    routeName: {
      type: String,
      required: true
    },
    driverName: {
      type: String
    },
    driverContact: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    },
    stops: {
      type: [BusStopSchema],
      default: []
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const BusLocationSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BusRoute',
      required: true,
      index: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    speed: {
      type: Number
    },
    heading: {
      type: Number
    },
    recordedAt: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      enum: ['Manual', 'Webhook'],
      default: 'Manual'
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

BusLocationSchema.index({ bus: 1, recordedAt: -1 });

const BusRoute = mongoose.model('BusRoute', BusRouteSchema);
const BusLocation = mongoose.model('BusLocation', BusLocationSchema);

export { BusRoute, BusLocation };
export default BusRoute;

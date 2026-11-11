//Device domain: types, form defaults and mapping

import type { LatLngTuple } from "leaflet";

export type DeviceData = {
  id: string;
  imei: string;
  name: string;
  isEnabled: boolean;
  lastSeen: string;
  dateAdded: string;
  deviceModelId: string;
  workspaceId: string;
};

export type DeviceForm = {
  imei: string;
  name: string;
  isEnabled: boolean;
  deviceModelId: string;
};

export type RecordData = {
  rawData: string;
  parsedData: string;
  receivedAt: string;
  expiresAt: string;
};

export type DevicePositionData = {
  id: string;
  gpsTime: string;
  latitude: number;
  longitude: number;
  altitude: number;
  angle: number;
  receivedAt: string;
};
export type MapLocation = {
  id: string;
  position: LatLngTuple;
};

export const EMPTY_FORM: DeviceForm = {
  imei: "",
  name: "",
  isEnabled: false,
  deviceModelId: "",
};

export function toForm(device: DeviceData): DeviceForm {
  return {
    imei: device.imei,
    name: device.name,
    isEnabled: device.isEnabled,
    deviceModelId: device.deviceModelId,
  };
}

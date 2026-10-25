export type DeviceModelData = {
  id: string;
  name: string;
  protocolName: string;
  description: string;
};

export type DeviceModelForm = {
  name: string;
  protocolName: string;
  description: string;
};

export const EMPTY_DEVICE_MODEL_FORM: DeviceModelForm = {
  name: "",
  protocolName: "",
  description: "",
};

export function toDeviceModelForm(
  deviceModel: DeviceModelData,
): DeviceModelForm {
  return {
    name: deviceModel.name,
    protocolName: deviceModel.protocolName,
    description: deviceModel.description,
  };
}

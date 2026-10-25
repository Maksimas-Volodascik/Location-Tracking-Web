import { useCallback, useState } from "react";
import {
  EMPTY_DEVICE_MODEL_FORM,
  toDeviceModelForm,
  type DeviceModelData,
  type DeviceModelForm,
} from "../types/deviceModels";

interface DeviceModelFormProps {
  initialData?: DeviceModelData | null;
}

export function useDeviceModelForm({ initialData }: DeviceModelFormProps) {
  const [form, setForm] = useState<DeviceModelForm>(
    initialData ? toDeviceModelForm(initialData) : EMPTY_DEVICE_MODEL_FORM,
  );

  const handleChange = (field: keyof DeviceModelForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = useCallback(
    () =>
      setForm(
        initialData ? toDeviceModelForm(initialData) : EMPTY_DEVICE_MODEL_FORM,
      ),
    [initialData],
  );

  return { form, handleChange, handleClear };
}

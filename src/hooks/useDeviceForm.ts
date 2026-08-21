import { useCallback, useState } from "react";
import {
  EMPTY_FORM,
  toForm,
  type DeviceData,
  type DeviceForm,
} from "../types/device";

interface DeviceFormProps {
  initialData?: DeviceData | null;
}

export function useDeviceForm({ initialData }: DeviceFormProps) {
  const [form, setForm] = useState<DeviceForm>(
    initialData ? toForm(initialData) : EMPTY_FORM,
  );

  const handleChange = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleClear = useCallback(
    () => setForm(initialData ? toForm(initialData) : EMPTY_FORM),
    [initialData],
  );

  return { form, handleChange, handleClear };
}

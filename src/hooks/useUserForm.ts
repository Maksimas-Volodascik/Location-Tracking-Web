import type { UserData } from "../types/users";

interface DeviceFormProps {
  initialData?: UserData | null;
}

export function useUserForm({ initialData }: DeviceFormProps) {
  /*const [form, setForm] = useState<DeviceForm>(
    initialData ? toForm(initialData) : EMPTY_FORM,
  );

  const handleChange = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleClear = useCallback(
    () => setForm(initialData ? toForm(initialData) : EMPTY_FORM),
    [initialData],
  );

  return { form, handleChange, handleClear };*/
}

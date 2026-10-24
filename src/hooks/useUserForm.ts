import { useCallback, useState } from "react";
import {
  EMPTY_USER_FORM,
  toUserForm,
  type UserData,
  type UserForm,
} from "../types/users";

interface UserFormProps {
  initialData?: UserData | null;
}

export function useUserForm({ initialData }: UserFormProps) {
  const [form, setForm] = useState<UserForm>(
    initialData ? toUserForm(initialData) : EMPTY_USER_FORM,
  );

  const handleChange = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = useCallback(
    () => setForm(initialData ? toUserForm(initialData) : EMPTY_USER_FORM),
    [initialData],
  );

  return { form, handleChange, handleClear };
}

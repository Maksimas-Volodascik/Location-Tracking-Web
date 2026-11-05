import { useCallback, useState } from "react";
import {
  EMPTY_WORKSPACE_FORM,
  toWorkspaceForm,
  type UpdateWorkspaceData,
  type WorkspaceData,
} from "../types/workspace";

interface WorkspaceFormProps {
  initialData?: WorkspaceData | null;
}

export function useWorkspaceForm({ initialData }: WorkspaceFormProps) {
  const [form, setForm] = useState<UpdateWorkspaceData>(
    initialData ? toWorkspaceForm(initialData) : EMPTY_WORKSPACE_FORM,
  );

  const handleChange = (field: keyof UpdateWorkspaceData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setForm(EMPTY_WORKSPACE_FORM);
  };

  const resetForm = useCallback(
    () =>
      setForm(
        initialData ? toWorkspaceForm(initialData) : EMPTY_WORKSPACE_FORM,
      ),
    [initialData],
  );

  return { form, handleChange, handleClear, resetForm };
}

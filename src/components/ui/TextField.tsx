import { TextField as MuiTextField } from "@mui/material";
import { theme } from "../../styles/theme";

type TextFieldProps = {
  name: string;
  label: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function TextField({ name, label, type, onChange }: TextFieldProps) {
  return (
    <MuiTextField
      name={name}
      label={label}
      type={type}
      variant="filled"
      fullWidth
      color="warning"
      onChange={onChange}
      sx={{
        "& .MuiInputBase-input": {
          //main text
          color: theme.colors.lightText,
        },
        "& .MuiInputLabel-root": {
          //label
          color: theme.colors.accent,
        },
        "& .MuiFilledInput-underline:before": {
          borderBottomColor: theme.colors.accent,
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: theme.colors.accent,
        },
        "& .MuiFilledInput-underline:hover:before": {
          borderBottomColor: theme.colors.accent,
        },
        "& .MuiFilledInput-root:hover": {
          backgroundColor: theme.surface.textBox,
        },
        "& .MuiFilledInput-root.Mui-focused": {
          backgroundColor: theme.surface.textBox,
        },
      }}
    />
  );
}

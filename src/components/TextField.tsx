import { TextField as MuiTextField } from "@mui/material";

type TextFieldProps = {
  name: string;
  label: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TextField({
  name,
  label,
  type,
  onChange,
}: TextFieldProps) {
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
          color: "#fd8636",
        },
        "& .MuiInputLabel-root": {
          //label
          color: "#fd8636",
        },
        "& .MuiFilledInput-underline:before": {
          borderBottomColor: "#fd8636",
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "#fd8636",
        },
        "& .MuiFilledInput-underline:hover:before": {
          borderBottomColor: "#fd8636",
        },
        backgroundColor: "#212121",
      }}
    />
  );
}

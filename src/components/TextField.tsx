import { TextField as MuiTextField } from "@mui/material";

type TextFieldProps = {
  label: string;
  type: string;
};

export default function TextField({ label, type }: TextFieldProps) {
  return (
    <MuiTextField
      label={label}
      type={type}
      variant="filled"
      fullWidth
      color="warning"
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

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
          color: "#ff7d13",
        },
        "& .MuiInputLabel-root": {
          //label
          color: "#ff7d13",
        },
        "& .MuiFilledInput-underline:before": {
          borderBottomColor: "#ff7d13",
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "#ff7d13",
        },
        "& .MuiFilledInput-underline:hover:before": {
          borderBottomColor: "#ff7d13",
        },
        backgroundColor: "#212121",
      }}
    />
  );
}

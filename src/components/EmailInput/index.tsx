import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

function EmailInput(props: TextFieldProps) {
  const [isError, setError] = useState(false);
  const updateField = (e) => {
    props.onChange(e);
    const isEmail = checkIfEmailFormat(e.target.value);
    if (!isEmail) return setError(true);
    setError(false);
  };

  const checkIfEmailFormat = (str: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };

  return (
    <TextField
      {...props}
      onChange={updateField}
      error={isError}
      helperText={isError && "Invalid email format"}
    />
  );
}

export default EmailInput;

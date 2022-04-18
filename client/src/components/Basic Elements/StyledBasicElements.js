import { Button, MenuItem, Radio, TextField } from "@mui/material";
import styled from "@emotion/styled";

export const StyledTextField = styled(TextField)({
  "& label.MuiInputLabel-root ": {
    color: "var(--mydarkerblue)",
  },
  "& label.Mui-focused": {
    color: "var(--myblue)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--myblue)",
  },
  "& input.MuiOutlinedInput-input": {
    color: "var(--mydarkerblue)",
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "var(--mydarkblue)",
    },
    "&:hover fieldset": {
      borderColor: "var(--myblue)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--myblue)",
    },
  },
});

export const StyledMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "var(--myblue)",
  },
  "&:focus:hover": {
    backgroundColor: "var(--myblue)",
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: "var(--myorange)",
  color: "black",
  "&:disabled": {
    backgroundColor: "grey",
  },
  "&:hover": {
    backgroundColor: "orange",
  },
});

export const StyledRadio = styled(Radio)({
  color: "white",

  "&.Mui-checked": {
    color: "orange",
  },
});

import {
  Button,
  MenuItem,
  Radio,
  TextField,
  Stepper,
  ListItem,
} from "@mui/material";
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
    color: "var(--mydarkerblue)",
  },
});

export const StyledMenuItem = styled(MenuItem)({
  color: "var(--mydarkerblue)",
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

export const StyledStepper = styled(Stepper)({
  "& .MuiStepIcon-root text": {
    fill: "black",
    fontWeight: "bold",
  },
  "& .MuiStepIcon-root.Mui-active": {
    color: "orange",
  },
});

export const StyledListItem = styled(ListItem)({
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});

import { CircularProgress } from "@mui/material";

function Loading(props) {
  console.log(props.overrideStyle);
  return (
    <div className="loading-component" style={props.overrideStyle}>
      <CircularProgress
        size={100}
        disableShrink
        variant="indeterminate"
        sx={{ color: "var(--mydarkerblue)" }}
      />
    </div>
  );
}

export default Loading;

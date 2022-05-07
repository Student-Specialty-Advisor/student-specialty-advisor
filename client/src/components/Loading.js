import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="loading-component">
      <div style={{ display: "flex" }}>
        <CircularProgress
          size={100}
          disableShrink
          variant="indeterminate"
          sx={{ color: "var(--mydarkerblue)" }}
        />
      </div>
    </div>
  );
}

export default Loading;

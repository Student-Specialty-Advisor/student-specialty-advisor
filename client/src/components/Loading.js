import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="loading-component">
      <h1>Loading...</h1>
      <div style={{ display: "flex" }}>
        <CircularProgress
          thickness={8}
          size={60}
          sx={{ margin: "auto", color: "var(--mydarkerblue)" }}
        />
      </div>
    </div>
  );
}

export default Loading;

import { Box } from "@mui/material";
import backgroundImg from "../assets/background.png";

export function Background() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={backgroundImg}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </Box>
  );
}

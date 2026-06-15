import { Box, Button, Drawer, Typography } from "@mui/material";

type RecordDrawerProps = {
  handleClose: () => void;
  openDrawer: boolean;
  selectedItem: any;
};

export default function RecordDrawer({
  openDrawer,
  handleClose,
  selectedItem,
}: RecordDrawerProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={openDrawer}
      sx={{
        width: openDrawer ? "320px" : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: "#141412",
          borderLeft: "1px solid #2e2e2b",
          width: "320px",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #2e2e2b",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            minWidth: 0,
            width: 32,
            height: 32,
            borderRadius: "4px",
            color: "#888",
            fontSize: "16px",
          }}
          onClick={handleClose}
        >
          X
        </Button>
        <Typography sx={{ fontSize: "14px", color: "gray" }}>
          {selectedItem ? selectedItem.id : ""}
        </Typography>
      </Box>
    </Drawer>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import RecordList from "./DeviceList/RecordList";

type ModalProps = {
  handleClose: () => void;
  isOpen: boolean;
  deviceId: string | null;
};

export default function ModalView({
  isOpen,
  handleClose,
  deviceId,
}: ModalProps) {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState("Logs"); //Toolbar

  return (
    <div>
      <Modal open={isOpen}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "#1a1917",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "10%",
              maxHeight: "80px",
              background: "#141412",
              borderBottom: "1px solid #2e2e2b",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <Box
              style={{
                flex: "0 0 120px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleClose}
                title="Close"
                sx={{
                  minWidth: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "4px",
                  border: "1px solid #3f3f3f",
                  color: "#888",
                  fontSize: "16px",
                  lineHeight: 1,
                  transition:
                    "border-color 0.15s, color 0.15s, background 0.15s",

                  "&:hover": {
                    borderColor: "#fd8636",
                    color: "#fd8636",
                    backgroundColor: "rgba(253,134,54,0.06)",
                  },
                }}
              >
                X
              </Button>
            </Box>

            <Box
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              {["Graph", "Edit", "Logs"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <Button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    sx={{
                      border: isActive
                        ? "1px solid rgba(253,134,54,0.5)"
                        : "1px solid transparent",

                      borderBottom: isActive
                        ? "2px solid #fd8636"
                        : "2px solid transparent",

                      color: isActive ? "#fd8636" : "#666",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      fontWeight: "Bold",
                      borderRadius: "3px 3px 0 0",

                      "&:hover": {
                        color: isActive ? "#fd8636" : "#aaa",
                        borderColor: isActive
                          ? "rgba(253,134,54,0.5)"
                          : "#3f3f3f",
                        borderBottomColor: isActive ? "#fd8636" : "#3f3f3f",
                      },
                    }}
                  >
                    {tab}
                  </Button>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              position: "relative",
              zIndex: 1,
              scrollbarWidth: "thin",
              scrollbarColor: "#3f3f3f #1a1917",
            }}
          >
            <RecordList deviceId={deviceId} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

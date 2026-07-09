import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { theme } from "../styles/theme";
import { RecordList } from "./deviceList/RecordList";

type ModalProps = {
  handleClose: () => void;
  isOpen: boolean;
  deviceId: string | null;
};

export function ModalView({ isOpen, handleClose, deviceId }: ModalProps) {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState("Logs"); //Toolbar

  return (
    <div>
      <Modal open={isOpen}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: theme.surface.page,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "10%",
              maxHeight: "80px",
              background: theme.surface.drawer,
              borderBottom: theme.borders.default,
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
                  border: theme.borders.subtle,
                  color: theme.colors.description,
                  fontSize: "16px",
                  lineHeight: 1,
                  transition:
                    "border-color 0.15s, color 0.15s, background 0.15s",

                  "&:hover": {
                    borderColor: theme.colors.accent,
                    color: theme.colors.accent,
                    backgroundColor: theme.buttons.secondaryHover,
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
                        ? theme.borders.focusDark
                        : "1px solid transparent",

                      borderBottom: isActive
                        ? theme.borders.focus
                        : "2px solid transparent",

                      color: isActive
                        ? theme.colors.accent
                        : theme.colors.description,
                      fontSize: theme.fontSize.xs,
                      textTransform: "uppercase",
                      fontWeight: theme.fontWeight.bold,
                      borderRadius: "3px 3px 0 0",

                      "&:hover": {
                        color: isActive
                          ? theme.colors.accent
                          : theme.colors.valueText,
                        borderColor: isActive
                          ? theme.borders.focusDark
                          : theme.borders.subtle,
                        borderBottomColor: isActive
                          ? theme.colors.accent
                          : theme.borders.subtle,
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
            }}
          >
            <RecordList deviceId={deviceId} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

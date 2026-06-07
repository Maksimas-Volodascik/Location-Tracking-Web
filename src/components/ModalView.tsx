import { List, ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const rawData = [
  {
    id: "fce0319f-2b04-4f9a-8072-6e9a59a07f27",
    rawData:
      "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF",
    parsedData:
      '{"Header":{"RecordSize":905969664,"CodecID":8,"NumberOfRecords":1},"GpsElements":{"Timestamp":"2019-06-10T10:04:46+00:00","Priority":1,"Longitude":0,"Latitude":0,"Altitude":0,"Angle":0,"Satellites":0,"Speed":0,"EventIoId":1,"TotalIDs":5},"IoElements":{"N1":{"Count":2,"Items":[{"IoId":21,"Value":3},{"IoId":1,"Value":1}]},"N2":{"Count":1,"Items":[{"IoId":66,"Value":24079}]},"N4":{"Count":1,"Items":[{"IoId":241,"Value":24602}]},"N8":{"Count":1,"Items":[{"IoId":78,"Value":0}]},"NX":{"Count":0,"Items":[]}}}',

    receivedAt: "2026-05-30 00:00:00+03",
    expiresAt: "2026-09-07 00:00:00+03",
  },
  {
    id: "fce0500f-2b04-4f9a-8072-6e9a59a07f27",
    rawData:
      "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF",
    parsedData:
      '{"Header":{"RecordSize":905969664,"CodecID":8,"NumberOfRecords":1},"GpsElements":{"Timestamp":"2019-06-10T10:04:46+00:00","Priority":1,"Longitude":0,"Latitude":0,"Altitude":0,"Angle":0,"Satellites":0,"Speed":0,"EventIoId":1,"TotalIDs":5},"IoElements":{"N1":{"Count":2,"Items":[{"IoId":21,"Value":3},{"IoId":1,"Value":1}]},"N2":{"Count":1,"Items":[{"IoId":66,"Value":24079}]},"N4":{"Count":1,"Items":[{"IoId":241,"Value":24602}]},"N8":{"Count":1,"Items":[{"IoId":78,"Value":0}]},"NX":{"Count":0,"Items":[]}}}',

    receivedAt: "2026-05-30 00:00:00+03",
    expiresAt: "2026-09-07 00:00:00+03",
  },
  {
    id: "UFC123d1-2b04-4f9a-8072-6e9a59a07f27",
    rawData:
      "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF",
    parsedData:
      '{"Header":{"RecordSize":905969664,"CodecID":8,"NumberOfRecords":1},"GpsElements":{"Timestamp":"2019-06-10T10:04:46+00:00","Priority":1,"Longitude":0,"Latitude":0,"Altitude":0,"Angle":0,"Satellites":0,"Speed":0,"EventIoId":1,"TotalIDs":5},"IoElements":{"N1":{"Count":2,"Items":[{"IoId":21,"Value":3},{"IoId":1,"Value":1}]},"N2":{"Count":1,"Items":[{"IoId":66,"Value":24079}]},"N4":{"Count":1,"Items":[{"IoId":241,"Value":24602}]},"N8":{"Count":1,"Items":[{"IoId":78,"Value":0}]},"NX":{"Count":0,"Items":[]}}}',

    receivedAt: "2026-05-30 00:00:00+03",
    expiresAt: "2026-09-07 00:00:00+03",
  },
  {
    id: "daa0319f-2b04-4f9a-8072-6e9a59a07f27",
    rawData:
      "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF",
    parsedData:
      '{"Header":{"RecordSize":905969664,"CodecID":8,"NumberOfRecords":1},"GpsElements":{"Timestamp":"2019-06-10T10:04:46+00:00","Priority":1,"Longitude":0,"Latitude":0,"Altitude":0,"Angle":0,"Satellites":0,"Speed":0,"EventIoId":1,"TotalIDs":5},"IoElements":{"N1":{"Count":2,"Items":[{"IoId":21,"Value":3},{"IoId":1,"Value":1}]},"N2":{"Count":1,"Items":[{"IoId":66,"Value":24079}]},"N4":{"Count":1,"Items":[{"IoId":241,"Value":24602}]},"N8":{"Count":1,"Items":[{"IoId":78,"Value":0}]},"NX":{"Count":0,"Items":[]}}}',

    receivedAt: "2026-05-30 00:00:00+03",
    expiresAt: "2026-09-07 00:00:00+03",
  },
  {
    id: "x123da-2b04-4f9a-8072-6e9a59a07f27",
    rawData:
      "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF",
    parsedData:
      '{"Header":{"RecordSize":905969664,"CodecID":8,"NumberOfRecords":1},"GpsElements":{"Timestamp":"2019-06-10T10:04:46+00:00","Priority":1,"Longitude":0,"Latitude":0,"Altitude":0,"Angle":0,"Satellites":0,"Speed":0,"EventIoId":1,"TotalIDs":5},"IoElements":{"N1":{"Count":2,"Items":[{"IoId":21,"Value":3},{"IoId":1,"Value":1}]},"N2":{"Count":1,"Items":[{"IoId":66,"Value":24079}]},"N4":{"Count":1,"Items":[{"IoId":241,"Value":24602}]},"N8":{"Count":1,"Items":[{"IoId":78,"Value":0}]},"NX":{"Count":0,"Items":[]}}}',

    receivedAt: "2026-05-30 00:00:00+03",
    expiresAt: "2026-09-07 00:00:00+03",
  },
];

type ModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

export default function ModalView({ isOpen, handleClose }: ModalProps) {
  if (!open) return null;
  const [activeTab, setActiveTab] = useState("Logs");

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
            <List disablePadding>
              {rawData.map((item, idx) => {
                return (
                  <ListItem
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      gap: "15px",
                      alignItems: "center",
                      px: 3,
                      height: 38,
                      borderLeft: "2px solid transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",

                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#d8d8d8",
                        fontWeight: "bold",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#d8d8d8",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.parsedData}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#d8d8d8",
                        fontWeight: "bold",
                      }}
                    >
                      {item.receivedAt}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#d8d8d8",
                        fontWeight: "bold",
                      }}
                    >
                      {item.expiresAt}
                    </Typography>
                  </ListItem>
                );
              })}

              <Box sx={{ height: 3 }} />
            </List>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

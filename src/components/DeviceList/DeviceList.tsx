import { Box, CssBaseline, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import RecordDrawer from "./RecordDrawer";

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

export default function DeviceList() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleDrawerOpen(item: any) {
    //todo: change any to type
    setSelectedItem(item);
    setOpenDrawer(true);
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <List disablePadding>
        {rawData.map((item, idx) => {
          return (
            <ListItem
              key={item.id}
              onClick={() => handleDrawerOpen(item)}
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
      <RecordDrawer
        selectedItem={selectedItem}
        openDrawer={openDrawer}
        handleClose={() => {
          {
            setOpenDrawer(false);
            setSelectedItem(null);
          }
        }}
      />
    </Box>
  );
}

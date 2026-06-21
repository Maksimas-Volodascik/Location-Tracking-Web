import {
  Box,
  List,
  ListItem,
  ListSubheader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import RecordDrawer from "./RecordDrawer";
import { useQuery } from "@tanstack/react-query";
import type { RecordData } from "../../types/shared";
import { getDeviceRecords } from "../../services/deviceApi";
import { theme } from "../../styles/theme";

type RecordListProps = {
  deviceId: string | null;
};

export default function RecordList({ deviceId }: RecordListProps) {
  const [headers, setHeaders] = useState<string[]>([
    "recieved at",
    "expires at",
    "raw record",
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecordData | null>(null);

  const {
    data: records,
    isLoading,
    error,
  } = useQuery<RecordData[] | null>({
    queryKey: ["records", deviceId],
    queryFn: () => getDeviceRecords(deviceId),
    staleTime: 1000 * 60 * 2,
  });

  function handleDrawerOpen(item: RecordData) {
    //todo: change any to type
    setSelectedItem(item);
    setOpenDrawer(true);
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                    whiteSpace: "nowrap",
                    backgroundColor: theme.bg.tooltip,
                    borderBottom: theme.borders.subtle,
                    px: 3,
                    height: 38,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records?.map((item, idx) => (
              <TableRow
                key={idx}
                onClick={() => handleDrawerOpen(item)}
                sx={{
                  height: 38,
                  cursor: "pointer",
                  borderLeft: "2px solid transparent",
                  backgroundColor: theme.bg.card,
                  "&:hover": {
                    backgroundColor: theme.bg.cardHover,
                  },
                  "& td": {
                    borderBottom: theme.borders.subtle,
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                    whiteSpace: "nowrap",
                    px: 3,
                  }}
                >
                  {item.receivedAt}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                    whiteSpace: "nowrap",
                    px: 3,
                  }}
                >
                  {item.expiresAt}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.valueText,
                    fontWeight: theme.fontWeight.bold,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    px: 3,
                  }}
                >
                  {item.parsedData}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RecordDrawer
        headers={headers}
        setHeaders={setHeaders}
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

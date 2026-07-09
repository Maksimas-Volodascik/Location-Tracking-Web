import { Box, Breadcrumbs, Typography } from "@mui/material";
import { theme } from "../../styles/theme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export function Header({ page, tab }: { page: string; tab: string }) {
  return (
    <Box
      sx={{
        background: theme.surface.card,
        border: theme.borders.subtle,
        borderWidth: "0px 1px 1px 1px",
        position: "relative",
        padding: "15px",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          color: theme.colors.valueText,
          fontWeight: theme.fontWeight.bold,
          marginBottom: "6px",
        }}
      >
        {page}
      </Box>
      <Breadcrumbs
        separator={
          <NavigateNextIcon
            sx={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.description,
            }}
          />
        }
      >
        <Typography
          sx={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.description,
          }}
        >
          {tab}
        </Typography>
        <Typography
          sx={{ fontSize: theme.fontSize.xs, color: theme.colors.accent }}
        >
          {page}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}

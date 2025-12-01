import { Box, Typography, Stack } from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";

export const themeColors = {
  primary: { main: "#4DB6AC", dark: "#00897B", gradient: "linear-gradient(135deg, #4DB6AC 0%, #26A69A 50%, #1976D2 100%)" },
  secondary: { main: "#FF9800", dark: "#F57C00" },
};

export default function LoginBranding() {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, width: "50%", background: themeColors.primary.gradient, flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.05)", top: -100, left: -100 }} />
      <Box sx={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.08)", bottom: -50, right: -50 }} />

      <Box sx={{ width: 320, height: 320, backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", border: "2px solid rgba(255, 255, 255, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}>
        <ChildCareIcon sx={{ fontSize: 80, color: "rgba(255, 255, 255, 0.9)", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "white" }}>PreSkool</Typography>
      </Box>

      <Stack spacing={2} alignItems="center" className="mt-10 px-8">
        <Typography variant="h3" sx={{ color: "white", fontWeight: 800 }}>PreSkool</Typography>
        <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.9)", textAlign: "center", maxWidth: 380 }}>
          Connecting parents and pre-schools for a brighter tomorrow
        </Typography>
      </Stack>
    </Box>
  );
}
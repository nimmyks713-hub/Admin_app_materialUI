"use client";
import DashboardShell from "@/app/components/Dashboardshell";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const trafficData = [
  { day: "Mon", visitors: 1200 },
  { day: "Tue", visitors: 1800 },
  { day: "Wed", visitors: 1500 },
  { day: "Thu", visitors: 2000 },
  { day: "Fri", visitors: 2400 },
  { day: "Sat", visitors: 3000 },
  { day: "Sun", visitors: 2800 },
];

const deviceData = [
  { id: 0, value: 5000, label: "Desktop" },
  { id: 1, value: 3000, label: "Mobile" },
  { id: 2, value: 1200, label: "Tablet" },
];

export default function TrafficPage() {
  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Traffic Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Visitors</Typography>
                <Typography variant="h4">9,200</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Bounce Rate</Typography>
                <Typography variant="h4">32%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Conversion Rate</Typography>
                <Typography variant="h4">4.6%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Visitors (Last 7 Days)
          </Typography>
          <LineChart
            xAxis={[{ dataKey: "day", scaleType: "band" }]}
            series={[{ dataKey: "visitors", label: "Visitors" }]}
            dataset={trafficData}
            height={300}
          />
        </Box>

        {/* Device Breakdown Pie Chart */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Traffic by Device
          </Typography>
          <PieChart
            series={[
              {
                data: deviceData,
                innerRadius: 40,
                outerRadius: 120,
                arcLabel: "label",
              },
            ]}
            height={300}
          />
        </Box>
      </Box>
    </DashboardShell>
  );
}

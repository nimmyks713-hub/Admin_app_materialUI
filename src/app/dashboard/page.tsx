"use client";
import DashboardShell from "@/app/components/Dashboardshell";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 20000 },
  { month: "Jun", revenue: 25000 },
];

const regionSales = [
  { id: 0, value: 4000, label: "USA" },
  { id: 1, value: 3000, label: "Europe" },
  { id: 2, value: 2000, label: "Asia" },
  { id: 3, value: 1000, label: "Others" },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">$125,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Orders</Typography>
                <Typography variant="h4">3,240</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Avg. Order Value</Typography>
                <Typography variant="h4">$38.6</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Returning Customers</Typography>
                <Typography variant="h4">42%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Revenue Trend (Last 6 Months)
          </Typography>
          <LineChart
            xAxis={[{ dataKey: "month", scaleType: "band" }]}
            series={[{ dataKey: "revenue", label: "Revenue" }]}
            dataset={revenueData}
            height={300}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Sales by Region
          </Typography>
          <PieChart
            series={[
              {
                data: regionSales,
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

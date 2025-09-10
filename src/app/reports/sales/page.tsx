"use client";
import DashboardShell from "@/app/components/Dashboardshell";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
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

const topProducts = [
  { name: "iPhone 14", sales: 320 },
  { name: "AirPods Pro", sales: 210 },
  { name: "MacBook Air", sales: 180 },
  { name: "Apple Watch", sales: 140 },
];

const regionSales = [
  { id: 0, value: 4000, label: "USA" },
  { id: 1, value: 3000, label: "Europe" },
  { id: 2, value: 2000, label: "Asia" },
  { id: 3, value: 1000, label: "Others" },
];

export default function SalesPage() {
  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Sales Overview
        </Typography>

        {/* KPI Cards */}
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
            xAxis={[{ dataKey: "month", scaleType: "point" }]}
            series={[{ dataKey: "revenue", label: "Revenue ($)", color: "#1976d2" }]}
            dataset={revenueData}
            height={300}
          />
        </Box>

        <Grid container spacing={20} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Top Selling Products
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Sales</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Sales by Region
            </Typography>
            <PieChart
              series={[
                {
                  data: regionSales,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                },
              ]}
              height={300}
              width={250}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardShell>
  );
}

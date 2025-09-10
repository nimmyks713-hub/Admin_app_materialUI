"use client";
import DashboardShell from "@/app/components/Dashboardshell";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";

const integrations = [
  {
    name: "Stripe",
    description: "Accept online payments securely.",
  },
  {
    name: "PayPal",
    description: "Enable PayPal checkout for customers.",
  },
  {
    name: "DHL",
    description: "Real-time shipping and order tracking.",
  },
  {
    name: "Mailchimp",
    description: "Sync customers for email marketing.",
  },
  {
    name: "Google Docs",
    description:"Create edit and share text documents.",
  },
  {
  name: "Drop Box",
  description:"Backup your critical files to the cloud."
  }
];

export default function IntegrationsPage() {
  return (
    <DashboardShell>
      <Box sx={{ p: 3 }}>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Connect your store with third-party services for payments, shipping, and marketing.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {integrations.map((integration) => (
            <Grid item xs={12} md={6} key={integration.name}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{integration.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {integration.description}
                  </Typography>
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Enable"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardShell>
  );
}

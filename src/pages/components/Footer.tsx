import { Box, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link href="#" color="inherit" underline="none">
            About Us
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="none">
            Contact
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="none">
            Privacy Policy
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ marginTop: '20px' }}>
        © {new Date().getFullYear()} Todoist Clone. All rights reserved.
      </Typography>
    </Box>
  );
}

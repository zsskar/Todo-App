import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const features = [
  { title: 'Task Management', description: 'Easily manage your tasks with our intuitive UI.' },
  { title: 'Collaboration', description: 'Collaborate with your team seamlessly.' },
  { title: 'Reminders', description: 'Set reminders to stay on top of your tasks.' },
];

export default function Features() {
  return (
    <Box sx={{ padding: '60px 20px' }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ textAlign: 'center', padding: '20px' }}>
              <CardContent>
                <CheckCircleOutline color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

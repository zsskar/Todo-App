import { Box, Typography, Grid, Avatar, Card, CardContent } from '@mui/material';

const testimonials = [
  {
    name: 'John Doe',
    feedback: 'Todoist Clone has changed the way I organize my work.',
    avatar: '/images/avatar1.jpg',
  },
  {
    name: 'Jane Smith',
    feedback: 'I can’t imagine my life without this tool.',
    avatar: '/images/avatar2.jpg',
  },
];

export default function Testimonials() {
  return (
    <Box sx={{ padding: '60px 20px', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        What Our Users Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Avatar alt={testimonial.name} src={testimonial.avatar} sx={{ margin: '0 auto 20px', width: 60, height: 60 }} />
                <Typography variant="body1" gutterBottom>
                  {testimonial.feedback}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  - {testimonial.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

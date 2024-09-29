"use client";
import { Box, Button, Container, Typography, Divider } from '@mui/material';
import { Google } from '@mui/icons-material';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Sign in to Your Account
        </Typography>
        <Divider sx={{ width: '100%', mb: 3 }} ></Divider>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Google />}
          fullWidth
          sx={{ mb: 3, backgroundColor: '#4285F4', '&:hover': { backgroundColor: '#357ae8' } }}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Login with Google
        </Button>
        <Divider sx={{ width: '100%', mb: 3 }} ></Divider>
        {/* <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField label="Email Address" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Stack> */}
      </Box>
    </Container>
  );
}

// components/HeroSection.js
import { Box, Typography, Button } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HeroSection() {

  const session = useSession();
  const router = useRouter();

  const checkSession = () => {
      if(session.data?.user){
       router.push("/dashboard");
      }else{
      signIn()
      }
  }

  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        color: '#333',
        textAlign: 'center',
        padding: '0 20px',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Organize your work and life, finally.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Simplify life for both you and your team. The worlds #1 task manager and to-do list app.
      </Typography>
      <Button onClick={checkSession} variant="contained" color="primary" size="large">
        Get Started
      </Button>
    </Box>
  );
}

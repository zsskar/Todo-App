import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


type HeaderProps = {
  session: Session | null;
};


const Header: React.FC<HeaderProps> = ({ session }) => {
  const router = useRouter();

  const logOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  };
  // console.log('Session:', session);


  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Todoist
        </Typography>
  
        { !session ? 
        <Box>
          {/* <Button color="inherit">Features</Button>
          <Button color="inherit">Pricing</Button> */}
          <Button onClick={() =>  signIn()} color="inherit">Login</Button>
        </Box> :
        <><h3>Welcome, {session?.user.name}</h3>
        <Box>
          <Button onClick={() => router.push('/dashboard')} color="inherit">Dashboard</Button>
          <Button onClick={() => logOut()} color="inherit">LogOut</Button>
          </Box>
          </>
      }
      </Toolbar>
    </AppBar>
  );
}

export default Header;


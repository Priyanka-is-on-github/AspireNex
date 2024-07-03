import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from "react-router-dom";
import '../../index.css'


const navLinks= [ 
  {
    name: "Home",
    link: "/",
  },
  
  {
    name: "Create Quiz",
    link: "/create-quiz",
  },
  {
    name: "Attend Quiz",
    link: "/attend-quiz",
  },
];

function NavBar() {
  const { pathname } = useLocation();
  // console.log(pathname)

  return (
    <AppBar position="fixed" sx={{ height:'10%'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
        
          <Typography
            variant="h6"
            noWrap
            
          
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily:"cursive",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Online Quiz
          </Typography>

          <Box
              sx={{
                py: {
                  xs: "0px",
                  lg: "16px",
                },
                display: "flex",
               
                gap: 4,
              }}
            >
              {navLinks.map((item)=>(   
                <Link 
                  key={item.name}
                  to={item.link}
                  style={{ textDecoration: "none" }}  
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      color:'white',
                      textDecoration: "none",

                      ':hover': {
                        backgroundColor: 'white',
                        color:'#082160',
                        boxShadow: 'rgba(5,5,5,0.08) 0px 2px 20px 0px',
                       
                      },
                      p:1,
                      borderRadius:5,

                      transition:'.6s',
                      
                    }}
                    
                    className={`boxcontainer ${pathname === item.link ? 'active' : ''}`}
                  >
                    
                    

                   
                      <Typography >{item.name}</Typography>
                  
                  </Box>
                </Link>
               
                

              ))}
            </Box>

          
          
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

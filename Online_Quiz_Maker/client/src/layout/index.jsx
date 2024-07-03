import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import NavBar from "../components/navbar";



export const Layout = ({children} ) => {  
  return (
    <>
    
      <Box  
        sx={{
         
         
        
          width:"100%",
          
                
      
        }}
      >
        <NavBar/>  
        <Box  sx={{ width:'80%',margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'center',mt:'6%'}}>{children}</Box>  
      </Box>
      
    </>
  );
};

import React from 'react'
import { Box, TextField, Typography } from "@mui/material";


function MediumScore({Score , Total}) {
  return (
    <Box
        sx={{
          height: "50vh",
          width: "45%",
          m: "auto ",
          my: 8,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          textAlign: "center",
          borderRadius: "3%",

        
        }}
      >
        <img src='/images/praise.png' alt='claphand' height='150px' width='150px'/>

        <Typography
          variant="h3"
          sx={{
            color: "green",
            fontWeight: "bold",
            
            m: 3,
           
          }}
        >
          {" "}
          "Great job!"
        </Typography>

        <Typography variant="h4" sx={{ color: "gray" }}>
    {`Your Score: ${Score} / ${Total}`}
    </Typography>
      </Box> 
  )
}

export default MediumScore
import React from 'react'
import { Layout } from '../../layout'
import { Box, Typography } from '@mui/material'

function Home() {
  return (

    <Layout>
      <Box sx={{textAlign:'center',pt:'2rem'}}>
      <Typography variant="h1" sx={{color:'#082160', textAlign:'center'}}>Let's Quiz</Typography>

      <Typography variant='h3' sx={{pt:'1rem', fontFamily:"inherit"}}>"Engage, Educate, and Entertain with Our Easy-to-Use Quiz Maker"</Typography>

      <Typography  variant='h6' sx={{pt:'1rem'}}>Here you can create quizzes and attend quizzes</Typography>
      </Box>
        
    </Layout>
    
  )
}

export default Home
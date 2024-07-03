import React from "react";
import { Layout } from "../../layout";
import { Box, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import HighestScore from "./highest-score";
import LowestScore from "./lowest-score";
import MediumScore from "./medium-score";



function Score() {

  const location = useLocation();
  const { score, total } = location.state;

  return (
    <Layout>

      <Typography variant="h3" sx={{ color: "#082160", textAlign: "center" }}>
        Quiz Score
      </Typography>

{
  score === total ? (<HighestScore Score={score} Total={total}/>) : score >= total/2?(<MediumScore  Score={score} Total={total}/>):(<LowestScore  Score={score} Total={total}/>)
}
     
     </Layout>
  );
}

export default Score;

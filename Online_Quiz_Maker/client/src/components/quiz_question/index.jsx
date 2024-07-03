import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function QuizQuestions() {
  const { id } = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0)




  const handleOptionChange = (questionId, option) => {

    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: option
    }));
  };

 

  const handleSubmit = () => {
    
    if (Object.keys(selectedOption).length === 0) {
      alert('Please, first attempt the quiz');
      return;
    }

   let newScore = 0;
   allQuestions.forEach((question)=>{

    if(question.answer === selectedOption[question.id]){
      newScore++;
    }
   })

   setScore(newScore);
   navigate(`/attend-quiz/${id}/score`, { state: { score: newScore, total : allQuestions.length } });

    
  };

  


  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/v1/questions/${id}`
        );

        const allQuestion = await response.json();

     
        setAllQuestions(allQuestion);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);



  return (
    <Layout>
      <Typography variant="h3" sx={{ color: "#082160", textAlign: "center" }}>
        {id}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "gray" }}>
          {" "}
          {`Total questions: ${allQuestions.length}`}
        </Typography>

        <Button variant="contained" type="button" onClick={() => navigate("/attend-quiz")} sx={{backgroundColor:'#EF5350'}}>
          Quit
        </Button>
      </Box>

      {allQuestions.map((allQuestion, index) => {
        return (
          <Box sx={{ mt: 3 }} key={allQuestion.id}>
            <Typography sx={{ color: "#0065A5", fontSize: "1.11rem" }}>
              {index + 1}. {allQuestion.question}
            </Typography>

            <Box sx={{ mt: 1.7, fontSize: "1.1rem" }}>
              <Box style={{ padding: "0.6rem" }}>
                <input
                  type="radio"
                  id="option1"
                  name={allQuestion.id}
                  value={allQuestion.option1}
                  onChange={()=>handleOptionChange( allQuestion.id, allQuestion.option1)}
                  
                />
                {" "}
                <label htmlFor="option1" style={{ paddingLeft: "0.3rem" }}>
                  {allQuestion.option1}
                </label>

              </Box>

              <Box style={{ padding: "0.6rem" }}>
                <input
                  type="radio"
                  id="option2"
                  name={allQuestion.id}
                  value={allQuestion.option2}
                  onChange={()=>handleOptionChange( allQuestion.id, allQuestion.option2)}
                  
                />
                {" "}
                <label htmlFor="option2" style={{ paddingLeft: "0.3rem" }}>
                  {allQuestion.option2}
                </label>
              </Box>
              
              <Box style={{ padding: "0.6rem" }}>
                <input
                  type="radio"
                  id="option3"
                  name={allQuestion.id}
                  value={allQuestion.option3}
                  onChange={()=>handleOptionChange( allQuestion.id, allQuestion.option3)}
                 
                />
                {" "}
                <label htmlFor="option3" style={{ paddingLeft: "0.3rem" }}>
                  {allQuestion.option3}
                </label>
              </Box>
              
              <Box style={{ padding: "0.6rem" }}>
                <input
                  type="radio"
                  id="option4"
                  name={allQuestion.id}
                  value={allQuestion.option4}
                  onChange={()=>handleOptionChange( allQuestion.id, allQuestion.option4)}
               
                />
                {" "}
                <label htmlFor="option4" style={{ paddingLeft: "0.3rem" }}>
                  {allQuestion.option4}
                </label>
              </Box> 
            
            </Box>
          </Box>
        );
      })}

      <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
        <Button variant="contained" type="button" onClick={()=>handleSubmit()}>
          Submit
        </Button>
      </Box>
    </Layout>
  );
}

export default QuizQuestions;


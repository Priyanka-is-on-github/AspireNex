import React, { createContext, useState } from "react";
import { Layout } from "../../layout";
import { Box, Button, TextField, Typography } from "@mui/material";

import toast from "react-hot-toast";
import AddQuestion from "../../components/add_question";

function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [iscreated, setIsCreated] = useState(false);

  //create quize name

  const handleChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/api/v1/quizname", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quizname: quizName }),
      });

      const isCreated = await response.json();

      if (isCreated === false) {
        alert("Please give another name, it exists");
      } else {
        setIsCreated(true);
        toast.success("Quiz name created");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      {iscreated ? (
        <AddQuestion quizName={quizName} />
      ) : (
        <Box
          sx={{
            height: "65vh",
            width: "35%",
            m: "auto ",
            my: 8,
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            textAlign: "center",
            borderRadius: "3%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          component="form"
          onSubmit={(e) => handleQuizName(e)}
        >
          <Typography variant="h4" sx={{ color: "#082160" }}>
            Quiz Name
          </Typography>
          <Typography variant="h6">Give a unique quiz name </Typography>
          <TextField
            margin="normal"
            required
            id="quiz"
            label="quiz name"
            name="quiz"
            type="quiz"
            onChange={handleChange}
            className="textfield"
            sx={{ width: "80%" }}
          />

          <Button
            variant="contained"
            sx={{ width: "80%", p: 2, fontSize: "1rem", mt: 2 }}
            type="submit"
          >
            create
          </Button>
        </Box>
      )}
    </Layout>
  );
}

export default CreateQuiz;

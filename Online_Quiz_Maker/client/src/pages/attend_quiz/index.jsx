import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AttendQuiz() {
  const [allQuizNames, setAllQuizNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:2000/api/v1/quizname");
        const allQuiz = await response.json();

        setAllQuizNames(allQuiz);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Layout>
      <Typography variant="h3" sx={{ color: "#082160", textAlign: "center" }}>
        Attend Quiz
      </Typography>

      <Box
        sx={{
          display: "flex",
          mt: 5,

          flexDirection: "column",
        }}
      >
        {allQuizNames.map((allQuizName, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "80%",
                fontWeight: 700,
                fontSize: 20,
                backgroundColor: "#63C5DA",
                borderRadius: 10,
                boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",

                mb: 2,
              }}
              key={index}
            >
              <Box
                sx={{ flex: "6", pl: 4, color: "#082160", fontSize: "1.3rem" }}
              >
                {allQuizName.quizName}
              </Box>

              <Box sx={{ flex: "2", textAlign: "center" }}>
                {allQuizName.count === "0" ? (
                  <Button
                    sx={{
                      p: 1,

                      color: "gray",
                      borderRadius: 5,

                      m: 2,
                      disable: "true",
                    }}
                  >
                    NOt available
                  </Button>
                ) : (
                  <Button
                    sx={{
                      backgroundColor: "#082160",
                      p: 1,

                      color: "white",
                      borderRadius: 5,
                      ":hover": {
                        backgroundColor: "white",
                        color: "#082160",
                      },
                      boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",
                      transition: "0.3s",
                      m: 2,
                    }}
                    onClick={() =>
                      navigate(`/attend-quiz/${allQuizName.quizName}`)
                    }
                  >
                    Quiz
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export default AttendQuiz;

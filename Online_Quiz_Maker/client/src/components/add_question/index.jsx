import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { Box, Button, Hidden, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

function AddQuestion({ quizName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allQuestion, setAllQuestion] = useState({});

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  const handleQuiz = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2000/api/v1/submit-question",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...formData, quizname: quizName }),
        }
      );

      const questionCreated = await response.json();
      if (questionCreated === false) {
        alert("Question already exist,please give another question");
        setFormData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
      } else {
        setFormData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });

        toast.success("Quiz question created");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/v1/question-delete?id=${questionId}&quizname=${quizName}`,
        {
          method: "DELETE",
        }
      );

      const restQuestion = await response.json();

      setAllQuestion(restQuestion);

      toast.success("Question Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/v1/questions/${quizName}`
        );

        const previewQuestion = await response.json();
        setAllQuestion(previewQuestion);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [open]);

  return (
    <Layout>
      {open ? (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <Typography
              variant="h5"
              sx={{ color: "white" }}
            >{`Total Quiz: ${allQuestion.length}`}</Typography>

            <Box sx={style}>
              {allQuestion.map((question, index) => {
                return (
                  <Box key={question.id}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        type="button"
                        sx={{ mr: 2, width: "8%" }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        type="button"
                        sx={{ backgroundColor: "#EF5350", width: "8%" }}
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </Button>
                    </Box>

                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ color: "#0065A5" }}
                    >
                      {index + 1}. {question.question}
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-description"
                      sx={{ mt: 2 }}
                    >
                      - {question.option1}
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-description"
                      sx={{ mt: 2 }}
                    >
                      - {question.option2}
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-description"
                      sx={{ mt: 2 }}
                    >
                      - {question.option3}
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-description"
                      sx={{ mt: 2 }}
                    >
                      - {question.option4}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Modal>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ color: "#082160", textAlign: "center" }}
          >
            Add Quiz
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              type="button"
              onClick={() => navigate("/")}
              sx={{ backgroundColor: "#EF5350" }}
            >
              Quit
            </Button>
          </Box>

          <Box
            sx={{ width: "90%", margin: "0 auto", mb: 3 }}
            component="form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="question"
                style={{ fontFamily: "sans-serif", fontSize: "1.3rem" }}
              >
                Question
              </label>
              <input
                type="text"
                placeholder="Write question..."
                id="question"
                name="question"
                required
                value={formData.question}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="Option1"
                style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
              >
                Option 1
              </label>
              <input
                type="text"
                placeholder="write option 1"
                id="option1"
                name="option1"
                required
                value={formData.option1}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="Option2"
                style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
              >
                Option 2
              </label>
              <input
                type="text"
                placeholder="write option 2"
                id="Option2"
                name="option2"
                required
                value={formData.option2}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="Option3"
                style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
              >
                Option 3
              </label>
              <input
                type="text"
                placeholder="write option 3"
                id="Option3"
                name="option3"
                required
                value={formData.option3}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="Option4"
                style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
              >
                Option 4
              </label>
              <input
                type="text"
                placeholder="write option 4"
                id="Option4"
                name="option4"
                required
                value={formData.option4}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", mb: 3, gap: 1.5 }}
            >
              <label
                htmlFor="answer"
                style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
              >
                Answer
              </label>
              <input
                type="text"
                placeholder="write answer..."
                id="answer"
                name="answer"
                required
                value={formData.answer}
                onChange={handleQuiz}
                style={{
                  padding: "2%",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  fontSize: "1rem",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" type="submit">
                Add
              </Button>

              <Button variant="contained" onClick={handleOpen}>
                Preview
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Layout>
  );
}

export default AddQuestion;

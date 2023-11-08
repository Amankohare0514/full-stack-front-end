import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.URL_BACKEND}/api/v1/blog/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width="100%" // Full width
          padding={3}
          margin="auto"
          boxShadow="10px 10px 20px #ccc"
          display="flex"
          flexDirection="column"
          marginTop="30px"
          sx={{
            background: 'white',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'transparent', // Make the text transparent
              background: 'linear-gradient(to right, red, black)', // Linear gradient background
              WebkitBackgroundClip: 'text', // Apply the gradient as a text fill
              display: 'inline',
            }}
          >
            Create your Post
          </Typography>

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
            Tell your story
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              width: '150px',       // Set button width to 150px
              backgroundColor: 'grey',
              '&:hover': {
                backgroundColor: 'red', // Change background color on hover to red
              },
              margin: '50px auto 0',  // Top margin of 50px, center horizontally
            }}
          >
            Publish
          </Button>
        </Box>
      </form>


    </>
  );
};

export default CreateBlog;

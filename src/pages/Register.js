import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
  <Box
    maxWidth={450}
    display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    margin="auto"
    marginTop={5}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    borderRadius={5}
    sx={{
      background: 'linear-gradient(to right, red, black)',
      border: '2px solid white',
      color: 'white', // Set text color to white
    }}
  >
    <Typography
      variant="h4"
      sx={{ textTransform: "uppercase" }}
      padding={3}
      textAlign="center"
    >
      Register
    </Typography>
    <TextField
      placeholder="Enter your name"
      value={inputs.name}
      onChange={handleChange}
      name="name"
      margin="normal"
      type="text"
      required
      InputProps={{ style: { color: 'white' , width: '350px'} }} // Set input text color to white
      InputLabelProps={{ style: { color: 'white' } }} // Set input label color to white
    />
    <TextField
      placeholder="Enter your email"
      value={inputs.email}
      name="email"
      margin="normal"
      type="email"
      required
      onChange={handleChange}
      InputProps={{ style: { color: 'white' , width: '350px' } }} // Set input text color to white
      InputLabelProps={{ style: { color: 'white' } }} // Set input label color to white
    />
    <TextField
      placeholder="Enter your password"
      value={inputs.password}
      name="password"
      margin="normal"
      type="password"
      required
      onChange={handleChange}
      InputProps={{ style: { color: 'white' , width: '350px'} }} // Set input text color to white
      InputLabelProps={{ style: { color: 'white' } }} // Set input label color to white
    />

    <Button
      type="submit"
      sx={{  background: 'linear-gradient(to right, red, black)',  borderRadius: 3, marginTop: 3 }}
      variant="contained"
      color="grey"

    >
      Submit
    </Button>
    <Button
      onClick={() => navigate("/login")}
      sx={{ borderRadius: 3, marginTop: 3  , color:"white"}}
    >
      Already Registered? Please Login
    </Button>
  </Box>
</form>
    </>
  );
};

export default Register;

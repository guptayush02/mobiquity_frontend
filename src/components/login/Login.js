import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Button, Link } from '@mui/material';
import { login } from '../../services/api'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [emailError, setEmailError] = useState(false)

  const enterAccount = async() => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      const body = {
        email,
        password
      }
      const result = await login(body)
      console.log("result-->", result)
      setMessage(result.message)
      if (result.code === 200) {
        await localStorage.setItem('token', result.body.token)
        navigate('/dashboard')
      }
    } else {
      setError('Enter a valid email')
      setEmailError(true)
    }
  }

  return (
    <Box
      mt={15} p={2}
      display='flex'
      justifyContent='center'
    >
      <FormControl sx={{ flexDirection: { xs: "column", sm: "column" } }} >
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          variant="filled"
          size="small"
          type="email"
          placeholder="Email"
          error={emailError === true}
          helperText={error}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box mt={2} />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          variant="filled"
          size="small"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box mt={2} />
        <Button variant="outlined" onClick={() => enterAccount()}>Login</Button>
        <Box sx={{ color: 'rgb(102, 187, 106)' }}>{message}</Box>
        <Box mt={2} />
        Create a new Account <Link href="/">Signup</Link>
      </FormControl>
    </Box>
  )
}

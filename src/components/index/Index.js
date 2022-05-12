import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Button, Link } from '@mui/material';
import { signup } from '../../services/api'
import { ToastContainer, toast } from 'material-react-toastify';

export default function Index() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const createAccount = async() => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setEmailError(false)
      setError(null)
      const body = {
        name,
        email,
        password
      }
      const result = await signup(body)
      if (result.code === 200) {
        toast("Signup successfully");
        setSuccess("Signup Successfully, Please login")
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
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Box mt={2} />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          variant="filled"
          size="small"
          type="email"
          error={emailError === true}
          placeholder="Email"
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
        <Button variant="outlined" onClick={() => createAccount()}>Signup</Button>
        <Box sx={{ color: 'rgb(102, 187, 106)' }}>{success}</Box>
        <Box mt={2} />
        Already have an account <Link href="/login">Login</Link>
      </FormControl>
    </Box>
  )
}

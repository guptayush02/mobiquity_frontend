import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Button, Link } from '@mui/material';
import { signup } from '../../services/api'
import { toast } from "react-toastify";

export default function Index() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const createAccount = async() => {
    const body = {
      name,
      email,
      password
    }
    const result = await signup(body)
    if (result.code === 200) {
      toast.success('Signup successfully')
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
          placeholder="Email"
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
        <Box mt={2} />
        Already have an account <Link href="/login">Login</Link>
      </FormControl>
    </Box>
  )
}

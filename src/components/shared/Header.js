import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export default function Header({children}) {
  const [isLoggedin, setIsLoggedin] = useState(false)
  useEffect(() => {
    checkLogin()
  })

  const checkLogin = async() => {
    const token = await localStorage.getItem('ekanekToken')
    if (token) {
      setIsLoggedin(true)
    } else {
      setIsLoggedin(false)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} style={{position: 'sticky'}}>
      <AppBar sx={{bgcolor: '#000'}} position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            File Upload
          </Typography>
          {
            !isLoggedin ? <Link href="/login">Login</Link> : <Link href="/login">Logout</Link>
          }
        </Toolbar>
      </AppBar>
      <main className={`transition-all duration-500 ease-in-out flex flex-grow bg-white`}>{children}</main>
    </Box>
  );
}

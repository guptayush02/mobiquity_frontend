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

  return (
    <Box sx={{ flexGrow: 1 }} style={{position: 'sticky'}}>
      <AppBar sx={{bgcolor: '#000'}} position="fixed">
        <Toolbar>
        </Toolbar>
      </AppBar>
      <main className={`transition-all duration-500 ease-in-out flex flex-grow bg-white`}>{children}</main>
    </Box>
  );
}

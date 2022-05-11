import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Button, Link } from '@mui/material';
import { sharedLink } from '../../services/api'
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function PublicFile() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [shareId, setShareId] = useState(searchParams.get("id"))
  const [publicLink, setPublicLink] = useState(null)

  useEffect(() => {
    setShareId(searchParams.get("id"))
    getSharedFileLink()
  }, [])

  const getSharedFileLink = async() => {
    const result = await sharedLink(shareId)
    if (result.code === 200) {
      setPublicLink(result.body.publicUrl)
      window.open(result.body.publicUrl, "_self");
    }
  }

  return (
    <Box
      mt={15} p={2}
      display='flex'
      justifyContent='center'
    >
    </Box>
  )
}

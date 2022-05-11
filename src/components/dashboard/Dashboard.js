import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Modal, Button, IconButton, Typography, FormGroup, FormControlLabel, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getFiles, deleteFile } from '../../services/api'
import ShareIcon from '@mui/icons-material/Share';
import { fileUpload } from '../../services/api'
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {

  function createData(id, title, description, url) {
    return { id, title, description, url};
  }
  
  const rows = [
    createData(1, 'title', 'description', 'url'),
    createData(2, 'title', 'description', 'url'),
    createData(3, 'title', 'description', 'url'),
    createData(4, 'title', 'description', 'url'),
    createData(5, 'title', 'description', 'url'),
  ];

  console.log("rows-->", rows)

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    getAllFiles()
  }, [])

  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)
  const [shareUrlId, setShareUrlId] = useState(null)

  const getAllFiles = async() => {
    const result = await getFiles()
    setFiles(result.body.files)
  }

  const uploadFile = async() => {
    console.log("upload file")
    const body = {
      title,
      description,
      url
    }
    const result = await fileUpload(body)
    if (result.code === 200) {
      return toast.success(result.message)
    }
  }

  const handleCapture = async({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      console.log("e--->", e.target.result)
      setUrl('http://jfjfj')
    }

  }

  const deleteFileById = async(id) => {
    const result = await deleteFile(id)
    if (result.code === 200) {
      return toast.success(result.message)
    }
  }


  return (
    <Box
      mt={15} p={2}
      display='flex'
      justifyContent='center'
      flexDirection='column'
    >
      <Button variant="outlined" onClick={handleOpenModal}>Upload Form</Button>
      <Box mt={10} />
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Url</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.url}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => deleteFileById(row.id)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete">
                    <ShareIcon onClick={() => setShareUrlId(row.id)} />
                  </IconButton>
                  {
                    shareUrlId === row.id && `http://localhost:3000/public-file?id=${shareUrlId}`
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload file
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl sx={{ flexDirection: { xs: "column", sm: "column" } }} >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue=""
                variant="filled"
                size="small"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue=""
                variant="filled"
                size="small"
                type="text"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box mt={2} />
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleCapture} />
                <Box mt={2} />
                {/* <Button variant="contained" component="span" onClick={uploadFile}>
                  Upload
                </Button> */}
              </label>
              <Button variant="contained" component="span" onClick={uploadFile}>
                Upload
              </Button>
            </FormControl>
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}

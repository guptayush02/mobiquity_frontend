import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Modal, Button, IconButton, Typography, FormGroup, FormControlLabel, Input } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
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
import { ToastContainer, toast } from 'react-toastify';
import config from '../../constants/config'
import { useNavigate } from "react-router-dom";

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

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    getAllFiles()
  }, [])
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [shareUrlId, setShareUrlId] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [file, setFile] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)

  const getAllFiles = async() => {
    try {
      setFileLoading(true)
      const result = await getFiles()
      setFiles(result.body.files)
      setFileLoading(false)
    } catch (err) {
      setFiles([])
      setFileLoading(false)
    }
  }

  const uploadFile = async() => {
    setIsLoading(true)
    const formData = new FormData()
    console.log("upload file")
    formData.append('title', title)
    formData.append('description', description)
    formData.append('file', file)
    formData.append('fileName', fileName)

    const result = await fileUpload(formData)
    if (result.code === 200) {
      setIsLoading(false)
      getAllFiles()
      setOpen(false)
      return toast.success(result.message)
    }
  }

  const handleCapture = async({ target }) => {
    setFile(target.files[0])
    setFileName(target.files[0].name)
  }

  const deleteFileById = async(id) => {
    const result = await deleteFile(id)
    if (result.code === 200) {
      getAllFiles()
      return toast.success(result.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('ekanekToken')
    navigate('/login')
  }

  return (
    <Box
      mt={15} p={2}
      display='flex'
      justifyContent='center'
      flexDirection='column'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          justifyContent: 'space-between',
          borderRadius: 1,
        }}
      >
        <Button variant="outlined" onClick={handleOpenModal}>Upload Form</Button>
        <Button variant="outlined" component="span" onClick={logout}>Logout</Button>
      </Box>
      <Box mt={10} />
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fileLoading ? <CircularProgress color={'inherit'} /> :
              files.length > 0 ?
                files.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
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
                        shareUrlId === row.id && `${config.API_URL}/public-file?id=${shareUrlId}`
                      }
                    </TableCell>
                  </TableRow>
              )) : 'Files not found'
            }
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
                {
                  isLoading ? <CircularProgress color={'inherit'} /> : 'Submit'
                }
              </Button>
            </FormControl>
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}

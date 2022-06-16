import React, { useState, useEffect } from 'react'
import { FormControl, Box, TextField, Modal, Button, IconButton, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAtmList, deleteAtm, createAtm, updateAtm, citiesList } from '../../services/api'
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import config from '../../constants/config'
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

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

  const handleOpenModal = (type, row) => {
    setSubmitType(type)
    if (type === 'update') {
      setBiggerLocation(row.bigger_location)
      setZipCode(row.zipcode)
      setCity(row.city)
      setStreet(row.street)
      setLocation(row.location)
      setType(row.type)
      setUpdatedId(row.id)
    } else {
      setBiggerLocation(null)
      setZipCode(null)
      setCity(null)
      setStreet(null)
      setLocation(null)
      setType(null)
    }
    setOpen(true)
  };

  const handleCloseModal = () => {
    setSubmitType(null)
    setOpen(false)
  };

  useEffect(() => {
    getAllAtmLists()
    getCitiesList()
  }, [])

  const navigate = useNavigate();

  const [submitType, setSubmitType] = useState(null)
  const [updatedId, setUpdatedId] = useState(null)
  const [atms, setAtm] = useState([]);
  const [open, setOpen] = useState(false)
  const [biggerLocation, setBiggerLocation] = useState(null)
  const [zipCode, setZipCode] = useState(null)
  const [location, setLocation] = useState(null)
  const [type, setType] = useState(null)
  const [street, setStreet] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)
  const [city, setCity] = useState(null)

  const [cityArray, setCityArray] = useState([])
  const [filterCity, setFilterCity] = useState(null)

  const getCitiesList = async() => {
    const result = await citiesList()
    setCityArray(result.body)
  }

  const getAllAtmLists = async(filter = null) => {
    try {
      setFileLoading(true)
      const result = await getAtmList(filter)
      setAtm(result.body)
      setFileLoading(false)
    } catch (err) {
      setAtm([])
      setFileLoading(false)
    }
  }

  const create = async() => {
    setIsLoading(true)
    const body = [
      {
        "bigger_location": biggerLocation,
        "zipcode": zipCode,
        "city": city,
        "street": street,
        "location": location,
        "type": type
      }
    ]

    const result = await createAtm(body)
    if (result.code === 200) {
      setIsLoading(false)
      getAllAtmLists()
      setOpen(false)
      return toast.success(result.message)
    }
  }

  const update = async() => {
    setIsLoading(true)
    const body = {
      "bigger_location": biggerLocation,
      "zipcode": zipCode,
      "city": city,
      "street": street,
      "location": location,
      "type": type
    }

    const result = await updateAtm(body, updatedId)
    if (result.code === 200) {
      setIsLoading(false)
      getAllAtmLists()
      setOpen(false)
      return toast.success(result.message)
    }
  }

  const deleteAtmById = async(id) => {
    const result = await deleteAtm(id)
    if (result.code === 200) {
      getAllAtmLists()
      return toast.success(result.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const editAtmById = (row) => {
    handleOpenModal('update', row)
  }

  const changeCityFilter = async(e) => {
    const filter = e.target.value
    await setFilterCity(e.target.value)
    getAllAtmLists(filter)
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
        <Button variant="outlined" onClick={() => handleOpenModal('create')}>Create</Button>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filterCity}
            onChange={(e) => changeCityFilter(e)}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              cityArray.map((c) => (
                <MenuItem value={c}>{c}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <Button variant="outlined" component="span" onClick={logout}>Logout</Button>
      </Box>
      <Box mt={10} />
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Bigger location</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Street</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Zip Code</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
              {/* <TableCell align="right">Private Share</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fileLoading ? <CircularProgress color={'inherit'} /> :
              atms.length > 0 ?
                atms.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.bigger_location}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.street}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.zipcode}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => deleteAtmById(row.id)} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon onClick={() => editAtmById(row)} />
                      </IconButton>
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
            {
              submitType === 'update' ? 'Update' : 'Create' 
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl sx={{ flexDirection: { xs: "column", sm: "column" } }} >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={biggerLocation}
                variant="filled"
                size="small"
                type="text"
                placeholder="bigger location"
                onChange={(e) => setBiggerLocation(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={zipCode}
                variant="filled"
                size="small"
                type="number"
                placeholder="zipcode"
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={city}
                variant="filled"
                size="small"
                type="text"
                placeholder="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={street}
                variant="filled"
                size="small"
                type="text"
                placeholder="street"
                onChange={(e) => setStreet(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={location}
                variant="filled"
                size="small"
                type="text"
                placeholder="location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <Box mt={2} />
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={type}
                variant="filled"
                size="small"
                type="text"
                placeholder="type"
                onChange={(e) => setType(e.target.value)}
              />
              <Box mt={2} />
              
              <Button variant="contained" component="span" onClick={submitType === 'update' ? update : create}>
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

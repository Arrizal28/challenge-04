import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormControl, Container, Button, TextField, Card, CardContent, Typography, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Opacity } from '@mui/icons-material';

function Home() {
    const nilaiAwal = {
        nama: 'Lim Felicia',
      };
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [refetchData, setRefetchData] = useState(true);
      const [nama, setNama] = useState('');
      const [id, setId] = useState('');
      const [email, setEmail] = useState('');
      const [task, setTask] = useState('');
      const [complete, setComplete] = useState(false);
      const [newTask, setNewTask] = useState('');
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
      const [search, setSeacrh] = useState('');
      const params = useParams();
      const navigate = useNavigate();
      const location = useLocation();
    
      const fetchData = async () => {
        setLoading(true);
        // const param = new URLSearchParams(params);
        axios({
          method: 'GET',
          // url: 'http://localhost:3001/posts',
          url: `https://fake-api-coba.herokuapp.com/todos${location.search}`,
        })
          .then((res) => {
            setData(res?.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
            setRefetchData(false);
          });
      };

      const donee = async () => {
        setLoading(true);
        axios({
          method: 'GET',
          // url: 'http://localhost:3001/posts',
          url: 'https://fake-api-coba.herokuapp.com/todos?complete=true'
        })
          .then((res) => {
            setData(res?.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
            setRefetchData(false);
          });
      };

      const notdonee = async () => {
        setLoading(true);
        axios({
          method: 'GET',
          // url: 'http://localhost:3001/posts',
          url: 'https://fake-api-coba.herokuapp.com/todos?complete=false'
        })
          .then((res) => {
            setData(res?.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
            setRefetchData(false);
          });
      };

      const handleCreate = async () => {
        try {
          await axios({
            method: 'post',
            // url: ` http://localhost:3001/posts`,
            url: 'https://fake-api-coba.herokuapp.com/todos',
            data: {
              // nama: nama,
              // email: email
              task: task,
              complete: complete
            }
          });
          setRefetchData(true);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleUpdate = async (item) => {
        try {
          await axios({
            method: 'PUT',
            // url: ` http://localhost:3001/posts/${id}`,
            url: `https://fake-api-coba.herokuapp.com/todos/${item.id}`,
            data: {
              // nama: nama,
              // email: email
              ...item,
              complete: !item.complete,
            }
          });
          setRefetchData(true)
        } catch (error) {
          console.log(error);
        }

      };
      // const fetchData = async () => {
      //   setLoading(true);
      //   try {
      //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      //     setData(res?.data);
      //   } catch (error) {
      //     console.log(error);
      //   } finally {
      //     setLoading(false);
      //     setRefetchData(false);
      //   }
      // };
    
      useEffect(() => {
        if (refetchData) {
          fetchData();
        }
      }, [refetchData, location.search]);

      // const loadUsers = () => {
      //   axios.get("http://localhost:3001/users").then((res) => {
      //     setData(res.data.reverse());
      //   });
      // }
    
      const handleDelete = async (id) => {
        try {
          await axios({
            method: 'DELETE',
            url: ` https://fake-api-coba.herokuapp.com/todos/${id}`,
          });
          setRefetchData(true);
        } catch (error) {
          console.log(error);
        }
      };

      const deleteAll = async() => {
        fetchData(data.forEach((item) => {
          axios.delete(` https://6322c389a624bced307e0f83.mockapi.io/todo/${item.id}`)
        }))
        setRefetchData(true)
      }

      return (
        <>
        <Container>
          <div className='Home'>
            <h1>Todo Search</h1>
                    <form>
                        <FormControl fullwidth={ true } >                    
                            <TextField required={ true } label='Search' value={search}
                              onChange={(e) => {
                                e.preventDefault();
                                setSeacrh(e.target.value);
                              }}>
                            </TextField>                            
                        </FormControl>
                    </form>
            <Button variant="contained" style={{ marginLeft: 10, marginTop: 15}} onClick={() => {
              if (search) {
                navigate(`?task=${search}`);
              } else {
                navigate(`/`);
              }
              setRefetchData(true);
            }}>Search</Button>
            {/* <input
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSeacrh(e.target.value);
            }}
            /> */}
          </div>
          </Container>
          <Container>
            <div className='btn2'>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15}} onClick={() => navigate("/TodoForm")}>Create</Button>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15}} onClick={() => donee()}>Done</Button>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15}} onClick={() => notdonee()}>Todo</Button>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15}} onClick={() => fetchData()}>All</Button>
            </div>
          </Container>
          <Container maxWidth="md" style={{ marginTop: 35 }}>
            {!data.length
                ?
                <Typography variant="h6" color="error">No Data to display</Typography>
                :
                (<List>
                    {data.map(item => {
                        return (
                            <ListItem key={item.id} button>
                                <ListItemText primary={item.task} className={item.complete? "done" : ''} />
                                <Link onClick={() => handleUpdate(item)} to={"#"}>
                                  <iconButton>
                                    <CheckIcon {...label} color="success" style={{ float: "right" }}/>
                                  </iconButton>
                                </Link>
                                <Link
                                    onClick={()=>handleDelete(item.id)}
                                    to={"#"}>                                      
                                      <iconButton style={{ float: "right"}} >
                                        <DeleteIcon style={{ color: "red" }}/>
                                      </iconButton>
                                </Link>
                                {/* <Link to={`/TodoForm/${item.id}`} > */}
                                  <iconButton style={{ float: "right"}} onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/TodoForm/${item.id}`)
                                  }}>
                                    <EditIcon style={{ color: "yellow" }}/>
                                  </iconButton>
                                {/* </Link> */}
                            </ListItem>
                        )
                    })}
                </List>)
            }
        </Container>
        <Container>
            <div className='btn3'>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15, marginBottom: 15}} onClick={() => {
                Promise.all(
                  data.filter(e => e.complete).map(async ({ id }) => {
                    await fetch(`https://6322c389a624bced307e0f83.mockapi.io/todo/${id}`,{
                      method: 'DELETE',
                    })
                    // .then(async (res) => {
                    //   return res
                    // })
                    // .then(async (data) => {
                    //   return data.status
                    // })
                    }
                  )
                ).then((res) => {
                  setRefetchData(true);
                })
              }}>Delete Done Task</Button>
              <Button variant="contained" style={{ marginLeft: 10, marginTop: 15, marginBottom: 15}} onClick={() => deleteAll()}>Delete All</Button>
            </div>
          </Container>
        </>
      );
}

export default Home;
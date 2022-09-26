import React, { useEffect, useState} from 'react';
import { FormControl, Button, TextField, Card, CardContent, Typography, IconButton} from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import home from './Home';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const TodoForm = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState('');
    const [complete, setComplete] = useState(false);
    const [id, setId] = useState('');
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const params = useParams();

    // const data = {
    //     task: task,
    //     complete: false,
    //   };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://fake-api-coba.herokuapp.com/todos", {
            task: task,
            complete: false,
        }).then(navigate("/"));
      }

      useEffect(() => {
        if (params.id) {
            axios.get(`https://fake-api-coba.herokuapp.com/todos/${params.id}`).then((response) => {
                setTask(response.data.task)
            });
        }
      }, [params.id]);

      const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`https://fake-api-coba.herokuapp.com/todos/${params.id}`, {
            task: task,
            complete: complete,
        }).then(navigate("/"));
      }

    return(
        <div>
            <CssBaseline />
            <Container className='form' maxWidth="lg" >
                <h1>TodoInput</h1>
                {/* <form>
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
                    <Button onClick={(e) => handleSubmit(e)} variant="contained" type='submit'style={{marginTop: 10}}>Submit</Button>
                </form> */}
                <Box component="span" sx={{backgroundColor: '#2962ff', height: '100vh'}}>
                    <form>
                        <FormControl fullwidth={ true } >                    
                            <TextField required={ true } label='Input' value={task} onChange={(e) => setTask(e.target.value)}></TextField>                            
                            <Button onClick={ params.id? (e) => handleEdit(e) : (e) => handleSubmit(e) } variant="contained" type='submit'style={{marginTop: 10}}>Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default TodoForm
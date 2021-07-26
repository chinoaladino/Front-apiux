import React from 'react'
import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { updateTarea } from '../redux/TareaDucks';
const Edit = () => {

    const dispatch = useDispatch();

    const obj = useSelector(store => store.dialog.tarea);

    const [descripcion, setDescripcion] = React.useState('');

    const editarTarea = () => {
        if (descripcion.trim()) {
            dispatch(updateTarea({id: obj.id, descripcion: descripcion}))
        }
    }

    return (

        <Grid item xs={12} md={6} xl={6}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Tarea ID: {obj.id}
                    </Typography>
                    <TextField
                        variant='outlined'
                        label={obj.descripcion}
                        onChange={(e) =>  setDescripcion(e.target.value)}
                        style={{width: '70%'}}
                    />
                    <Button variant="contained" size="large" color="primary" style={{marginLeft: 10, height: 55}} onClick={() => editarTarea()}>
                        Editar
                    </Button>
                </CardContent>
            </Card>
        </Grid>

    )
}

export default Edit

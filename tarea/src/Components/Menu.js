import React from 'react'
import {
    Dialog,
    DialogActions,
    TextField,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog } from '../redux/OpenDucks'
import { addTarea } from '../redux/TareaDucks';
import Loading from './Loading';
import ItemList from './ItemList';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Menu = () => {

    const dispatch = useDispatch();

    const classes = useStyles();

    const cerrarDialog = () => {
        dispatch(closeDialog())
    }

    const [tareaText, setTareaText] = React.useState('')

    const [error, setError] = React.useState(null)


    const open = useSelector(store => store.dialog.abierto);
    const accion = useSelector(store => store.dialog.accion)
    const loading_tarea = useSelector(store => store.tareas.loading_tarea);
    const tareas = useSelector(store => store.tareas.tareas)
    const loading_add_tarea = useSelector(store => store.tareas.loading_add_tarea)

    const agregarTarea = async () => {
        if (tareaText.trim()) {
            if (tareaText.length < 6 || tareaText.length > 74) {
                setError('Verifique la cantidad de caracteres de la descripcion')
                return
            } else {
                setError(null)
                const descripcion = tareaText
                dispatch(addTarea(descripcion))
            }
        }
    }

    return (
        <Dialog open={open} onClose={cerrarDialog}>
            <DialogTitle>
                {
                    accion === 'AGREGAR' && <p>Ingresar tarea</p>

                }
                {
                    accion === 'REVISAR' && <p>Lista de tareas</p>
                }
            </DialogTitle>
            {
                accion === 'AGREGAR' &&
                (
                    <DialogContent>
                        <DialogContentText>
                            Ingrese el nombre de una tarea para su registro!
                                </DialogContentText>

                        {
                            !tareaText.trim() && (
                                <Alert variant="filled" severity="error" style={{ marginBottom: 10 }}>
                                    No puede dejar este campo vacio
                                </Alert>
                            )
                        }
                        {
                            error &&
                            (
                                <Alert variant="filled" severity="error" style={{ marginBottom: 10 }}>
                                    {
                                        error
                                    }
                                </Alert>
                            )
                        }
                        {
                            loading_add_tarea ? (
                                <Loading />
                            )
                                :
                                (
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label='Ingresar descripcion de la tarea'
                                        id="name"
                                        type="text"
                                        variant='outlined'
                                        onChange={(e) => setTareaText(e.target.value)}
                                        fullWidth
                                    />
                                )
                        }
                    </DialogContent>
                )
            }
            {
                accion === 'REVISAR' &&
                (
                    loading_tarea ? (
                        <Loading />
                    ) :

                        (
                            <List className={classes.root} style={{ overflow: 'auto' }} >
                                {
                                    tareas.map(tar => (
                                        <ItemList id={tar.id} descripcion={tar.descripcion} date={tar.fecha_creacion} vigencia={tar.vigencia} />
                                    ))
                                }
                            </List>
                        )
                )
            }
            <DialogActions>
                {
                    accion === 'AGREGAR' && (
                        <div>
                            <Button onClick={cerrarDialog}>
                                Cancel
                            </Button>
                            <Button onClick={() => agregarTarea()} color="primary">
                                Agregar
                            </Button>
                        </div>
                    )
                }
                {
                    accion === 'REVISAR' && (
                        <Button onClick={cerrarDialog}>
                            Cancel
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

export default Menu

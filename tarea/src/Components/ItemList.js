import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { green, red } from '@material-ui/core/colors';
import { Avatar, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { deleteTarea } from '../redux/TareaDucks';
import { openDialogEdit } from '../redux/OpenDucks';
import { closeDialog } from '../redux/OpenDucks'


const useStyles = makeStyles((theme) => ({
    grid: {
        width: '85%',
        marginLeft: 10
    },
    green: {
        marginTop: 10,
        color: '#fff',
        backgroundColor: green[500],
    },
    red: {
        marginTop: 10,
        color: '#fff',
        backgroundColor: red[500],
    },
    iconButtons: {
        marginTop: 10,
    }
}));



const ItemList = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const borrarTarea = (id) => {
        dispatch(deleteTarea(id))
    }

    const editarTarea = (obk) => {
        dispatch(openDialogEdit(obk))
        dispatch(closeDialog())

    }

    return (
        <ListItem key={props.id}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={2}>
                    <ListItemAvatar>
                        {
                            props.vigencia ? (
                                <Avatar className={classes.green}>
                                    <CheckIcon />
                                </Avatar>
                            )
                            :
                            (
                                <Avatar className={classes.red}>
                                    <CloseIcon />
                                </Avatar>
                            )
                        }
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={6}>
                    <ListItemText primary={props.descripcion} secondary={props.date} />
                </Grid>
                <Grid item xs={2} className={classes.iconButtons}>
                    <IconButton aria-label="delete" onClick={() => editarTarea({id: props.id, descripcion: props.descripcion, vigencia: props.vigencia})}>
                        <EditIcon fontSize="large" color="primary"/>
                    </IconButton>
                </Grid>
                <Grid item xs={2} className={classes.iconButtons}>
                    <IconButton aria-label="delete" onClick={() => borrarTarea(props.id)}>
                        <DeleteIcon fontSize="large" color="secondary" />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ItemList

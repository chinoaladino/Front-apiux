import {
  Paper,
  Grid,
  makeStyles,
  IconButton,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/AddCircleRounded';
import ListIcon from '@material-ui/icons/List';
import Menu from './Components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from './redux/OpenDucks'
import { getTareas } from "./redux/TareaDucks";
import Edit from './Components/Edit';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
    padding: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}))

function App() {


  const dispatch = useDispatch();

  const classes = useStyle();

  const abrirDialog = (action) => {
    if (action === 'REVISAR') {
      dispatch(getTareas());
    }
    dispatch(openDialog(action))
  }

  const edit = useSelector(store => store.dialog.open_edit);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={12}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography variant="h5" color="initial" style={{ marginTop: 20 }}>CRUD TAREAS</Typography>
              </Grid>
              <Grid item xs={2} style={{ alignItems: 'rigth', marginTop: 10 }}>
                <IconButton color="primary" variant="contained">
                  <AddIcon fontSize="large" style={{ color: green[500] }} onClick={() => abrirDialog('AGREGAR')} />
                </IconButton>
              </Grid>
              <Grid item xs={2} style={{ alignItems: 'rigth', marginTop: 10 }}>
                <IconButton color="primary" variant="contained">
                  <ListIcon fontSize="large" color='primary' onClick={() => abrirDialog('REVISAR')} />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {
            edit && (
             <Edit />
            )
          }
        </Grid>
        <Menu />
      </Grid>
    </div>
  );
}

export default App;

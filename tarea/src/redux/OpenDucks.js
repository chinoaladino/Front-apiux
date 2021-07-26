const dataInicial = {
    abierto: false,
    accion: '',
    open_edit: false,
    tarea: {}
}

const OPEN_DIALOG = 'OPEN_DIALOG';
const CERRAR_DIALOG = 'CLOSE_DIALOG';
const OPEN_DIALOG_EDIT = 'OPEN_DIALOG_EDIT';
const CLOSE_DIALOG_EDIT = 'CLOSE_DIALOG_EDIT';


export default function dialogReducer(state = dataInicial, action){
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                abierto: true,
                accion: action.payload
            }
        case CERRAR_DIALOG: 
            return {
                ...state,
                abierto: false,
                accion: ''
            } 
        case OPEN_DIALOG_EDIT:
            return {
                ...state,
                open_edit: true,
                tarea: action.payload
            }
        case CLOSE_DIALOG_EDIT: 
            return {
                ...state,
                open_edit: false,
                id: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const openDialog = (accion) => (dispatch) => {
    dispatch({
        type: OPEN_DIALOG,
        payload: accion
    })
}

export const closeDialog = () => (dispatch) => {
    dispatch({
        type: CERRAR_DIALOG
    })
}

export const openDialogEdit = (id) => (dispatch) => {
    dispatch({
        type: OPEN_DIALOG_EDIT,
        payload: id
    })
}

export const closeDialogEdit  = () => (dispatch) => {
    dispatch({
        type: CLOSE_DIALOG_EDIT
    })
}
import axios from 'axios'

const dataInicial = {
    loading_tarea: false,
    tareas: [],
    error: '',
    loading_add_tarea: false
}

const FETCH_TAREAS = 'FETCH_TAREAS';
const FETCH_TAREA_SUCCES = 'FETCH_TAREA_SUCCES';
const FETCH_TAREA_ERROR = 'FETCH_TAREA_ERROR';
const DELETE_TAREA = 'DELETE_TAREA';
const ADD_TAREA = 'ADD_TAREA';
const ADD_TAREA_LOAD = 'ADD_TAREA_LOAD';

export default function tareaReducer(state = dataInicial, action){
    switch (action.type) {
        case FETCH_TAREAS:
            return {
                ...state,
                loading_tarea: true
            }
        case FETCH_TAREA_SUCCES:
            return {
                tareas: action.payload,
                loading_tarea: false,
                error: ''
            }
        case FETCH_TAREA_ERROR: 
            return {
                loading_tarea: false,
                tareas: [],
                error: action.payload
            }
        case DELETE_TAREA: 
            return {
                ...state
                }
        case ADD_TAREA: {
            return {
                ...state,
                loading_add_tarea: true
            }
        }
        case ADD_TAREA_LOAD: {
            return {
                ...state,
                loading_add_tarea: false
            }
        }
        default: return { ...state}
    }
}
  
export const getTareas = () => async (dispatch) => {
    dispatch({
        type: FETCH_TAREAS
    })
    try {
        const res = await axios.get('https://aladino-teares-api-spring.herokuapp.com/tarea/all');
        dispatch({
            type: FETCH_TAREA_SUCCES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: FETCH_TAREA_ERROR,
            payload: error
        })
    }
}

export const deleteTarea =  (id) => async (dispatch, getState) => {
    dispatch({
        type: FETCH_TAREAS
    })
    try {
        const res = await axios.delete(`https://aladino-teares-api-spring.herokuapp.com/tarea/delete/${id}`);
        if (res.data === true) {
            const arrayTareas = getState().tareas.tareas;
            const filtrados = arrayTareas.filter(item => item.id !== id)
            dispatch({
                type: FETCH_TAREA_SUCCES,
                payload: filtrados
            })
        }
    } catch (error) {
        dispatch({
            type: FETCH_TAREA_ERROR,
            payload: error
        })
    }
}

export const addTarea = (descripcion) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TAREA
    })
    try {
        const res = await axios.post(`https://aladino-teares-api-spring.herokuapp.com/tarea/create?descripcion=${descripcion}`)
        if (res.data) {
            dispatch({
                type: ADD_TAREA_LOAD
            })
        }
    } catch (error) {
        dispatch({
            type: FETCH_TAREA_ERROR,
            payload: error
        })
    }
}

export const updateTarea = (obj) => async (dispatch, getState) => {
    try {
        console.log({descripcion: obj.descripcion})
        const res = await axios({
            method: 'put',
            url: `https://aladino-teares-api-spring.herokuapp.com/tarea/update/${obj.id}`,
            data: {
                descripcion: obj.descripcion
            }
        })
        console.log(res)
    } catch (error) {
        dispatch({
            type: FETCH_TAREA_ERROR,
            payload: error
        })
    }
}
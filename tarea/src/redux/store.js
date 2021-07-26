import {createStore,combineReducers, compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import tareaReducer from './TareaDucks'
import dialogReducer from './OpenDucks'

const rootReducer = combineReducers({
    tareas: tareaReducer,
    dialog: dialogReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}
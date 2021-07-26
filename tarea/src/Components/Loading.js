import {CircularProgress} from '@material-ui/core'

const Loading = () => {
    return (
        <div style={{
            margin: 0,
            position: 'relative',
            left: '40%',
            }}>
            <CircularProgress />
          </div>  
    )
}

export default Loading

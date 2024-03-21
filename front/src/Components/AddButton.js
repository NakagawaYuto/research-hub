import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
    return (
        <>
            <IconButton
                edge='start'
                aria-label='menu'
                style={{
                    background: '#007bff',
                    borderRadius: '50',
                    position: 'fixed',
                    bottom: 50,
                    left: '52%',
                    boxShadow: '3px 3px 3px rgba(0,0,0,0.3)',
                }}
                onClick={() => { onClick() }}
            >
                <AddIcon
                    fontSize='large'
                    style={{
                        color: '#eceff1',
                        width: 50,
                        height: 50
                    }}
                />
            </IconButton>
        </>
    )
}

export default AddButton;

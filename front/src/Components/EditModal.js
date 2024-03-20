import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const EditModal = ({ open, onClose, title, value, onChange, onSave, multiline = false, rows = 1, placeholder }) => (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby={`${title}-modal-title`}
        aria-describedby={`${title}-modal-description`}
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        }}>
            <Typography id={`${title}-modal-title`} variant="h5" component="h2">
                {title}
            </Typography>
            <TextField
                fullWidth
                multiline={multiline}
                rows={rows}
                variant='outlined'
                placeholder={placeholder || `${title.toLowerCase()}を入力してください。`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx={{ mt: 2 }}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={onSave}
                sx={{
                    mt: 2,
                    display: 'block',
                    mx: 'auto',
                }}
            >
                保存
            </Button>
        </Box>
    </Modal>
);

export default EditModal;

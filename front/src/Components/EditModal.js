import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const EditModal = ({ open, onClose, title, value, onChange, onSave, multiline = false, rows = 1 }) => (
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
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            <Typography id={`${title}-modal-title`} variant="h6" component="h2">
                {title}
            </Typography>
            <TextField
                fullWidth
                multiline={multiline}
                rows={rows}
                variant='outlined'
                placeholder={`Please enter ${title.toLowerCase()}.`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx={{ mt: 2 }}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={onSave}
                sx={{ mt: 2 }}
            >
                保存
            </Button>
        </Box>
    </Modal>
);

export default EditModal;

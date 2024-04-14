import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import TodoDatePicker from '../components/TodoDatePicker';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  setOpen,
  title,
  setTitle,
  deadline,
  setDeadline,
  addBlog,
}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: '45%', // 幅を45%に設定する
            maxWidth: 'none' // 最大幅を無効にする
          }
        }}
      >
        <DialogTitle>{"作業の追加"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            追加する作業を入力してください．
          </DialogContentText>
        </DialogContent>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="outlined-multiline-flexible"
            label="追加する作業"
            multiline
            maxRows={4}
            value={title}
            style={{ 
              marginBottom: 20, 
              fontFamily: 'Meiryo',
              flex: 1 // 高さを均等に分割する
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          
          <TodoDatePicker 
            setDeadline={setDeadline}
            style={{ flex: 1 }} // 高さを均等に分割する
          />
          <div style={{ marginBottom: 20 }} />
          <Button 
            variant="contained" 
            onClick={addBlog}
            style={{
              width: 100,
              color: "#e0f2f1",
              fontSize: 25,
              fontFamily: 'serif',
              background: '#1976d2',
              padding: 3,
              borderRadius: 5,
            
            
            }}
            size="large"
          >追加</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
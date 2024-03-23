import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    
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

  // delTargetが変更されたら，dialogを開く.
 

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
            width: '45%', // 幅を80%に設定する
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
        <DialogContent>
        <TextField
            id="outlined-multiline-flexible"
            label="追加する作業"
            multiline
            maxRows={4}
            value={title}
            style={{ 
              margin: 20, 
              fontFamily: 'Meiryo',
              width: '40vw',
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          
        
          <TextField
            id="outlined-multiline-flexible"
            label="期限(YYYY-MM-DD)"
            multiline
            maxRows={4}
            value={deadline}
            style={{ 
              margin: 20, 
              fontFamily: 'Meiryo',
              width: '40vw',
            }}
            onChange={(e)=>{setDeadline(e.target.value)}}
          />
        
        
          <Button 
            variant="contained" 
            onClick={() => {
              addBlog();
            }}
            style={{
              width: 100,
              color: "#e0f2f1",
              fontSize: 25,
              fontFamily: 'serif',
              background: '#1976d2',
              padding: 3,
              borderRadius: 5,
              boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            }}
            size="large"
          >追加</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
            handleClose()
          }}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
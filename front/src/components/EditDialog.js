import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    editTarget, 
    setEditTarget,
   
  }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditTarget(null);
  };

  // delTargetが変更されたら，dialogを開く.
  React.useEffect(() => {
    if (editTarget !== null){
      setOpen(true);
    }
  }, [editTarget])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"編集"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            投稿を削除しようとしています．本当に消しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
            
            handleClose()
          }}>完了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
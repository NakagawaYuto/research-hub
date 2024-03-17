import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DetailLogCards from '../components/DetailLogCards';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    Target, 
    setTarget,
    details,
   
  }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setTarget(null);
  };

  // delTargetが変更されたら，dialogを開く.
  React.useEffect(() => {
    if (Target !== null){
      setOpen(true);
    }
  }, [Target])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle fontFamily='Meiryo'>{"詳細"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" fontFamily='Meiryo'>
            Todoの詳細を表示しています
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DetailLogCards
            Detail={details}
            id={Target}
          />
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
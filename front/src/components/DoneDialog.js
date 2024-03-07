import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const baseURL = "http://127.0.0.1:8080/todo/"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    doneTarget, 
    setDoneTarget,
    setBlogs,
    
  }) {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    // setDoneTarget(null);
  };
  const doneTodo= async(Target) =>{
    
    axios.get(baseURL+String(Target)+'/').then((response) => {
      setDone(response.data);
     });
     
    
    console.log(baseURL+String(Target)+'/');
    await axios.put(baseURL+String(Target)+'/', {
      id:done.id,
      title:String(done.title),
      deadline: String(done.deadline),
      done: true,
    })
    .then(() => {
      axios.get(baseURL).then((response) => {
        setBlogs(response.data);
        });
    })
  }

  // delTargetが変更されたら，dialogを開く.
  React.useEffect(() => {
    if (doneTarget !== null){
      setOpen(true);
    }
  }, [doneTarget])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"作業の完了"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            完了しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
            doneTodo(doneTarget);
            handleClose()
          }}>完了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
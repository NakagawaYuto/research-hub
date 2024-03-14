import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useParams} from 'react-router-dom';
const baseURL = "http://127.0.0.1:8080/todo/todo/"
const detailURL = "http://127.0.0.1:8080/todo/detail/"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    doneTarget, 
    // setDoneTarget,
    setDetails,
    id,
    
  }) {
  const [open, setOpen] = React.useState(false);
  const {user_id} = useParams();
  // const [done, setDone] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    // setDoneTarget(null);
  };
  const doneTodo= async(Target) =>{
    let todo = null;
    
    await axios.get(`${detailURL}`+String(Target)+'/').then((response) => {
      console.log(response.data);
      todo = response.data;
      // setDone(response.data);
    });
     
    
    await axios.put(`${detailURL}`+String(Target)+'/', {
      id:todo.id,
      detail_title:String(todo.detail_title),
      detail_deadline: String(todo.detail_deadline),
      done: true,
      department:id,
    })
    .then(() => {
      axios.get(`${detailURL}`).then((response) => {
        setDetails(response.data);
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
import * as React from 'react';
import createAxiosInstance from '../createAxiosInstance';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useParams} from 'react-router-dom';
const baseURL = "todo/todo/"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    doneTarget, 
   
    setBlogs,
    
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
    const ax = createAxiosInstance();
    await ax.get(`${baseURL}`+String(Target)+'/').then((response) => {
      console.log(response.data);
      todo = response.data;
      // setDone(response.data);
    });
     
    
    await ax.put(`${baseURL}`+String(Target)+'/', {
      id:todo.id,
      title:String(todo.title),
      deadline: String(todo.deadline),
      done: true,
      user: user_id,
    })
    .then(() => {
      ax.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
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
        PaperProps={{
          sx: {
            width: '500px' // 幅を変更する
          }}}
      >
        <DialogTitle>{"作業の完了"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            この作業を完了しますか？
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
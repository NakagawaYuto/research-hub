import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {useParams} from 'react-router-dom';



const baseURL = "http://127.0.0.1:8080/todo/todo/"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    editTarget, 
    setEditTarget,
    setBlogs,
  
   
  }) {
 
  const [open, setOpen] = React.useState(false);
  const [edited_title, setEditedTitle] = React.useState();
  const [edited_deadline, setEditedDeadline] = React.useState();
  const {user_id}=useParams()

  const handleClose = () => {
    setOpen(false);
    setEditTarget(null);
  };
  const editBlog = async (editTarget) => {
    const titleOk = edited_title.length !== 0;
    const deadlineOk = edited_deadline.length == 10;
    
    if (titleOk && deadlineOk) {
      console.log(`${baseURL}`+String(editTarget)+'/');
      await axios.put(`${baseURL}`+String(editTarget)+'/', {
        title: String(edited_title),
        deadline: String(edited_deadline),
        user: user_id,
      })
      .then(() => {
        setEditedTitle('');
        setEditedDeadline('');
        axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
          setBlogs(response.data);
         }); 
      })
    }
  }

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
        PaperProps={{
          sx: {
            width: '45%', // 幅を80%に設定する
            maxWidth: 'none' // 最大幅を無効にする
          }
        }}
      >
        <DialogTitle>{"編集"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Todoの編集
          </DialogContentText>
        </DialogContent>





        
    
        




        <DialogContent>
        <Grid item>
          <TextField
            id="alert-dialog-slide-description"
            label="追加する作業"
            multiline
            maxRows={4}
            value={edited_title}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '40vw',
            }}
            onChange={(e)=>{setEditedTitle(e.target.value)}}
          />
          </Grid>
        
          <TextField
            id="alert-dialog-slide-description"
            label="期限(YYYY-MM-DD)"
            multiline
            maxRows={4}
            value={edited_deadline}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '40vw',
            }}
            onChange={(e)=>{setEditedDeadline(e.target.value)}}
          />
          </DialogContent>
          <DialogActions>


          <Button onClick={()=> {
            editBlog(editTarget);
            
            handleClose()
          }}>完了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
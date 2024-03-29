import * as React from 'react';
import axios from "axios";

// 外部コンポーネント
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

// 自作コンポーネント
import BlogCards from '../components/BlogCards';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import BlogCardsEdit from '../components/BlogCardsEdit';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';
import EditDialog from '../components/EditDialog';
import DoneButton from '../components/Donebutton';
import DoneDialog from '../components/DoneDialog';
import CustomTabPanel from '../components/Todotab';
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import AddDialog from '../components/AddDialog';

// import BlogEditButton from '../components/BlogEditButton';




const Home = () => {
  // ページ内で値を保持するために使う.
  const [blogs, setBlogs] = React.useState(null);
  const [details, setDetails] = React.useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [deadline, setDeadline] = React.useState('');

  const [delTarget, setDelTarget] = React.useState(null);
  const [Target, setTarget] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);
  const [doneTarget, setDoneTarget] = React.useState(null);
  const [open, setOpen] = React.useState(false);
 

  
 
  const [done, setDone] = React.useState(null);
  const details_for_this_blog = []
  const {user_id}=useParams();
  const baseURL = "http://127.0.0.1:8080/todo/todo/"
  const detailURL = "http://127.0.0.1:8080/todo/detail/"
 

 
  const pageStyle = {
    backgroundColor: '#f5f5f5', // 薄いグレー
    minHeight: '100vh', // 画面全体の高さに背景を広げる
  };
 




  // 初回ロード時の処理を記述する.
  React.useEffect(() => 
    {
     
      axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
        setBlogs(response.data);
       });
      axios.get(`${detailURL}`+"?user="+String(user_id)).then((response) => {
        console.log("GETのレスポンスのデータ (ここにデータはある): ", response.data);
        setDetails(response.data);
        console.log("setDetail直後のdetails (まだデータが入ってない, setは速度遅め) : ", details);
      });
    
    
    
      
    }, []);
  if (!blogs) return null;
  if (!details) return null;
  if (details !== null){
    for (let i = 0; i < details.length; i++) {
      if(details[i].department === blogs.id){
        details_for_this_blog.push(details[i])
      }
    }
  }
  else{
    console.log("details null!  ここの実行が早い.");
  }
 
  




  
  
  const addBlog = async () => {
    const titleOk = title.length !== 0;
    const deadlineOk = deadline.length == 10;
   
    if (titleOk && deadlineOk) {
      await axios.post(`${baseURL}`+"?user="+String(user_id), {
        title: String(title),
        deadline: String(deadline),
        user: user_id,
        
      })
      .then(() => {
        setTitle('');
        setDeadline('');
        axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
          setBlogs(response.data);
         });
        
      })
    }
  }





  const deleteBlog = (id) => {
    console.log(`${baseURL}`+String(id)+'/');
    axios.delete(`${baseURL}`+String(id)+'/')
    .then(() => {
      setBlogs([]);
      axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
        setBlogs(response.data);
      });
    })
  }





  





  
  
  return (
    <div style={pageStyle}>
      <Header />
      
      <Grid item xs={3}>
          <IconButton onClick={() => navigate(`/user/${user_id}/`)} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
            <ArrowBackIosIcon />
            <Typography>
              戻る
            </Typography>
          </IconButton>
        </Grid>
    
     
    <Box sx={{ flexGrow: 1 }}>

      {/* <Grid container alignItems='center' justify='center' direction="column">
       
          <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'serif' }}>
            Todolist
          </Typography>
      </Grid> */}
      

      {/* <BlogCards 
        Blogs={blogs}
        Target={setTarget}
      /> */}

      {/* <BlogEditButton/> */}

    </Box>
    



    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container alignItems='center' justify='center' direction="column">
       
          {/* <Typography 
            variant="h4" 
            style={{ 
              margin: 20, 
              fontFamily:'serif' 
            }}
          >
            Todoの追加
          </Typography> */}
        
        
        
          {/* <TextField
            id="outlined-multiline-flexible"
            label="追加する作業"
            multiline
            maxRows={4}
            value={title}
            style={{ 
              margin: 20, 
              fontFamily: 'Meiryo',
              width: '50vw',
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
          /> */}
          
        
          {/* <TextField
            id="outlined-multiline-flexible"
            label="期限(YYYY-MM-DD)"
            multiline
            maxRows={4}
            value={deadline}
            style={{ 
              margin: 20, 
              fontFamily: 'Meiryo',
              width: '50vw',
            }}
            onChange={(e)=>{setDeadline(e.target.value)}}
          /> */}
        
        
          {/* <Button 
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
          >追加</Button> */}
        </Grid>
        
       
      
      </Box>
      

     <Grid container justifyContent="flex-end" >
      <Grid item>     
        <DeleteButton 
          Target={Target}
          delTarget={setDelTarget}
        />
        <EditButton 
          Target={Target}
          editTarget={setEditTarget}
          
        
        />
        <DoneButton 
          Target={Target}
          doneTarget={setDoneTarget}
        />

        <AddButton 
          setOpen={setOpen}
        />

      </Grid>
    </Grid>    
      <AddDialog 
        open={open}
        setOpen = {setOpen}
        title = {title}
        setTitle = {setTitle}
        deadline = {deadline}
        setDeadline = {setDeadline}
        addBlog ={addBlog}
      />
      <DeleteConfirmDialog 
        delTarget={delTarget}
        setDelTarget={setDelTarget}
        deleteBlog={deleteBlog}
      />
      <EditDialog 
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        setBlogs={setBlogs}
      />
      <DoneDialog 
        doneTarget={doneTarget}
        // setDoneTarget={setDoneTarget}
        setBlogs={setBlogs}
        // deleteBlog={deleteBlog}
       
      />
      <CustomTabPanel
        todo={blogs} 
        details={details} 
        setDetails={setDetails}
        Target={setTarget}
        setBlogs={setBlogs}
      /> 
    <Grid container justifyContent="flex-end">
      <Grid item>
      
      <Button 
          variant="contained" 
          onClick={() => {
            navigate(`/user/${user_id}/log/`);
          }}
          style={{
            width: 100,
            color: "#e0f2f1",
            fontSize: 25,
            fontFamily:'serif',
            background: '#115293',
            padding: 3,
            borderRadius: 5,
            boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            marginRight: 20            
          }}
          size="large"
      >ログ</Button>
      </Grid>
    </Grid>





      



    </div>
  );
};


export default Home;
import * as React from 'react';
import axios from "axios";

// 外部コンポーネント
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';

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

// import BlogEditButton from '../components/BlogEditButton';


const baseURL = "http://127.0.0.1:8080/todo/todo/"
const detailURL = "http://127.0.0.1:8080/todo/detail/"


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

  
 
  const [done, setDone] = React.useState(null);
  const details_for_this_blog = []
 

  const {user_id}=useParams();
 




  // 初回ロード時の処理を記述する.
  React.useEffect(() => 
    {
     
      axios.get(`${baseURL}`).then((response) => {
        setBlogs(response.data);
       });
      axios.get(`${detailURL}`).then((response) => {
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
      await axios.post(`${baseURL}`, {
        title: String(title),
        deadline: String(deadline),
        user: user_id,
        
      })
      .then(() => {
        setTitle('');
        setDeadline('');
        axios.get(`${baseURL}`).then((response) => {
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
      axios.get(`${baseURL}`).then((response) => {
        setBlogs(response.data);
      });
    })
  }





  





  
  
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>

      <Grid container alignItems='center' justify='center' direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'serif' }}>
            Todolist
          </Typography>
        </Grid>
        
      </Grid>
      

      <BlogCards 
        Blogs={blogs}
        Target={setTarget}
      />

      {/* <BlogEditButton/> */}

    </Box>
    



    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container alignItems='center' justify='center' direction="column">
        <Grid item>
          <Typography 
            variant="h4" 
            style={{ 
              margin: 20, 
              fontFamily:'serif' 
            }}
          >
            Todoの追加
          </Typography>
        </Grid>
        <Grid item>
        <Grid item>
          <TextField
            id="outlined-multiline-flexible"
            label="追加する作業"
            multiline
            maxRows={4}
            value={title}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '50vw',
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          </Grid>
        
          <TextField
            id="outlined-multiline-flexible"
            label="期限(YYYY-MM-DD)"
            multiline
            maxRows={4}
            value={deadline}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '50vw',
            }}
            onChange={(e)=>{setDeadline(e.target.value)}}
          />
        </Grid>
        
        
      
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
              background: "#3c3c3c",
              padding: 3,
              borderRadius: 5,
              boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            }}
            size="large"
          >追加</Button>
        </Grid>
        
       
      
      </Box>


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
      <Button 
            variant="contained" 
            onClick={() => {
              navigate(`/user/${user_id}/log/`);
            }}
            style={{
              width: 100,
              color: "#e0f2f1",
              fontSize: 25,
              fontFamily: 'serif',
              background: "#3c3c3c",
              padding: 3,
              borderRadius: 5,
              boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            }}
            size="large"
          >ログ</Button>





    
      
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
        blogs={blogs} 
        details={details} 
        setDetails={setDetails}
        Target={setTarget}
      /> 
   





      



    </>
  );
};


export default Home;
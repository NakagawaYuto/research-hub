import * as React from 'react';
import axios from "axios";

// 外部コンポーネント
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

// 自作コンポーネント
import BlogCards from '../components/BlogCards';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import BlogCardsEdit from '../components/BlogCardsEdit';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';
import EditDialog from '../components/EditDialog';

// import BlogEditButton from '../components/BlogEditButton';


const baseURL = "http://127.0.0.1:8080/todo/"



const Home = () => {
  // ページ内で値を保持するために使う.
  const [blogs, setBlogs] = React.useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [deadline, setDeadline] = React.useState('');

  const [delTarget, setDelTarget] = React.useState(null);
  const [Target, setTarget] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);

 




  // 初回ロード時の処理を記述する.
  React.useEffect(() => 
    {
      
      axios.get(baseURL).then((response) => {
        setBlogs(response.data);
       });
      
    }, []);
  if (!blogs) return null;




  
  
  const addBlog = async () => {
    const titleOk = title.length !== 0;
    const deadlineOk = deadline.length == 10;
   
    if (titleOk && deadlineOk) {
      await axios.post(baseURL, {
        title: String(title),
        deadline: String(deadline),
        
        
      })
      .then(() => {
        setTitle('');
        setDeadline('');
        axios.get(baseURL).then((response) => {
          setBlogs(response.data);
         });
        
      })
    }
  }





  const deleteBlog = (id) => {
    console.log(baseURL+String(id)+'/');
    axios.delete(baseURL+String(id)+'/')
    .then(() => {
      setBlogs([]);
      axios.get(baseURL).then((response) => {
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
        <Grid item>
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





    
      
      <DeleteConfirmDialog 
        delTarget={delTarget}
        setDelTarget={setDelTarget}
        deleteBlog={deleteBlog}
      />
      <EditDialog 
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        
      />





      



    </>
  );
};


export default Home;
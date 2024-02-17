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
// import BlogEditButton from '../components/BlogEditButton';


const baseURL = "http://127.0.0.1:8080/todo/"



const Home = () => {
  // ページ内で値を保持するために使う.
  const [blogs, setBlogs] = React.useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');




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
   
    if (titleOk) {
      await axios.post(baseURL, {
        title: String(title),
        deadline:'2024-02-17',
        
      })
      .then(() => {
        setTitle('');
        navigate('/edit');
      })
    }
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
        <Grid item>
          <Typography variant="subtitle1" style={{ marginBottom: 15, fontFamily:'serif' }} >
            好きな本について紹介する掲示板です。
          </Typography>
        </Grid>
      </Grid>

      <BlogCards Blogs={blogs}></BlogCards>

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
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '50vw',
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
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
    



    </>
  );
};


export default Home;
import * as React from 'react';
import axios from "axios";

// 外部コンポーネント
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// 自作コンポーネント
import BlogCards from '../Components/BlogCards';


const baseURL = "http://127.0.0.1:8080/trouble/"

const Home = () => {
    // ページ内で値を保持するために使う.
    const [blogs, setBlogs] = React.useState(null);
  
    // 初回ロード時の処理を記述する.
    React.useEffect(() => 
      {
  
        axios.get(baseURL).then((response) => {
          setBlogs(response.data);
         });
  
      }, []);
    if (!blogs) return null;
  
    return (
      <>
      <Box sx={{ flexGrow: 1 }}>
  
        <Grid container alignItems='center' justify='center' direction="column">
          <Grid item>
            <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'serif' }}>
              悩み投稿
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" style={{ marginBottom: 15, fontFamily:'serif' }} >
              研究における悩みや課題を投稿するページです。
            </Typography>
          </Grid>
        </Grid>
  
        <BlogCards Blogs={blogs}></BlogCards>
  
        {/* <BlogEditButton/> */}
  
      </Box>
      </>
    );
  };
  
  
  export default Home;
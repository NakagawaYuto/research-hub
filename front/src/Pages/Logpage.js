import * as React from 'react';
import axios from "axios";
import LogCards from '../components/LogCards';
import DetailDialog from '../components/DetailDialog';
import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const Logpage = () => {
  const [blogs, setBlogs] = React.useState(null);
  const [Target, setTarget] = React.useState(null);
  const [details, setDetails] = React.useState(null);
  const navigate = useNavigate();

  const pageStyle = {
    backgroundColor: '#f5f5f5', // 薄いグレー
    minHeight: '100vh', // 画面全体の高さに背景を広げる
  };
 
  const {user_id}=useParams();
  const baseURL = "http://127.0.0.1:8080/todo/todo/"
  // const detailURL = "http://127.0.0.1:8080/todo/detail/?user=" + String(user_id)
  React.useEffect(() => 
  {
    
    axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
      setBlogs(response.data);
     });
    
    
  }, []);
if (!blogs) return null;


  
  

    return (
      <div style={pageStyle}>
        <Header />
        <Grid item xs={3}>
          <IconButton onClick={() => navigate(`/user/${user_id}/todo/`)} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
            <ArrowBackIosIcon />
            <Typography>
              戻る
            </Typography>
          </IconButton>
        </Grid>
        <Grid container alignItems='center' justify='center' direction="column">
        
          <Typography variant="h3" gutterBottom style={{ margin: 20, fontFamily:'Serif' }}>
            Logpage
          </Typography>
        </Grid>
        
      
      
     < LogCards 
        Blogs={blogs}
        Target={setTarget}
       
      />
      <DetailDialog 
        Target={Target}
        setTarget={setTarget}
        details={details}
       
      />
     
    
      </div>
      
      
        
     
      
    );
  };
  
  
  export default Logpage;
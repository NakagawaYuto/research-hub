import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import DetailCards from './DetailCards';
import DeleteButton from '../components/DeleteButton';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import EditButton from '../components/EditButton';
import EditDetailDialog from '../components/EditDetailDialog';
import DoneButton from '../components/Donebutton';
import DoneDetailDialog from '../components/DoneDetailDialog';
import AddDetailDialog from '../components/AddDetailDialog';
import AddDetailButton from '../components/AddDetailButton';
import { useParams } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8080/todo/todo/"
const detailURL = "http://127.0.0.1:8080/todo/detail/"







function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export default function BasicTabs ({todo,details,setDetails,Target,setBlogs}) {
  
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [detailTarget, setDetailTarget] = React.useState(null);
  const [deadline, setDeadline] = React.useState('');
  const [delTarget, setDelTarget] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);
  const [doneTarget, setDoneTarget] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  
  const {user_id}=useParams();

  const blogs = todo.filter(evaluation => evaluation.done === false);

  React.useEffect(() => {
    // コンポーネントがマウントされたときとblogsの状態が変更されたときに、選択されたタブのIDをTargetに渡す
    Target(blogs[value]?.id); // valueが範囲外の場合に備えて?.演算子を使用して安全にアクセス
  }, [blogs, value, Target]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    console.log(blogs);
    console.log(blogs[newValue]);
    console.log(blogs[newValue].id);
    Target(blogs[newValue].id);
    axios.get(`${baseURL}`+"?user="+String(user_id)).then((response) => {
      setBlogs(response.data); // blogsを更新
    });
    
  };
  
  const adddetail = async (id) => {
    const titleOk = title.length !== 0;
    const deadlineOk = deadline.length == 10;
   
    if (titleOk && deadlineOk) {
      await axios.post(`${detailURL}`+"?user="+String(user_id), {
        detail_title: String(title),
        detail_deadline: String(deadline),
        department: id,
        
      })
      .then(() => {
        setTitle('');
        setDeadline('');
        axios.get(`${detailURL}`+"?user="+String(user_id)).then((response) => {
          setDetails(response.data);
         });
        
      })
    }
  }
  const deletedetail = (id) => {
    console.log(`${detailURL}`+String(id)+'/');
    axios.delete(`${detailURL}`+String(id)+'/')
    .then(() => {
      setDetails([]);
      axios.get(`${detailURL}`+"?user="+String(user_id)).then((response) => {
        setDetails(response.data);
      });
    })
  }
 
    


  const tabs = [];
  const id = [];


  console.log(blogs)
  console.log(blogs.length)
  for (let i = 0; i < blogs.length; i++){
    
    if(blogs[i].done==false){
    tabs[i]=String(blogs[i].title)
    
    }
    id[i]=blogs[i].id
    
  }
  
  
  
  const generateTabs = () => {
    return tabs.map((tab, index) => (
      <Tab label={tab} {...a11yProps(index)} key={index} />
    ));
  };
  
  
  const generateTabPanels = () => {
   
    
  
    return id.map((id, index) => (
      <CustomTabPanel value={value} index={index}>
       
        <DetailCards 
        Details={details}
        id={id}
        detailTarget={setDetailTarget}
       />
       <Grid container alignItems='center' justify='center' direction="column">
        
          {/* <Typography 
            variant="h4" 
            style={{ 
              margin: 20, 
              fontFamily:'serif' 
            }}
          >
            詳細の追加
          </Typography> */}
        
        
        
          {/* <TextField
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
          /> */}
          
        
          {/* <TextField
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
          /> */}
        </Grid>
      

        
      <Grid>
        {/* <Button 
            variant="contained" 
            onClick={() => {
              adddetail(id);
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
          <Grid container justifyContent="flex-end">
          <Grid item>
          <DeleteButton 
          Target={detailTarget}
          delTarget={setDelTarget}
          />
          <EditButton 
          Target={detailTarget}
          editTarget={setEditTarget}
          />
          <DoneButton 
          Target={detailTarget}
          doneTarget={setDoneTarget}
     
          />
          <AddDetailButton 
          setOpen={setOpen}
          />
          </Grid>
          </Grid>
          <DeleteConfirmDialog 
          delTarget={delTarget}
          setDelTarget={setDelTarget}
          deleteBlog={deletedetail}
          />
          
      <EditDetailDialog 
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        setDetails={setDetails}
        id={id}
      />
      
      <DoneDetailDialog 
        doneTarget={doneTarget}
        // setDoneTarget={setDoneTarget}
        setDetails={setDetails}
        // deleteBlog={deletedetail}
        id={id}
       
      />
      
      <AddDetailDialog 
        open={open}
        setOpen = {setOpen}
        title = {title}
        setTitle = {setTitle}
        deadline = {deadline}
        setDeadline = {setDeadline}
        adddetail ={adddetail}
        id={id}
      />
      </Grid>
       
      </CustomTabPanel>
    ));
  };
  
  

  return (
   
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
      

      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {generateTabs()}
      </Tabs>
      </Box>
    
     
       {generateTabPanels()}
       
      
    
    </Box>
  );
}
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




export default function BasicTabs ({blogs,details,setDetails,Target}) {
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [detailTarget, setDetailTarget] = React.useState(null);
  const [deadline, setDeadline] = React.useState('');
  const [delTarget, setDelTarget] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);
  const [doneTarget, setDoneTarget] = React.useState(null);
  const {user_id}=useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Target(event);
    console.log("実行");
  };
  
  const adddetail = async (id) => {
    const titleOk = title.length !== 0;
    const deadlineOk = deadline.length == 10;
   
    if (titleOk && deadlineOk) {
      await axios.post(`${detailURL}`, {
        detail_title: String(title),
        detail_deadline: String(deadline),
        department: id,
        
      })
      .then(() => {
        setTitle('');
        setDeadline('');
        axios.get(`${detailURL}`).then((response) => {
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
      axios.get(`${detailURL}`).then((response) => {
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
        Item{index}
        <DetailCards 
        Details={details}
        id={id}
        detailTarget={setDetailTarget}
       />
       <Grid container alignItems='center' justify='center' direction="column">
        <Grid item>
          <Typography 
            variant="h4" 
            style={{ 
              margin: 20, 
              fontFamily:'serif' 
            }}
          >
            詳細の追加
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
        </Grid>
        <Button 
            variant="contained" 
            onClick={() => {
              adddetail(id);
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
        <DeleteButton 
        Target={detailTarget}
        delTarget={setDelTarget}
        />
        <DeleteConfirmDialog 
        delTarget={delTarget}
        setDelTarget={setDelTarget}
        deleteBlog={deletedetail}
      />
      <EditButton 
        Target={detailTarget}
        editTarget={setEditTarget}
        
       
      />
      <EditDetailDialog 
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        setDetails={setDetails}
        id={id}
      />
      <DoneButton 
        Target={detailTarget}
        doneTarget={setDoneTarget}
     
      
      />
      <DoneDetailDialog 
        doneTarget={doneTarget}
        // setDoneTarget={setDoneTarget}
        setDetails={setDetails}
        // deleteBlog={deletedetail}
        id={id}
       
      />
       
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
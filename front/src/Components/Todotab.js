import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import DetailCards from './DetailCards';

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




export default function BasicTabs ({blogs,details}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
    


  const tabs = [];
  const id = [];


  console.log(blogs)
  console.log(blogs.length)
  for (let i = 0; i < blogs.length; i++){
    
    
    tabs[i]=String(blogs[i].title)
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
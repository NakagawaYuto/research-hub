import * as React from 'react';
import axios from "axios";
import LogCards from '../components/LogCards';

import {useParams} from 'react-router-dom';

const baseURL = "http://127.0.0.1:8080/todo/todo/"

const Logpage = () => {
  const [blogs, setBlogs] = React.useState(null);
  const {user_id}=useParams();
  React.useEffect(() => 
  {
    
    axios.get(`${baseURL}`).then((response) => {
      setBlogs(response.data);
     });
    
  }, []);
if (!blogs) return null;

  
  

    return (
      <>
      <h1>Log</h1>
     < LogCards 
        Blogs={blogs}
       
      />
     
    
      </>
      
      
        
     
      
    );
  };
  
  
  export default Logpage;
import * as React from 'react';
import axios from "axios";
import LogCards from '../components/LogCards';
import DetailDialog from '../components/DetailDialog';

import {useParams} from 'react-router-dom';

const baseURL = "http://127.0.0.1:8080/todo/todo/"
const detailURL = "http://127.0.0.1:8080/todo/detail/"

const Logpage = () => {
  const [blogs, setBlogs] = React.useState(null);
  const [Target, setTarget] = React.useState(null);
  const [details, setDetails] = React.useState(null);
 
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
        Target={setTarget}
       
      />
      <DetailDialog 
        Target={Target}
        setTarget={setTarget}
        details={details}
       
      />
     
    
      </>
      
      
        
     
      
    );
  };
  
  
  export default Logpage;
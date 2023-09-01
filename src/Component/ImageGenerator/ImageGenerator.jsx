import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import ai_image from '../Assets/tab_image.jpg'
const ImageGenerator = () => {
  const[image_url, setImage_url] = useState("/");
  let inputRef=useRef(null);

 const[loading,setloading]=useState(false);

  const imageGenerator = async() => {
    if(inputRef.current.value===""){
      return 0;
    }
    setloading(true);
    const response= await fetch(
      "https://api.openai.com/v1/images/generations",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`,
          "User-Agent":"Chrome",
        },
        body:JSON.stringify({
          "prompt":`${inputRef.current.value}`,
          n:1,
          size:"512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array=data.data;
    setImage_url(data_array[0].url);
    setloading(false);
  }
  
  return (
    
      <div className='ai_image_generator'>
      <div className="header">Visualize AI <span>Studio</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url==="/"?ai_image:image_url} alt="" /></div>
        <div className="loading">
          <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
          
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe your thoughts '/>
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator

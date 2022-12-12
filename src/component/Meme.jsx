import React, {useState, useEffect} from "react";
import Button from "./button";

// --> fixed resized image ... for certain screen size ...  
// learn to use redis

const url = 'https://api.imgflip.com/caption_image' 

async function getMeme() {
  
  const responce = await fetch('https://api.imgflip.com/get_memes') 
  let img = await responce.json()
  return img
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

export default function Meme() {

  const [meme, setMeme] = useState({})
  const [field, setField] = useState({
    top: "",
    bottom: ""
  })

  const handleField = e => {
    setField({
      ...field,
      [e.target.name]: e.target.value
    })
  }

  const data = {
    template_id: meme.id,
    text0: field.top,
    text1: field.bottom,
    username: 'tugsuu.png',
    password: 'Azura_266'
  }

  useEffect(() => {
    getMeme().then((res) => {
      let num = getRandomNum(100) 
      setMeme({
        id: res.data.memes[num].id,
        url: res.data.memes[num].url
      })
    })
  }, [])


  async function postMeme() {
        
    const formData = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
  
    const responce = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: formData
    })
  
    let meme = await responce.json()
    return meme
  }
  
  const handleClick = e => {
    e.preventDefault()
    
    postMeme().then((res) => {
        setMeme({
          url: res.data.url
        })
    })
    .catch(err => console.error(err)) 
  
  }

  
  return (
    <div className="form">
      <div className="column">
        <div className="column-1">
          <input 
            className="input" 
            type="text" 
            name="top"
            value={field.top}
            onChange={handleField}
            placeholder="Top text"/>
        </div>
        <div className="column-1 sm-space">
          <input 
            className="input" 
            type="text" 
            name="bottom"
            onChange={handleField}
            value={field.bottom}
            placeholder="Bottom text" />
        </div>
      </div>
      <Button data = {data} func={handleClick}/>    
      <div className="meme">
        <img src = {meme.url} alt="meme" />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Button from "./button";


const url = "https://api.imgflip.com/caption_image";

async function getMeme() {
  const responce = await fetch("https://api.imgflip.com/get_memes");
  let img = await responce.json();
  return img;
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function findMeme(list) {
  let boxes = 0;
  let url = "";
  let temp_id = "";
  let meme_id = 0;
  while (boxes != 2) {
    meme_id = getRandomNum(100);
    temp_id = list.memes[meme_id].id;
    boxes = list.memes[meme_id].box_count;
    url = list.memes[meme_id].url;
  }

  return {
    id: temp_id,
    url: url,
  };
}

export default function Meme() {
  const [meme, setMeme] = useState({});
  const [field, setField] = useState({
    top: "",
    bottom: "",
  });

  const handleField = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };



  const data = {
    template_id: meme.id,
    text0: field.top,
    text1: field.bottom,
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD,
  };


  useEffect(() => {
    getMeme().then((res) => {
      let random_meme = findMeme(res.data);
      setMeme({
        id: random_meme.id,
        url: random_meme.url,
      });
    })
    .catch(err => console.error(err));
  }, []);

  async function postMeme() {
    const formData = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

    const responce = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formData,
    });

    let meme = await responce.json();
    return meme;
  }

  const handleClick = (e) => {
    e.preventDefault();

    postMeme()
      .then((res) => {
        setMeme({
          id: meme.id,
          url: res.data.url,
        });
      })
      .catch((err) => console.error(err));
  };

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
            placeholder="Top text"
          />
        </div>
        <div className="column-1 sm-space">
          <input
            className="input"
            type="text"
            name="bottom"
            onChange={handleField}
            value={field.bottom}
            placeholder="Bottom text"
          />
        </div>
      </div>
      <Button data={data} func={handleClick} />
      <div className="meme">
        <img src={meme.url} alt="meme" />
      </div>
    </div>
  );
}

import React from "react";
import Button from "./button";


export default function Meme() {
  return (
    <div className="form">
      <div className="column">
        <div className="column-1">
          <input className="input" type="text" placeholder="Top text" />
        </div>
        <div className="column-1">
          <input className="input" type="text" placeholder="Bottom text" />
        </div>
      </div>
      <Button/>    
    </div>
  );
}

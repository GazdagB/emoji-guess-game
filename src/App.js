import React, { useState, useEffect } from 'react';
import './App.scss';
import allEmojiData from './all-emoji.json';

function App() {
  const [input, setInput] = useState("");
  const [submitedInput,setSubmitedInput] = useState(""); 
  const [emojiData, setEmojiData] = useState(allEmojiData);
  const [randomIndex, setRandomIndex] = useState(0); // Initialize with 0
  const [life,setLife] = useState(3);

  function handleSubmit(e){
    e.preventDefault();
    setSubmitedInput(input);
  }

  function handleSkip(){
    setInput("");
    setSubmitedInput("");
    setRandomIndex(Math.floor(Math.random() * emojiData.length));
    setLife((prevLife) => prevLife - 1);
  }


  useEffect(() => {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setRandomIndex(getRandomInt(0, emojiData.length - 1));
  }, [emojiData]); // Execute whenever emojiData changes

  return (
    
    <div className="App">
      <div className="emoji-game">
       <h1>Guess The Movie by the Emojis</h1>
        <h2 className='emoji-game-emojies'>
        {emojiData[randomIndex].Emojies}
        </h2>
        <form action="">
        <input placeholder='What movie is this...' maxLength={50} value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='primary' onClick={handleSubmit}>Guess</button>
        </form>
       <h3>{emojiData[randomIndex].Title.toLocaleLowerCase() === submitedInput.toLocaleLowerCase() ? `Correct the answer is: ${emojiData[randomIndex].Title}` : ""}</h3>
       <button className='secondary' onClick={handleSkip}>Skip</button>
      </div>
      
    </div>
  );
}

export default App;

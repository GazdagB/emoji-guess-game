import React, { useState, useEffect } from 'react';
import './App.scss';
import allEmojiData from './all-emoji.json';

function App() {
  const [input, setInput] = useState("");
  const [submitedInput,setSubmitedInput] = useState(""); 
  const [emojiData, setEmojiData] = useState(allEmojiData);
  const [randomIndex, setRandomIndex] = useState(0); // Initialize with 0
  const [life,setLife] = useState(3);
  const [matching, setMatching] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setSubmitedInput(input);
  }

  useEffect(() => {
    if (emojiData[randomIndex].Title.toLocaleLowerCase() === submitedInput.toLocaleLowerCase()){
      setMatching(true);
    }
  }, [submitedInput]);

  useEffect(() => {
    if(life === 0){
      setGameOver(true);
    }
  }, [life]);

  function handleSkip(){

    if(matching){
      setInput("");
      setSubmitedInput("");
      setMatching(false);
      setRandomIndex(Math.floor(Math.random() * emojiData.length));
    }else{
      setInput("");
      setSubmitedInput("");
      setRandomIndex(Math.floor(Math.random() * emojiData.length));
      setLife((prevLife) => prevLife - 1);
    }

    
  }


  useEffect(() => {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setRandomIndex(getRandomInt(0, emojiData.length - 1));
  }, [emojiData]); // Execute whenever emojiData changes

  return (
    
    <div className="App">
      {}
      <div className="emoji-game">
       <h1>Guess The Movie by the Emojis</h1>
        <h2 className='emoji-game-emojies'>
        {emojiData[randomIndex].Emojies}
        </h2>
        <form action="">
        <input placeholder='What movie is this...' maxLength={50} value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='primary' onClick={handleSubmit}>Guess</button>
        </form>
       <h3>{emojiData[randomIndex].Title.toLocaleLowerCase() === submitedInput.toLocaleLowerCase() && randomIndex === emojiData[randomIndex] ? 
       (<div>
        <h3 className='correct-answer'>Correct! The Answer is:</h3>
        <h3 className='movie-title'>{emojiData[randomIndex].Title}</h3>
       </div>) : ""}</h3>
       <button className={matching ? "primary" : "secondary"} onClick={handleSkip}>{matching ? "Next" : "Skip"}</button>
      </div>
      
    </div>
  );
}

export default App;

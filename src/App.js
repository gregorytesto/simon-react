import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const boxes = ["yellow", "blue", "red", "green"];
  const [ computerOrder, setComputerOrder ] = useState([ 3 ]);
  const [ playerOrder, setPlayerOrder ] = useState([]);
  const [ selectedBox, setSelectedBox ] = useState(null);
  const [ isGameOver, setIsGameOver ] = useState(false);

  const handleAddRandomBox=()=>{
    let randomIndex = Math.floor(Math.random()*4);
    setComputerOrder([ ...computerOrder,  randomIndex]);
  }

  const showComputerOrder=()=>{

    for(let i=0;i<computerOrder.length; i++){
      setTimeout(()=>{
        handleBlink(computerOrder[i]);
      }, 500*(i+1));
    }

  }

  useEffect(()=>{
    showComputerOrder();
  }, []);

  const handleBlink=(index)=>{
    setSelectedBox(index);
    setTimeout(()=>{
      setSelectedBox(null);
    }, 333)
  }

  const handleClickBox=(boxIndex)=>{
    handleBlink(boxIndex);
    // [ 2, 3, 1, 0] // Comp
    // [ 2, 3, 0 ] // Player
    let isCorrectOrder = true;
    let newPlayerOrder = [ ...playerOrder, boxIndex];
    
    for(let i=0;i<newPlayerOrder.length;i++){
      if(newPlayerOrder[i] !== computerOrder[i]){
        isCorrectOrder = false;
      }
    }
    if(!isCorrectOrder){
      setIsGameOver(true);
      return;
    } else {

    }
    setPlayerOrder(newPlayerOrder);
    // handleBlink(boxIndex);
    // handleAddRandomBox();
  }

  let boxesElArr = boxes.map((color, index)=>{
    return (
      <div 
        key={index}
        onClick={()=>handleClickBox(index)} 
        style={{ backgroundColor: color, opacity: selectedBox === index ? 1: .5 }} 
        className= {"box"}
      ></div>
    )
  })
  return (
    <div id="boxes-container">
      { !isGameOver && boxesElArr }
      { isGameOver &&
        <h1>GGggggrrr... Game over</h1>
      }
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode,replace = false){

    let newHistory = [...history];
    if(replace === true){
      newHistory[newHistory.length-1] = mode;
      setHistory(newHistory);
      setMode(mode);
      return;
    }
    newHistory.push(mode);
    setHistory(newHistory);
    setMode(mode);
  }

  function back(){ 
    if(history.length === 1){
      return;
    }
    

    history.pop();
    let backMode = history[history.length-1];
    setMode(backMode);
    

  }
  return { mode,transition,back };
}

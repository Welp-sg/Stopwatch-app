import React, {useState,useEffect,useRef} from 'react';

function Stopwatch(){
const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);
const intervalRef = useRef(null);

useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 100);
    }, 100);
  } else {
    clearInterval(intervalRef.current);
  }
  return () => clearInterval(intervalRef.current);
}, [isRunning]);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};

return (
  <div>
    <h1>Stopwatch</h1>
    <p>{formatTime(elapsedTime)}</p>
    <button onClick={() => setIsRunning((prev) => !prev)}>
      {isRunning ? 'Pause' : 'Start'}
    </button>
    <button onClick={() => {
      setIsRunning(false);
      setElapsedTime(0);
    }}>
      Reset
    </button>
  </div>
);
}
export default Stopwatch
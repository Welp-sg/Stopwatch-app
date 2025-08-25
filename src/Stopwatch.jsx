import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, elapsedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <p className="stopwatch-time">{formatTime(elapsedTime)}</p>
      <div className="stopwatch-buttons">
        <button
          className="btn btn-start"
          onClick={() => setIsRunning((prev) => !prev)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="btn btn-stop"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
        <button
          className="btn btn-reset"
          onClick={() => {
            setIsRunning(false);
            setElapsedTime(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;

import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [isPause, setIsPause] = useState(true);
  const [time, setTime] = useState(0);
  const [lap, setLap] = useState([]);
  const timerRef = useRef();

  const calculateTime = (milliseconds) => {
    const hour = Math.floor(milliseconds / (1000 * 60 * 60))
      .toString()
      .padStart(2, 0);
    const minute = Math.floor((milliseconds / (1000 * 60)) % 60)
      .toString()
      .padStart(2, 0);
    const second = Math.floor((milliseconds / 1000) % 60)
      .toString()
      .padStart(2, 0);

    return `${hour}:${minute}:${second}`;
  };

  useEffect(() => {
    if (!isPause) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isPause]);

  const reset = () => {
    setTime(0);
    clearInterval(timerRef.current);
    setIsPause(true);
  };

  const updateLap = () => {
    const data = calculateTime(time);
    setLap([...lap, data]);
  };

  const sortTheLap = () => {
    const newLap = lap.sort((a, b) => a.localeCompare(b));
    console.log("newLap:", newLap);
    setLap(newLap);
  };

  return (
    <>
      <div>{calculateTime(time)}</div>
      <button onClick={() => setIsPause(!isPause)}>
        {isPause ? "Start" : "Pause"}
      </button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => updateLap()}>Lap</button>
      <button onClick={() => sortTheLap()}>sort</button>

      {lap?.length > 0 && (
        <ul>
          {lap?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

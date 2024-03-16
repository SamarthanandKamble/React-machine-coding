import { useEffect, useState, useRef } from "react";
import "./App.css";
import ProgressBar from "./Components/ProgressBar";

const totalIntervalMs = 10 * 1000;
const interval = 1 * 1000;
const intervalCycle = totalIntervalMs / interval;
const progressMade = (interval / totalIntervalMs) * 100;

function App() {
  const [progress, setProgress] = useState(0);

  const intervalId = useRef();
  const progressCompleted = useRef(0);
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + progressMade);
      progressCompleted.current += 1;
      if (progressCompleted.current === intervalCycle) {
        clearInterval(intervalId.current);
      }
    }, interval);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);
  return (
    <>
      <ProgressBar progress={progress} />
    </>
  );
}

export default App;

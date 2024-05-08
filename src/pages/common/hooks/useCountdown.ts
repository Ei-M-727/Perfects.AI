import { useEffect, useState } from "react";

export const useCountdown = (timeLine: number) => {
  const [time, setTime] = useState<number>(timeLine);

  useEffect(() => {
    let timerID: NodeJS.Timeout;
    if (time > 0) {
      timerID = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [time]);

  return {
    time,
    setTime,
  };
};

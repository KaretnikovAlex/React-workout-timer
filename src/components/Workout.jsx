import { useState, useRef } from 'react';

export function Workout({ title, description, time, onComplete }) {
const [remainingTime, setRemainingTime] =  useState(time);
  const timer = useRef();
 
  function handleStartWorkout() {
    timer.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1000) {
          handleStopWorkout()
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  }
 
  function handleStopWorkout() {
    clearTimeout(timer.current);
    onComplete();
  }

  return (
    <article className="workout">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{remainingTime / 1000} seconds</p>
      <p>
        <button onClick={handleStartWorkout}>Start</button>
        <button onClick={handleStopWorkout}>Stop</button>
      </p>
    </article>
  );
}
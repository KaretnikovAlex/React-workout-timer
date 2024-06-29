import { useState, useRef } from 'react';
import styled from 'styled-components';

const Article = styled.article`
  margin: 1rem 0;
  padding: 1rem;
  background: #87efce;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #000000;
  width: 20rem;

& h3 {
  font-size: 1.25rem;
  margin: 0;
}

& p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

& button {
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #054a35;
  color: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
}

& button:hover {
  background: #087f5b;
}
`

export function Workout({ title, description, time, onComplete }) {
    const [remainingTime, setRemainingTime] = useState(time);
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
        <Article className="workout">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{remainingTime / 1000} seconds</p>
            <p>
                <button onClick={handleStartWorkout}>Start</button>
                <button onClick={handleStopWorkout}>Stop</button>
            </p>
        </Article>
    );
}
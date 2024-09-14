import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startStop,
  reset,
  tick,
  toggleSessionBreak,
} from '../redux/actions';

const Timer = () => {
  const dispatch = useDispatch();
  const { timeLeft, timerLabel, isRunning } = useSelector((state) => state);
  const beepRef = useRef(null); // Create a ref for the audio element

  // Handle timer ticking and switching between session and break
  useEffect(() => {
    let timerId;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => dispatch(tick()), 1000);
    } else if (timeLeft === 0) {
      if (beepRef.current) { // eslint-disable-next-line arrow-parens
        beepRef.current.play().catch(error => { // eslint-disable-next-line no-console
          console.error('Audio play failed: ', error);
        });
      }
      dispatch(toggleSessionBreak()); // Switch between session and break
    }
    return () => clearInterval(timerId);
  }, [timeLeft, isRunning, dispatch]);

  // Format time into mm:ss format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const resetTimer = () => {
    if (beepRef.current) {
      beepRef.current.pause();
      beepRef.current.currentTime = 0; // Rewind the audio to the start
    }
    dispatch(reset());
  };

  return (
    <div>
      <h2 id="timer-label">{timerLabel}</h2>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button
        id="start_stop"
        type="button"
        onClick={() => dispatch(startStop())}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button id="reset" type="button" onClick={resetTimer}>
        Reset
      </button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        id="beep"
        ref={beepRef}
        src="https://bigsoundbank.com/UPLOAD/mp3/0001.mp3"
        preload="auto" // Ensures the audio is loaded when the page loads
      />
    </div>
  );
};

export default Timer;

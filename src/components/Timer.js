import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startStop, reset, tick, toggleSessionBreak } from '../redux/actions';

const Timer = () => {
  const dispatch = useDispatch();
  const { timeLeft, timerLabel, isRunning, isSession, sessionLength, breakLength } = useSelector(state => state);

  // Handle timer ticking and switching between session and break
  useEffect(() => {
    let timerId;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => dispatch(tick()), 1000);
    } else if (timeLeft === 0) {
      document.getElementById('beep').play(); // Play beep sound
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
    const beepAudio = document.getElementById('beep');
    beepAudio.pause();
    beepAudio.currentTime = 0; // Rewind the audio to the start
    dispatch(reset());
  };

  return (
    <div>
      <h2 id="timer-label">{timerLabel}</h2>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={() => dispatch(startStop())}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
      <audio id="beep" src="https://bigsoundbank.com/UPLOAD/mp3/0001.mp3" />
    </div>
  );
};

export default Timer;

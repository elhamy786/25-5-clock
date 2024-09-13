import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementSession, decrementSession } from '../redux/actions';

const SessionControls = () => {
  const dispatch = useDispatch();
  const sessionLength = useSelector(state => state.sessionLength);

  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <button id="session-decrement" onClick={() => dispatch(decrementSession())}>-</button>
      <span id="session-length">{sessionLength}</span>
      <button id="session-increment" onClick={() => dispatch(incrementSession())}>+</button>
    </div>
  );
};

export default SessionControls;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBreak, decrementBreak } from '../redux/actions';

const BreakControls = () => {
  const dispatch = useDispatch();
  const breakLength = useSelector((state) => state.breakLength);

  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <button id="break-decrement" type="button" onClick={() => dispatch(decrementBreak())}>-</button> {/* Added type="button" */}
      <span id="break-length">{breakLength}</span>
      <button id="break-increment" type="button" onClick={() => dispatch(incrementBreak())}>+</button> {/* Added type="button" */}
    </div>
  );
};

export default BreakControls;

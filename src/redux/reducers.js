const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500, // 25 minutes in seconds (session length)
  timerLabel: 'Session',
  isRunning: false,
  isSession: true, // Determines if it's session or break
};
/* eslint-disable default-param-last */
function clockReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_BREAK':
      return {
        ...state,
        breakLength: Math.min(state.breakLength + 1, 60),
      };

    case 'DECREMENT_BREAK':
      return {
        ...state,
        breakLength: Math.max(state.breakLength - 1, 1),
      };

    case 'INCREMENT_SESSION':
      return {
        ...state,
        sessionLength: Math.min(state.sessionLength + 1, 60),
        timeLeft: !state.isRunning
          ? (state.sessionLength + 1) * 60
          : state.timeLeft,
        // Update timeLeft only if not running
      };

    case 'DECREMENT_SESSION':
      return {
        ...state,
        sessionLength: Math.max(state.sessionLength - 1, 1),
        timeLeft: !state.isRunning
          ? (state.sessionLength - 1) * 60
          : state.timeLeft,
        // Update timeLeft only if not running
      };

    case 'START_STOP':
      return {
        ...state,
        isRunning: !state.isRunning,
      };

    case 'RESET':
      return {
        ...initialState,
        timeLeft: initialState.sessionLength * 60, // Ensure timeLeft is reset properly
      };

    case 'TICK':
      // If timeLeft reaches 0, trigger toggle between session/break
      if (state.timeLeft === 0) {
        return {
          ...state,
          isSession: !state.isSession,
          timerLabel: state.isSession ? 'Break' : 'Session',
          timeLeft: state.isSession
            ? state.breakLength * 60
            : state.sessionLength * 60,
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1 > 0 ? state.timeLeft - 1 : 0, // Prevent negative timeLeft
      };

    case 'TOGGLE_SESSION_BREAK':
      return {
        ...state,
        isSession: !state.isSession,
        timerLabel: state.isSession ? 'Break' : 'Session',
        timeLeft: state.isSession
          ? state.breakLength * 60
          : state.sessionLength * 60,
      };

    default:
      return state;
  }
}

export default clockReducer;

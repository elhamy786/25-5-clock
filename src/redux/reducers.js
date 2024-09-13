const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  timerLabel: 'Session',
  isRunning: false,
  isSession: true,
};

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
        imeLeft: !state.isRunning ? (state.sessionLength + 1) * 60 : state.timeLeft,
      };

    case 'DECREMENT_SESSION':
      return {
        ...state,
        sessionLength: Math.max(state.sessionLength - 1, 1),
        timeLeft: !state.isRunning ? (state.sessionLength - 1) * 60 : state.timeLeft,
      };

    case 'START_STOP':
      return {
        ...state,
        isRunning: !state.isRunning,
      };

    case 'RESET':
      return {
        ...initialState,
        timeLeft: initialState.sessionLength * 60,
      };

    case 'TICK':
      if (state.timeLeft === 0) {
        return {
          ...state,
          isSession: !state.isSession,
          timerLabel: state.isSession ? 'Break' : 'Session',
          timeLeft: state.isSession ? state.breakLength * 60 : state.sessionLength * 60,
        };
      }
        return {
          ...state,
          timeLeft: state.timeLeft - 1 > 0 ? state.timeLeft - 1 : 0,
        };
  
      case 'TOGGLE_SESSION_BREAK':
        return {
          ...state,
          isSession: !state.isSession,
          timerLabel: state.isSession ? 'Break' : 'Session',
          timeLeft: state.isSession ? state.breakLength * 60 : state.sessionLength * 60,
        };
  
      default:
        return state;
    }
  }
  
  export default clockReducer;
  
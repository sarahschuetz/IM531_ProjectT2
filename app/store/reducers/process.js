import State from './../states/process';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'START_PROCESS': {
      const processList = [
        ...state.list,
        {
          ...action.payload,
          messages: [],
        },
      ];
      return {
        ...state,
        list: processList,
      };
    }
    case 'STOP_PROCESS': {
      return {
        ...state,
        list: state.list.filter(process => process.pid !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

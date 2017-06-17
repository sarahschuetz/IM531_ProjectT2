import State from './../states/process';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'START_PROCESS': {
      const processList = [
        ...state.list,
        {
          pid: action.payload.pid,
          reference: action.payload.process,
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
    case 'ADD_MESSAGE': {
      let processList = [
        ...state.list,
      ];

      let currentProcess = processList.filter(process => process.pid === action.payload.pid)[0];

      if (currentProcess) {
        processList = processList.filter(process => process.pid !== action.payload.pid);

        const messages = [
          ...currentProcess.messages,
          action.payload.message,
        ];

        currentProcess = {
          ...currentProcess,
          messages,
        };

        processList = [
          ...processList,
          currentProcess,
        ];
      }

      return {
        ...state,
        list: processList,
      };
    }
    case 'CLEAR_MESSAGES': {
      let processList = [
        ...state.list,
      ];

      let currentProcess = processList.filter(process => process.pid === action.payload)[0];
      processList = processList.filter(process => process.pid !== action.payload);

      currentProcess = {
        ...currentProcess,
        messages: [],
      };

      processList = [
        ...processList,
        currentProcess,
      ];

      return {
        ...state,
        list: processList,
      };
    }
    case 'PROCESS_TERMINATED': {
      let processList = [
        ...state.list,
      ];

      let currentProcess = processList.filter(process => process.pid === action.payload)[0];
      processList = processList.filter(process => process.pid !== action.payload);

      currentProcess = {
        ...currentProcess,
        terminated: true,
      };

      processList = [
        ...processList,
        currentProcess,
      ];

      return {
        ...state,
        list: processList,
      };
    }
    default: {
      return state;
    }
  }
}

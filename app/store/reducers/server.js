import State from './../states/server';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'ADD_SERVER': {
      const serverList = [
        ...state.list,
        {
          ...action.payload,
          id: state.serverIdCounter,
          command: '',
        },
      ];
      return {
        ...state,
        list: serverList,
        serverIdCounter: state.serverIdCounter + 1,
      };
    }
    case 'DELETE_SERVER': {
      return {
        ...state,
        list: state.list.filter((item, index) => index !== action.payload.serverIndex),
      };
    }
    case 'START_SERVER': {
      const serverList = [
        ...state.list,
      ];
      serverList[state.currentServerIndex] = {
        ...serverList[state.currentServerIndex],
        processPID: action.payload.pid,
        isRunning: true,
      };

      return {
        ...state,
        list: serverList,
        runningServer: state.runningServer + 1,
      };
    }
    case 'STOP_SERVER': {
      const serverList = [
        ...state.list,
      ];
      serverList[state.currentServerIndex] = {
        ...serverList[state.currentServerIndex],
        processPID: null,
        isRunning: false,
      };
      return {
        ...state,
        list: serverList,
        runningServer: state.runningServer - 1,
      };
    }
    case 'SET_SERVER_INDEX': {
      return {
        ...state,
        currentServerIndex: action.payload.serverIndex,
      };
    }
    case 'SET_COMMAND': {
      const serverList = [
        ...state.list,
      ];
      serverList[state.currentServerIndex] = {
        ...serverList[state.currentServerIndex],
        command: action.payload.command,
      };
      return {
        ...state,
        list: serverList,
      };
    }
    default: {
      return state;
    }
  }
}

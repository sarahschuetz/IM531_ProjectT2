import State from './../states/server';

function findServerIndex(state, serverId) {
  let index = 0;
  let result = -1;

  state.list.forEach((currentServer) => {
    if (currentServer.id === serverId) {
      result = index;
    }
    index += 1;
  });

  return result;
}

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
      const indexToDelete = findServerIndex(state, action.payload.serverId);
      return {
        ...state,
        list: state.list.filter((item, index) => index !== indexToDelete),
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
    case 'STOP_CURRENT_SERVER': {
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
    case 'STOP_SERVER': {
      const serverList = [
        ...state.list,
      ];
      serverList[action.payload] = {
        ...serverList[action.payload],
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
    case 'SET_SHOW_DIRECTORY': {
      const serverList = [
        ...state.list,
      ];
      serverList[state.currentServerIndex] = {
        ...serverList[state.currentServerIndex],
        showDirectory: action.payload,
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

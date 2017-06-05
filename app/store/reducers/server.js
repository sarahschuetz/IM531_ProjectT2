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
     // console.log(`PAYLOAD SERVER ID${action.payload.serverId.serverID}`);
      const serverList = [
        ...state.list.slice(0, action.payload.serverId.serverID),
        ...state.list.slice(action.payload.serverId.serverID + 1),
      ];
      return {
        ...state,
        list: serverList,
      };
    }
    case 'RENAME_SERVER': {
      return {
      };
    }
    case 'RESTART_SERVER': {
      return {
      };
    }
    case 'STOP_SERVER': {
      return {
      };
    }
    default: {
      return state;
    }
  }
}

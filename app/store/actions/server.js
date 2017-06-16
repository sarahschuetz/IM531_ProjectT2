export function addServer(server) {
  return {
    type: 'ADD_SERVER',
    payload: server,
  };
}

export function deleteServer(serverIndex) {
  return {
    type: 'DELETE_SERVER',
    payload: {
      serverIndex,
    },
  };
}

export function startServer(pid) {
  return {
    type: 'START_SERVER',
    payload: {
      pid,
    },
  };
}

export function stopCurrentServer() {
  return {
    type: 'STOP_CURRENT_SERVER',
    payload: {},
  };
}

export function stopServer(index) {
  return {
    type: 'STOP_SERVER',
    payload: index,
  };
}

export function setCommand(command) {
  return {
    type: 'SET_COMMAND',
    payload: {
      command,
    },
  };
}

export function setCurrentServerIndex(serverIndex) {
  return {
    type: 'SET_SERVER_INDEX',
    payload: {
      serverIndex,
    },
  };
}

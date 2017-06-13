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

export function renameServer(serverId, name) {
  return {
    type: 'RENAME_SERVER',
    payload: {
      serverId,
      name,
    },
  };
}

export function startServer(serverId) {
  return {
    type: 'START_SERVER',
    payload: {
      serverId,
    },
  };
}

export function stopServer(serverId) {
  return {
    type: 'STOP_SERVER',
    payload: {
      serverId,
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

export function startProcess(pid, process) {
  return {
    type: 'START_PROCESS',
    payload: {
      pid,
      process,
    },
  };
}

export function stopProcess(pid) {
  return {
    type: 'STOP_PROCESS',
    payload: pid,
  };
}

export function addMessage(pid, message) {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      pid,
      message,
    },
  };
}

export function clearMessages(pid) {
  return {
    type: 'CLEAR_MESSAGES',
    payload: pid,
  };
}

export function processTerminated(pid) {
  return {
    type: 'PROCESS_TERMINATED',
    payload: pid,
  };
}

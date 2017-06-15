export function startProcess(pid) {
  return {
    type: 'START_PROCESS',
    payload: pid,
  };
}

export function stopProcess(pid) {
  return {
    type: 'STOP_PROCESS',
    payload: pid,
  };
}

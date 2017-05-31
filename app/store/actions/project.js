export function addProject(project) {
  return {
    type: 'ADD_PROJECT',
    payload: project,
  };
}

export function deleteProject(projectId) {
  return {
    type: 'DELETE_PROJECT',
    payload: {
      projectId,
    },
  };
}

export function renameProject(projectId, name) {
  return {
    type: 'RENAME_PROJECT',
    payload: {
      projectId,
      name,
    },
  };
}

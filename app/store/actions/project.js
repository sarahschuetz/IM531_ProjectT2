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

export function setProjectRootPath(path) {
  return {
    type: 'SET_PROJECT_ROOT_PATH',
    payload: {
      path,
    },
  };
}

export function setCurrentProjectIndex(projectIndex) {
  return {
    type: 'SET_PROJECT_INDEX',
    payload: {
      projectIndex,
    },
  };
}

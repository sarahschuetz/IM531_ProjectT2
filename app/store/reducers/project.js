import State from './../states/project';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'ADD_PROJECT': {
      const projects = {
        ...state.projects,
        ...action.payload,
      };
      return {
        ...state,
        projects,
      };
    }
    case 'RENAME_PROJECT': {
      return {
      };
    }
    case 'DELETE_PROJECT': {
      return {
      };
    }
    case 'SET_PROJECT_ROOT_PATH': {
      const projectList = {
        ...state.list,
      };
      projectList[state.currentProjectIndex] = {
        ...projectList[state.currentProjectIndex],
        rootPath: action.payload.path,
      };
      return {
        ...state,
        list: projectList,
      };
    }
    default: {
      return state;
    }
  }
}

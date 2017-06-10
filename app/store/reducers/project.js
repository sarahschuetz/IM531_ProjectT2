import State from './../states/project';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'ADD_PROJECT': {
      const projectList = [
        ...state.list,
        {
          ...action.payload,
          id: state.projectIdCounter,
        },
      ];
      return {
        ...state,
        list: projectList,
        projectIdCounter: state.projectIdCounter + 1,
      };
    }
    case 'SET_INDEX': {
      return {
        ...state,
        currentProjectIndex: action.payload.projectIndex,
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
      const projectList = [
        ...state.list,
      ];
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

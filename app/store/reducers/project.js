import State from './../state';

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
    default: {
      return state;
    }
  }
}

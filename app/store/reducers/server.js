import State from './../state';

export default function reducer(state = State, action) {
  switch (action.type) {
    case 'ADD_SERVER': {
      return {
      };
    }
    case 'DELETE_SERVER': {
      return {
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

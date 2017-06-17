import * as actions from '../store/actions/project';


describe('actions', () => {
  it('create action new Project', () => {
    const project = 'TEST PROJECT';
    const expectedAction = {
      type: 'ADD_PROJECT',
      payload: project,
    };
    expect(actions.addProject(project)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('create action SET_PROJECT_ROOT_PATH', () => {
    const path = 'C:\\Users\\David\\AppData\\Roaming\\edon';
    const expectedAction = {
      type: 'SET_PROJECT_ROOT_PATH',
      payload: { path },
    };
    expect(actions.setProjectRootPath(path)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('create action DELETE_PROJECT', () => {
    const projectId = 22;
    const expectedAction = {
      type: 'DELETE_PROJECT',
      payload: { projectId },
    };
    expect(actions.deleteProject(projectId)).toEqual(expectedAction);
  });
});

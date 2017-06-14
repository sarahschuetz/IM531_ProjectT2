import * as actions from '../store/actions/server';


describe('actions', () => {
  it('create action new server', () => {
    const server = 'TEST SERVER';
    const expectedAction = {
      type: 'ADD_SERVER',
      payload: server,
    };
    expect(actions.addServer(server)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('create action SET_SERVER_INDEX', () => {
    const serverIndex = 3;
    const expectedAction = {
      type: 'SET_SERVER_INDEX',
      payload: { serverIndex },
    };
    expect(actions.setCurrentServerIndex(serverIndex)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('create action DELETE_SERVER', () => {
    const serverIndex = 3;
    const expectedAction = {
      type: 'DELETE_SERVER',
      payload: { serverIndex },
    };
    expect(actions.deleteServer(serverIndex)).toEqual(expectedAction);
  });
});

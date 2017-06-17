import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'server-store',
  defaults: {
    list: [{
      name: 'StaticServer',
      projectId: 0,
      isRunning: false,
      processPID: null,
      id: 0,
      command: 'node server/server.js',
      showDirectory: '',
    }],
    serverIdCounter: 1,
  },
});

const state = {
  ...fileStore.store,
  currentServerIndex: -1,
  runningServer: 0,
  fileStore,
};

export default state;

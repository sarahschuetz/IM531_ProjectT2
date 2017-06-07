import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'server-store',
  defaults: {
    list: [],
    serverIdCounter: 0,
  },
});

const state = {
  ...fileStore.store,
  currentServerIndex: -1,
  runningServer: 0,
  fileStore,
};

export default state;

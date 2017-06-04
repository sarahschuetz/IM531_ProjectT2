import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'server-store',
  defaults: {
    list: [
      {
        name: 'project1',
      },
    ],
    runningServer: 3,
  },
});

const state = {
  ...fileStore.store,
  fileStore,
};

export default state;

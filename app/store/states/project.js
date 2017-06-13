import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'project-store',
  defaults: {
    currentProjectIndex: -1,
    list: [],
    projectIdCounter: 1,
  },
});

const state = {
  ...fileStore.store,
  fileStore,
};

export default state;


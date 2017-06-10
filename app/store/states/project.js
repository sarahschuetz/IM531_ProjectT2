import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'project-store',
  defaults: {
    currentProjectIndex: 0,
    list: [
      {
        name: 'project2',
        rootPath: 'TEST/goes/here/deeper',
        id: 0,
      },
    ],
    projectIdCounter: 1,
  },
});

const state = {
  ...fileStore.store,
  fileStore,
};

export default state;


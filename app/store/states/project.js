import FileStore from 'electron-store';

const fileStore = new FileStore({
  name: 'project-store',
  defaults: {
    currentProjectIndex: -1,
    list: [
      {
        name: 'project2',
        rootPath: 'TEST/goes/here/deeper',
      },
    ],
  },
});

const state = {
  ...fileStore.store,
  fileStore,
};

export default state;


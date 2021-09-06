export const getFileState = store => store.listFile;

export const getListFiles = store => getFileState(store).files;

export const getUserState = store => store.listUser;

export const getListUsers = store => getUserState(store).users;

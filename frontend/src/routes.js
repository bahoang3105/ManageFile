import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const AllFiles = React.lazy(() => import('./views/files/AllFiles'));
const UploadFile = React.lazy(() => import('./views/files/UploadFile'));
const MyFiles = React.lazy(() => import('./views/files/MyFiles'));
const File = React.lazy(() => import('./views/files/File'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/files', exact: true, name: 'Files', component: AllFiles },
  { path: '/files/all-files', exact: true, name: 'All Files', component: AllFiles },
  { path: '/files/upload-file', name: 'Upload File', component: UploadFile },
  { path: '/files/my-files', name: 'My Files', component: MyFiles },
  { path: '/files/:id', name: 'File Details', component: File },
];

export default routes;

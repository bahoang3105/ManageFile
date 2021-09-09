import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const AllFiles = React.lazy(() => import('./views/files/AllFiles'));
const MyFiles = React.lazy(() => import('./views/files/MyFiles'));
const File = React.lazy(() => import('./views/files/File'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },
  { path: '/admin/users/detail/:id', exact: true, name: 'User Details', component: User },
  { path: '/admin/files', exact: true, name: 'Files', component: AllFiles },
  { path: '/admin/all-files', exact: true, name: 'All Files', component: AllFiles },
  { path: '/admin/my-files', name: 'My Files', component: MyFiles },
  { path: '/admin/files/detail/:id', name: 'File Details', component: File },
  { path: '/files', exact:true, name: 'My Files', component: MyFiles },
  { path: '/files/detail/:id', name: 'File Details', component: File },
];

export default routes;

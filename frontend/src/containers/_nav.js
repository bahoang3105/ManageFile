const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/admin/users',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Files',
    route: 'admin/files',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Files',
        to: '/admin/all-files',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'My Files',
        to: '/admin/my-files',
      },
    ],
  },
]

export default _nav;

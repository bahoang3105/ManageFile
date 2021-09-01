const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Files',
    route: '/files',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Files',
        to: '/files/all-files',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'My Files',
        to: '/files/my-files',
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Upload File",
        to: '/files/upload-file'
      },
    ],
  },
]

export default _nav

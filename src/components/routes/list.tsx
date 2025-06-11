import Home from '../pages/home/Home';


export const routes = [
  {
    path: '/',
    element: <Home />,
    auth: true,
  },
  {
    path: '/profile/:id',
    element: <Home />,
    auth: true,
  },
  {
    path: '/messages',
    element: <Home />,
    auth: true,
  },
  {
    path: '/message/:id',
    element: <Home />,
    auth: true,
  },
  {
    path: '/friends/:id',
    element: <Home />,
    auth: true,
  },
  {
    path: '/auth',
    
    auth: false,
  },
];



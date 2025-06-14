
// src/routes/list.tsx
import Auth from '../pages/auth/Auth';
import Friends from '../pages/friends/Friends';
import Home from '../pages/home/Home';
import Conversation from '../pages/messages/Conversation';
import Messages from '../pages/messages/Messages';
import Profile from '../pages/profile/Profile';

export const routes = [
  { path: '/', element: <Home />, auth: true },
  { path: '/profile', element: <Profile />, auth: true },
  { path: '/messages', element: <Messages />, auth: true },
  { path: '/message/:id', element: <Conversation />, auth: true },
  { path: '/friends/:id', element: <Friends />, auth: true },
  { path: '/auth', element: <Auth />, auth: false },
];



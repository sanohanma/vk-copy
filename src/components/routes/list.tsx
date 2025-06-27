// src/components/routes/list.tsx
import Auth from '../pages/auth/Auth';
import Friends from '../pages/friends/Friends';
import Home from '../pages/home/Home';
import Conversation from '../pages/messages/Conversation';
import Messages from '../pages/messages/Messages';
import Profile from '../pages/profile/Profile';
import ChatPage from '../pages/messages/ChatPage';



// export const routes = [
//   { path: '/', element: <Home />, auth: true },
//   { path: '/profile', element: <Profile />, auth: true },
//   { path: '/messages', element: <Messages />, auth: true },
//   { path: '/message/:id', element: <Conversation />, auth: true },
//   { path: '/friends/:id', element: <Friends />, auth: true },
//   { path: '/auth', element: <Auth />, auth: false },
// ];







// Определяем интерфейс для маршрутов
export interface IRoute {
  path: string;
  // ИЗМЕНЕНИЕ: Используем React.ReactNode вместо JSX.Element
  element: React.ReactNode; 
  auth: boolean; // true, если маршрут требует аутентификации
}

export const routes: IRoute[] = [
  { path: '/', element: <Home />, auth: true },
  { path: '/profile', element: <Profile />, auth: true },
  { path: '/messages', element: <Messages />, auth: true },
  { path: '/message/:id', element: <ChatPage />, auth: true },
  { path: '/friends', element: <Friends />, auth: true },
  { path: '/auth', element: <Auth />, auth: false },
];
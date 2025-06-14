import React, { FC } from 'react'
import UserItems from './UserItems';
import Menu from './Menu'
import User from './User';


const Sidebar: FC = () => {
  return <div>
    <User/>
    <UserItems/>
    <Menu/>

   
    </div>
};

export default Sidebar


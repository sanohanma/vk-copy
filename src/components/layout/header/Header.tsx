import React, { FC, useState } from 'react'
import { Search } from '@mui/icons-material'

import styles from './Header.module.css'


import logoImg from './vk-logo.png'






const Header: FC = () => {
  const [isSearchActive,setIsSearchActive] = useState(false)
  return (
  <header className={styles.header}>
    <div className={styles.imgWrapper}>
      <img style={{width:30,height:30 , position:'absolute',left:25, top:10}} src="src/assets/vk-logo.png" alt="" />
    </div>
      <div className={styles.wrapper}>
        {!isSearchActive &&
          <Search/>
        }
      <input type="text" placeholder='Поиск' 
      onClick={() => setIsSearchActive(true)} />
      </div>
  </header>
  

  )
}

export default Header


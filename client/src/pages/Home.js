import React from 'react'
import { Outlet } from 'react-router-dom'
import {Header} from '../component/Header'
import { SearchBox } from '../component/SearchBox'


export const Home = () => {
  return (
  <>
  <div id='home-div'>
  <Header />
  <SearchBox />
  <Outlet/>
  </div>
  </>
  )
}

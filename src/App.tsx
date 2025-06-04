
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'
import Home from './components/pages/home/Home'
import './index.css'

function App() {


  return (
    <>
    <Layout>
    <Home />
    </Layout>
    </>
  )
}

export default App

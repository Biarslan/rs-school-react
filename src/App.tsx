import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './components/About/About';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }
}

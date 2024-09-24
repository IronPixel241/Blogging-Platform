import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import CreateEditPost from './components/CreateEditPost';
import PostManagement from './components/PostManagement';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/create" element={<CreateEditPost />} />
      <Route path="/edit/:id" element={<CreateEditPost />} />
      <Route path="/manage" element={<PostManagement />} />
    </Routes>
  </Router>
);

export default App;

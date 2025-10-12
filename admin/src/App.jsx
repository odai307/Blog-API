import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import NotFound from './pages/NotFound';
import ViewPost from './pages/ViewPost';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Public Route */}
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route path='/' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path='/posts/new' element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }/>

          <Route path='/posts/edit/:id' element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }/>

          <Route path='posts/view/:id' element={<ViewPost />} />

          {/* Catch All. Not found page */}
          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App

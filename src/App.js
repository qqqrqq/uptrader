import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SelectProject from './components/pages/SelectProject/SelectProject.jsx';
import TasksOffProject from './components/pages/TasksOfProject/TasksOfProject';
import rootReducer from './reducers';

const store = createStore(rootReducer);
const initStore = localStorage.getItem('redux-store');

if (!initStore) {
  localStorage.setItem('redux-store', JSON.stringify(store.getState()));
}

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
});

const App = () => (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path={'/'} element={<SelectProject />} />
          <Route exact path={'/tasks'} element={<TasksOffProject />} />
        </Routes>
      </Router>
    </Provider>
);

export default App;

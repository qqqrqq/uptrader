import { combineReducers } from 'redux';
import projects from './projects';
import currentProject from './currentProject';
import tasks from './tasks';

export default combineReducers({
  projects,
  currentProject,
  tasks,
});

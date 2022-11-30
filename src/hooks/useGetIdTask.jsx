const useGetIdTask = () => {
  const state = JSON.parse(localStorage.getItem('redux-store'));

  const tasks = state.tasks.filter((task) => task.projectId === state.currentProject);

  return tasks.length + 1;
};

export default useGetIdTask;

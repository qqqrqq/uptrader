const stateProjects = JSON.parse(localStorage.getItem('redux-store'))?.projects || [];

const projects = (state = stateProjects, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          items: [],
        },
      ];
    case 'DELETE_PROJECT':

      return [...state].filter((project) => project.id !== action.payload);
    default:
      return state;
  }
};

export default projects;

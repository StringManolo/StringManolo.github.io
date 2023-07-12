const detectInitialUrl = routes => {
  const definedRoutes = Object.keys(routes);
  if (window.location.hash) {
    const route = window.location.hash.substr(1);
    let routeFound = false;	  
    for(let i = 0; i < definedRoutes.length - 1; ++i) {
      if (route == routes[definedRoutes[i]].path) {
        routeFound = true;
        if (route == routes[definedRoutes[definedRoutes.length - 1]].path) {
          (routes[definedRoutes[definedRoutes.length - 1]].action)();
        } else {
          (routes[definedRoutes[i]].action)();
        }
      }
    }
    
   if (!routeFound) {
      (routes[definedRoutes[definedRoutes.length - 1]].action)();
    }

  } else {
    window.location = window.location + `#${routes[definedRoutes[0]].path}`;
    detectInitialUrl(routes);
  }
}

const changeRoute = (e, routes) => {
  const route = window.location.hash.substr(1);
  let routeFound = false;
  const definedRoutes = Object.keys(routes);

  for(let i = 0; i < definedRoutes.length - 1; ++i) {
    if (route == routes[definedRoutes[i]].path) {
      routeFound = true;
      (routes[definedRoutes[i]].action)();
    }
  }

  if (!routeFound) {
    (routes[definedRoutes[definedRoutes.length - 1]].action)();
  }
}

const routerController = {};

routerController.start = routes => {
  detectInitialUrl(routes);
  window.addEventListener("popstate", e => {
    changeRoute(e, routes);
  });
};

export default routerController;

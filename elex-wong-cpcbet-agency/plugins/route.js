export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {

      var authToken = localStorage.getItem('authToken');
      var agentLevel = localStorage.getItem('agentLevel');

      if ((to.fullPath == '/commission' || to.fullPath == '/commission/create' ) && agentLevel != 1) {
        next({
          path: '/'
        });
      } else if (to.fullPath != '/' && !authToken) {
        next({
          path: '/'
        });
      } else {
        next();
      }

    })
 }

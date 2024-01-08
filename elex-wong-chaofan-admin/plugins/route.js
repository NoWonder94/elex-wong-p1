export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {

      var authToken = localStorage.getItem('authToken');

      /* not in login page and no authtoken */
      if (to.fullPath != '/login' && !authToken) {
        next({
          path: '/login'
        });
      } else {
        next();
      }

    })
 }

import Vue from 'vue';
export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.beforeEach((to, from, next) => {

    var authToken = localStorage.getItem('authToken');

    if (to.fullPath.includes('user') && !authToken) {
      Vue.prototype.$notiflix.Notify.failure(
        app.i18n.t("message.plsLogin"),
        {
          showOnlyTheLastOne: true,
        }
      );
      next({
        path: '/'
      });
    } else {
      next();
    }

  })
}

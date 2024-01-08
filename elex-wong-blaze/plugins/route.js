export default ({ app }) => {
    // var lang = localStorage.getItem("selected_language") ?? navigator.language;

    // app.i18n.setLocale(lang);
    // app.store.dispatch("setLanguage", lang.split('-')[0], app);
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {
      var authToken = localStorage.getItem('authToken');
      if (to.meta.auth && to.fullPath != '/' && !authToken) {
        next({
          path: app.localePath('/')
        });
      } else {
        next();
      }
      $("#top").animate(
        {
          scrollTop: 0,
        },
        100
      );
    })
}

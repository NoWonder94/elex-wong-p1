window._bd_share_main.F.module('share/select_api', function (e, t, n) { const r = e('base/tangram').T; const i = e('base/class').Class; const s = e('component/comm_tools'); const o = e('share/api_base'); t.Api = i.create(function (e) { const t = this; t._init = function () { const e = t.getView(); e.render(), e.init(); }, t._processAction = function (e) { return { data: { type: 'select' } }; }, t._distory = function () {}; }, o.ApiBase); });

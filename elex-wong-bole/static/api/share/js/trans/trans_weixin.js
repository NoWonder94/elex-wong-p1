window._bd_share_main.F.module('trans/trans_weixin', function (n, i) { let e; let o; let t; const d = 'bdshare_weixin_qrcode_dialog'; let a = ''; let r = 0; let c = {}; const p = n('base/tangram').T; const u = (n('conf/const').URLS, function (n) { let i = Math.round(200 / n.length); i = i < 2 ? 2 : i, r = i * n.length; const e = '<table style="direction:ltr;border: 0; width:' + r + 'px; border-collapse: collapse;background-color:#fff;margin:0 auto;" align="center">'; const o = [e]; let t = ''; return p.each(n, function (n, e) { o.push('<tr>'), p.each(e, function (n, e) { t = '<td style="width:' + i + 'px;height:' + i + 'px;padding:0;margin:0;border:none;background:#' + (e ? '000' : 'FFF') + '"></td>', o.push(t); }); }), o.push('</table>'), o.join(''); }); const s = function (n, i) { window._bd_share_main.F.use('component/qrcode', function (i) { const o = i.QRCode; const d = i.QRErrorCorrectLevel; const a = new o(-1, d.L); a.addData(n), a.make(); const c = u(a.modules); p(c).appendTo(t.empty()); _(r), w(), e.attr('data-url', n); }); }; const f = function () { e.attr('data-url') != a && (t.html('正在加载'), s(a.length > 200 ? a : a)); }; var _ = function (n) { const i = (n > 220 ? n : 220) + 20; const o = p('.bd_weixin_popup_foot').height() + p('.bd_weixin_popup_head').height() + n + 30; e.css({ width: i, height: o }); }; const h = function () { if (e = p('#' + d), o = p('#' + d + '_bg'), e.length < 1) { const n = '<iframe id="' + d + '_bg" class="bd_weixin_popup_bg"></iframe>'; const i = ['<div id="' + d + '" class="bd_weixin_popup">', '<div class="bd_weixin_popup_head">', '<span>分享到微信朋友圈</span>', '<a href="#" onclick="return false;" class="bd_weixin_popup_close">&times;</a>', '</div>', '<div id="' + d + '_qr" class="bd_weixin_popup_main"></div>', '<div class="bd_weixin_popup_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div>', '</div>'].join(''); o = p(n).appendTo('body'), e = p(i).appendTo('body'), l(); }t = e.find('#' + d + '_qr'), b(); }; var l = function () { e.find('.bd_weixin_popup_close').click(g), p('body').on('keydown', function (n) { n.keyCode == 27 && g(); }), p(window).resize(function () { w(); }); }; var w = function () { const n = p(window).scrollTop(); const i = e.outerWidth(); const t = e.outerHeight(); const d = p(window).width(); const a = p(window).height(); let r = (a - t) / 2 + n; let c = (d - i) / 2; r = r < 0 ? 0 : r, c = c < 0 ? 0 : c, o.width(i).height(t).css({ left: c, top: r }), e.css({ left: c, top: r }); }; var b = function () { e.show(), o.show(), w(); }; var g = function () { e.hide(), o.hide(); }; const v = function (n) { const i = '10006-weixin-1-52626-6b3bffd01fdde4900130bc5a2751b6d1'; if (c.sign === 'off') return n; if (c.sign === 'normal') { const e = n.indexOf('#'); const o = n.indexOf('?'); return e == -1 ? n + (o == -1 ? '?' : '&') + i : n.replace('#', (o == -1 ? '?' : '&') + i + '#'); } return n.replace(/#.*$/g, '') + '#' + i; }; const x = function (n) { n = v(n); const i = []; return p.each(n, function (n, e) { /[^\x00-\xff]/.test(e) ? i[n] = encodeURI(e) : i[n] = e; }), n = i.join(''); }; const m = function () { window._bd_share_main.F.use('component/pop_dialog', function (n) { n.Dialog.hide(); }); }; const y = function (n) { c = n, a = x(n.url), window._bd_share_main.F.use('weixin_popup.css', function () { m(), h(), f(); }); }; i.run = y; });
/* Клон ЛК РЭУ — интерактив (вкладки, сворачивания). Статическая копия. */
(function () {
  function init() {
    // Вкладки контактов: .personal__tabs-header li -> .personal__tabs-content .tab-item
    var heads = [].slice.call(document.querySelectorAll('.personal__tabs-header li'));
    var panes = [].slice.call(document.querySelectorAll('.personal__tabs-content .tab-item'));
    if (heads.length && panes.length) {
      panes.forEach(function (p, j) { p.style.display = (j === 0) ? 'block' : 'none'; });
      heads.forEach(function (li, i) {
        var t = li.querySelector('a') || li;
        t.addEventListener('click', function (e) {
          e.preventDefault();
          heads.forEach(function (h) { h.classList.remove('active'); });
          li.classList.add('active');
          panes.forEach(function (p, j) { p.style.display = (j === i) ? 'block' : 'none'; });
        });
      });
    }
    // Вкладки семестров (Зачётка и др. es-progress компоненты) — данные всех семестров в HTML
    document.querySelectorAll('.es-progress__tab').forEach(function (root) {
      var header = root.querySelector('.es-progress__tab-header');
      if (!header) return;
      var tabs = [].slice.call(header.querySelectorAll('li'));
      var body = null;
      for (var i = 0; i < root.children.length; i++) {
        if (/es-progress__tab-body/.test(root.children[i].className)) { body = root.children[i]; break; }
      }
      if (!body) return;
      var panels = [].slice.call(body.children).filter(function (c) { return /es-progress__tab-body-item/.test(c.className); });
      if (!tabs.length || !panels.length) return;
      tabs.forEach(function (tab, i) {
        tab.style.cursor = 'pointer';
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          panels.forEach(function (p, j) { p.style.display = (j === i) ? 'block' : 'none'; });
        });
      });
    });

    // Сворачиваемые карточки факультета
    document.querySelectorAll('.user-menu__drop').forEach(function (card) {
      var title = card.querySelector('.user-menu__drop-facility, .user-menu__drop-title, [class*="drop-title"]');
      var body = card.querySelector('.es-training, [class*="drop-body"], [class*="drop-content"]');
      if (title && body) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function () {
          body.style.display = (getComputedStyle(body).display === 'none') ? 'block' : 'none';
        });
      }
    });
    // "Показать(N)" — раскрыть скрытый блок рядом, если есть
    document.querySelectorAll('.es-training__desc').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        var box = el.parentElement && el.parentElement.querySelector('[style*="display: none"], [style*="display:none"], .hidden');
        if (box) box.style.display = 'block';
      });
    });
    // Заглушки для «мёртвых» ссылок (#) — не прыгать наверх
    document.querySelectorAll('a[href="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

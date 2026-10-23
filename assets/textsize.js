/* Text size slider: A to A, 50% to 300% in 5% steps, percentage shown, remembered on this device. */
(function () {
  var KEY = "ps-reading-size";
  function clamp(v) { v = Math.round(v / 5) * 5; return Math.min(300, Math.max(50, isNaN(v) ? 100 : v)); }
  function load() { try { return clamp(parseInt(localStorage.getItem(KEY), 10)); } catch (e) { return 100; } }
  var pct = load();
  function $(id) { return document.getElementById(id); }
  function apply() {
    document.documentElement.style.fontSize = (16 * pct / 100) + "px";
    if ($("ts-pct")) $("ts-pct").textContent = pct + "%";
    if ($("ts-now")) $("ts-now").textContent = pct + "%";
    if ($("ts-range")) $("ts-range").value = pct;
    if ($("ts-reset")) $("ts-reset").disabled = pct === 100;
  }
  function set(v) { pct = clamp(v); try { localStorage.setItem(KEY, String(pct)); } catch (e) {} apply(); }
  apply();
  document.addEventListener("DOMContentLoaded", function () {
    apply();
    var open = $("ts-open"), panel = $("ts-panel");
    if (!open) return;
    open.addEventListener("click", function (ev) { ev.stopPropagation(); var show = panel.hidden; panel.hidden = !show; open.setAttribute("aria-expanded", String(show)); });
    $("ts-range").addEventListener("input", function (ev) { set(parseInt(ev.target.value, 10)); });
    $("ts-reset").addEventListener("click", function () { set(100); });
    document.addEventListener("click", function (ev) { if (!panel.hidden && !panel.contains(ev.target)) { panel.hidden = true; open.setAttribute("aria-expanded", "false"); } });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") { panel.hidden = true; open.setAttribute("aria-expanded", "false"); } });
  });
})();

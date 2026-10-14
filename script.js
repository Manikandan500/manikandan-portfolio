/* Manikandan K — portfolio interactions */
(function () {
  "use strict";

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (links && nav) {
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            el.style.transitionDelay = delay + "ms";
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- active nav link ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("section[id]")
  );
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links > a[href^="#"]:not(.btn)')
  );

  function setActive() {
    var pos = window.scrollY + 140;
    var current = "";
    sections.forEach(function (s) {
      if (s.offsetTop <= pos) current = s.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- contact form → mailto ---------- */
  var form = document.getElementById("briefForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#fName");
      var email = form.querySelector("#fEmail");
      var type = form.querySelector("#fType");
      var msg = form.querySelector("#fMsg");
      var hint = document.getElementById("formHint");
      var ok = true;

      [name, email, msg].forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle("is-error", bad);
        if (bad) ok = false;
      });

      if (!ok) {
        if (hint) hint.textContent = "Please fill in your name, a valid email and a message.";
        return;
      }

      var subject = "[" + (type ? type.value : "Portfolio") + "] from " + name.value.trim();
      var body =
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n\n" +
        msg.value.trim();

      window.location.href =
        "mailto:manirani3596@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (hint) hint.textContent = "Opening your email app… if nothing happens, email manirani3596@gmail.com directly.";
    });
  }
})();

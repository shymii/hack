"use strict";

var alerts = document.querySelectorAll(".alert");
alerts.forEach(function (alert) {
  alert.addEventListener("click", function () {
    alert.classList.add("alert-hide");
  });
  setTimeout(function () {
    alert.classList.add("alert-hide");
  }, 3000);
});
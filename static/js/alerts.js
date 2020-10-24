const alerts = document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            alert.addEventListener("click", function() {
                alert.classList.add("alert-hide");
            })
            setTimeout(function(){ alert.classList.add("alert-hide"); }, 3000);
        })
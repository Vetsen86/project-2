$(document).ready(function() {
    $("#logout").click(function(event) {
        event.preventDefault();
        $.get("/logout").then(function(data) {
            console.log(data);
            window.location.replace("/");
        });
    });
});
$(document).ready(function() {
  
    // When the signup button is clicked, we validate the email and password are not blank
    $("#signupButton").click(function(event) {
      event.preventDefault();
      var userData = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim()
      };
  
      if (!userData.username || !userData.password) {
        alert("Please enter a username and password.")
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.username, userData.password);
      $("#username").val("");
      $("#password").val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, password) {
      $.post("/api/signup", {
        username: username,
        password: password
      })
        .then(function(data) {
          window.location.replace("/home");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      if(err.responseJSON.errors[0].path === "username") {
        alert(err.responseJSON.errors[0].message);
      } else {
        alert("Your password must be between 6 and 20 characters long.");
      }
    }
  });
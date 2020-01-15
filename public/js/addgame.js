$(document).ready(function() {

    $("#addSubmit").click(function(event) {
        event.preventDefault();

        var addData = {
            gameName: $("#game").val().trim(),
            retailerName: $("#retailer").val().trim(),
            price: $("#price").val(),
            platform: $("#platform").val().trim()
        }

        if(!addData.gameName || !addData.retailerName || !addData.price) {
            alert("All fields must be filled out!");
            return;
        } else if (addData.price < 0) {
            alert("Price must be a positive number!");
            return;
        }

        $("#game").val("");
        $("#retailer").val("");
        $("#price").val("");
        $("#platform").val("");

        addGame(addData);
    });

    function addGame(addData) {
        $.post("/api/addgame", addData)
            .then(function(data) {
                addData.GameId = data[0].id;
                addRetailer(addData);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function addRetailer(addData) {
        $.post("/api/addretailer", addData)
            .then(function(data) {
                // if(!data[1]) {
                //     updateRetailer(addData);
                // } else {
                //     alert("Retailer information added!");
                // }
                addData.RetailerId = data[0].id;
                addPlatform(addData);
            }).catch(function(err) {
                console.log(err);
            });
    }

    function addPlatform(addData) {
        $.post("/api/addplatform", addData)
            .then(function(data) {
                if(!data[1]) {
                    updatePlatform(addData);
                } else {
                    alert("Platform information added!");
                }
            }).catch(function(err) {
                console.log(err);
            });
    }

    function updatePlatform(addData) {

        $.ajax({
            method: "PUT",
            url: "/api/updateplatform",
            data: addData
          }).then(function(data) {
              alert("Platform information updated");
          }).catch(function(err) {
              console.log(err);
          });
    }
    
  });
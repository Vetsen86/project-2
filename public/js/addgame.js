$(document).ready(function() {

    $("#addSubmit").click(function(event) {
        event.preventDefault();

        var addData = {
            gameName: $("#game").val().trim(),
            retailerName: $("#retailer").val().trim(),
            price: $("#price").val()
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
                if(!data[1]) {
                    updateRetailer(addData);
                } else {
                    alert("Retailer information added!");
                }
            }).catch(function(err) {
                console.log(err);
            });
    }

    function updateRetailer(addData) {

        $.ajax({
            method: "PUT",
            url: "/api/updateretailer",
            data: addData
          }).then(function(data) {
              alert("Retailer information updated");
              console.log(data);
          }).catch(function(err) {
              console.log(err);
          });
    }
    
  });
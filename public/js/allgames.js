$(document).ready(function() {


    $.get("/api/all").then(function(games) {
        console.log(games);
        renderGames(games);
    });

    function renderGames(games) {

        var header = $("<h1>");
        header.text("All Games:");
        header.addClass("text-center");

        $("#games").prepend(header);

        for (var i = 0; i < games.length; i++) {
            var newCard = $("<div>");
            newCard.addClass("card");

            var newCardHeader = $("<div>");
            newCardHeader.addClass("card-header");
            newCardHeader.attr("id", "heading-" + i);
            

            var newButton = $("<button>");
            newButton.addClass("btn");
            newButton.addClass("btn-link");
            newButton.addClass("collapsed");
            newButton.addClass("game-button");
            newButton.attr("type", "button");
            newButton.attr("data-toggle", "collapse");
            newButton.attr("data-target", "#collapse-" + i);
            newButton.attr("aria-expanded", "false");
            newButton.attr("aria-controls", "collapse-" + i);
            newButton.text(games[i].name);

            newCardHeader.append(newButton);
            newCard.append(newCardHeader);

            var newCollapse = $("<div>");
            newCollapse.addClass("collapse");
            newCollapse.attr("id", "collapse-" + i);
            newCollapse.attr("aria-labelledby", "heading-" + i);
            newCollapse.attr("data-parent", "#gamesAccordion");

            var newCardBody = $("<div>");
            newCardBody.addClass("card-body");

            for (var j = 0; j < games[i].Retailers.length; j++) {
                var newRetailer = $("<p>");

                var newRetailerText = games[i].Retailers[j].name + ": ";

                newRetailer.text(newRetailerText);
                newCardBody.append(newRetailer);
                
                var newPlatformList = $("<ul>");

                for(var k = 0; k < games[i].Retailers[j].Platforms.length; k++) {

                    var platform = games[i].Retailers[j].Platforms[k];

                    var newPlatform = $("<li>");

                    var platformText = platform.name + ": $" + platform.price;

                    var updatedAt = new Date(platform.updatedAt);

                    platformText += "\nLast updated: " + (updatedAt.getMonth() + 1) + "/" + updatedAt.getDate() + "/" + updatedAt.getFullYear();

                    newPlatform.text(platformText);

                    newPlatformList.append(newPlatform);
                }

                newCardBody.append(newPlatformList);
            }

            var saveButton = $("<button>");
            saveButton.addClass("btn");
            saveButton.addClass("btn-large");
            saveButton.addClass("btn-primary");
            saveButton.addClass("save");
            saveButton.data("game", games[i].id);
            saveButton.text("Save to Your List");

            newCardBody.append(saveButton);

            newCollapse.append(newCardBody);
            newCard.append(newCollapse);
            $("#gamesAccordion").append(newCard);
        }
    }

    $("body").on("click", ".save", function() {
        var gameId = $(this).data("game");
        getUserId(gameId);
    });

    function getUserId(gameId) {
        $.get("/api/user_data").then(function(user) {
            var userId = user.id;
            saveFavorite(userId, gameId);
        });
    }

    function saveFavorite(userId, gameId) {
        $.post("/api/findorcreatefavorite", {
            UserId: userId,
            GameId: gameId
        }).then(function(data) {
            if(data[1] === false) {
                alert("This game is already saved to your favorites!");
            } else { 
                alert("Game saved to favorites");
            }
            console.log(data);
        });
    }

});
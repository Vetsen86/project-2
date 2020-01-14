$(document).ready(function() {

    $.get("/api/user_data").then(function(user) {
        getFavoriteIds(user);
    });

    function getFavoriteIds(user) {
        //if (user) {
        $.post("/api/getfavoriteids", { UserId: user.id }).then(function(data) {
            var gamesArray = [];
            // console.log(data);
            for (i = 0; i < data.length; i++) {
                gamesArray.push({ id: data[i].GameId });
            }
            console.log(gamesArray);

            if (gamesArray.length === 0) {
                noGames();
                return;
            }

            getFavoriteGames(gamesArray);
        });
       // }
    }

    function getFavoriteGames(gamesArray) {
        $.post("/api/getfavoritegames",
            {
                games: gamesArray
            }
        ).then(function(games) {
            console.log(games);
            renderGames(games);
        });
    }

    function renderGames(games) {
        var header = $("<h1>");
        header.text("Your Games:");
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

                var newText = games[i].Retailers[j].name + ": $" + games[i].Retailers[j].price;

                var updatedAt = new Date(games[i].Retailers[j].updatedAt);

                newText += "\nLast updated: " + (updatedAt.getMonth() + 1) + "/" + updatedAt.getDate() + "/" + updatedAt.getFullYear();

                newRetailer.text(newText);
                newCardBody.append(newRetailer);
            }

            newCollapse.append(newCardBody);
            newCard.append(newCollapse);
            $("#gamesAccordion").append(newCard);
        }
    }

    function noGames() {
        var newCard = $("<div>");
        newCard.addClass("card");
        newCard.attr("id", "no-games");

        var newCardHeader = $("<div>");
        newCardHeader.addClass("card-header");
        newCardHeader.attr("id", "no-games-header");

        var noGamesHeader = $("<h1>");
        noGamesHeader.text("You have no saved games!");

        newCardHeader.append(noGamesHeader);
        newCard.append(newCardHeader);

        var newCardBody = $("<div>");
        newCardBody.addClass("card-body");

        var noGamesButton = $("<a>");
        noGamesButton.addClass("btn");
        noGamesButton.addClass("btn-large");
        noGamesButton.addClass("btn-primary");
        noGamesButton.attr("href", "/all");
        noGamesButton.text("Browse Games");

        newCardBody.append(noGamesButton);
        newCard.append(newCardBody);
        $("#games").append(newCard);
    }

});
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/addgame", function(req, res) {
    db.Game.findOrCreate({ where: { name: req.body.gameName }})
      .then(function(game) {
        res.json(game);
      });
  });

  app.post("/api/addretailer", function(req, res) {
    db.Retailer.findOrCreate({ 
      where: { 
        name: req.body.retailerName,
        GameId: req.body.GameId
      },
      defaults: {
        price: req.body.price
      }
    }).then(function(retailer) {
      res.json(retailer);
    });
  });

  app.post("/api/findorcreatefavorite", function(req, res) {
    db.Favorite.findOrCreate({
      where: {
        UserId: req.body.UserId,
        GameId: req.body.GameId
      }
    }).then(function(favorite) {
      res.json(favorite);
    });
  });

  app.post("/api/getfavoriteids", function(req, res) {
    console.log(req.body);
    if(req.body.UserId) {
    db.Favorite.findAll({ where: { UserId: req.body.UserId }})
      .then(function(favorites) {
        res.json(favorites);
      });
    }
  });

  app.post("/api/getfavoritegames", function(req, res) {
    db.Game.findAll({where: { [Op.or]: req.body.games },
      include: [db.Retailer]
    })
      .then(function(favorites) {
        res.json(favorites);
      });
  });

  app.put("/api/updateretailer", function(req, res) {
    db.Retailer.update({ price: req.body.price },
      {
        where: {
          name: req.body.retailerName,
          GameId: req.body.GameId
        }
      }).then(function(retailer) {
        res.json(retailer);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  

  app.get("/api/all", function(req, res) {
    db.Game.findAll({
      include: [db.Retailer]
    }).then(function(games) {
      res.json(games);
    })
  });

  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};

var path = require("path");
var friends = require("../data/friends.js")

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  })

  app.post("/api/friends", function (req, res) {
    var results = req.body;
    var friend = {
      Name: results.name,
      Photo: results.photo,
      Responses: [results.q1, results.q2, results.q3, results.q4, results.q5, results.q6, results.q7, results.q8, results.q9, results.q10],
      Matches: []
    };
    
    totalDiffArr = [];
    
    for (var i = 0; i < friend.Responses.length; i++) {
      var totalDiff = 0;
      for (var j = 0; j < 10; j++) {
        var x = parseInt(friend.Response[j]);
        var y = parseInt(friends[i].Responses[j]);

        var diff = Math.abs(x-y);

        totalDiff =+ diff;
      }

      totalDiffArr.push(totalDiff);
    }

    var matchVal = Math.min(...totalDiffArr).toString();
    var matchInd = friends.indexOf(matchVal);

    var matchName = friends[matchInd].name;

    friend.Matches.push(matchName);

    friends.push(friend);
    
    console.log(friends);
    res.redirect("/api/friends");
  })
}
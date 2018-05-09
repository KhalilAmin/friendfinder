var path = require("path");
var friends = require("../data/friends.js")

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  })

  app.post("/api/friends", function (req, res) {
    var results = req.body;
    var newFriend = {
      Name: results.name,
      Photo: results.photo,
      Responses: [parseInt(results.q1), parseInt(results.q2), parseInt(results.q3), parseInt(results.q4), parseInt(results.q5), parseInt(results.q6), parseInt(results.q7), parseInt(results.q8), parseInt(results.q9), parseInt(results.q10)],
      Matches: []
    };
    
    totalDiffArr = [];
    
    for (var i = 0; i < friends.length; i++) {
      var totalDiff = 0;
      for (var j = 0; j < 10; j++) {
        var x = parseInt(newFriend.Responses[j]);
        var y = parseInt(friends[i].Responses[j]);

        var diff = Math.abs(x-y);

        totalDiff += diff;
      }

      totalDiffArr.push(totalDiff);
    }

    console.log(newFriend);
    console.log(totalDiffArr);
    var matchVal = Math.min(...totalDiffArr);
    var matchInd = totalDiffArr.indexOf(matchVal);
    console.log(matchVal);
    console.log(matchInd);
    var matchName = friends[matchInd].Name;

    newFriend.Matches.push(matchName);

    friends.push(newFriend);
    
    console.log(friends);
    res.redirect("/api/friends");
  })
}
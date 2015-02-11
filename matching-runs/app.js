(function() {
  var convert = function() {
    var inputData = $("textarea#input-data").val();
    var url = "https://salty-brushlands-1053.herokuapp.com/match";
    var postData = {
      data: inputData,
      operation: "optimal",
      altruistic_chain_length: "1"
    };
    $.post(
      url, postData, processResponse
    )
      .fail(function() {
        $("code#results").text("");
        alert("An error occurred when attempting to call the matching service at " + url);
      });
  };

  var processResponse = function(d) {
    $("code#results").text(d);
  };

  $("#submit-input").click(convert);
})();

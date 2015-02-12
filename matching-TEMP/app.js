(function() {
  var convert = function() {
    $("code#results").text("Finding optimal set of exchanges. This could take up to ten seconds.");
    var inputData = $("textarea#input-data").val();
    var url = "http://localhost:5000";
    var postData = {
      data: inputData,
      cycle_length: "3",
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
    $("code#results").text(d.patients);
  };

  $("#submit-input").click(convert);
})();

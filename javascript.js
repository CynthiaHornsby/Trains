var config = {
    apiKey: "AIzaSyArvnE8wkuu3296mW1ogRe0pYYtnIER6Zw",
    authDomain: "project-33519.firebaseapp.com",
    databaseURL: "https://project-33519.firebaseio.com",
    projectId: "project-33519",
    storageBucket: "project-33519.appspot.com",
    messagingSenderId: "640816036680"
};
firebase.initializeApp(config);

var db = firebase.database();

$("#adding").on("click", function() {

    var name = $("#name").val();
    var destination = $("#destination").val();
    var start = $("#start").val();
    var frequency = $("#frequency").val();

    if (destination === "") {
        destination = "--";
    }
    if (name === "") {
        name = "--";
    }
    if (start === "") {
        start = "--";
    }
    if (frequency === "") {
        frequency = "--";
    }

    var startTime = moment(start, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(startTime), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutes = frequency - tRemainder;
    console.log(tMinutes);

    var nextTrain = moment().add(tMinutes, "minutes").format("hh:mm");



    db.ref().push({
        name: name,
        destination: destination,
        start: start,
        frequency: frequency,
        tMinutes: tMinutes,
        nextTrain: nextTrain,
    });
});

db.ref().on("child_added", function(snapshot) {


    $(".train").append("<p>" + snapshot.val().name + "</p>");
    $(".role").append("<p>" + snapshot.val().destination + "</p>");
    $(".start").append("<p>" + snapshot.val().frequency + "</p>");
    $(".next").append("<p>" + snapshot.val().tMinutes + " minutes" + "</p>");
    $(".rate").append("<p>" + snapshot.val().nextTrain + "</p>");
});

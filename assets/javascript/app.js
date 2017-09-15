$(document).ready(function(event) {

  var config = {
    apiKey: "AIzaSyCtSF4YIGPRth0JGAlaBk1HdgbnHkMKwOs",
    authDomain: "train-scheduler-3a7f8.firebaseapp.com",
    databaseURL: "https://train-scheduler-3a7f8.firebaseio.com",
    projectId: "train-scheduler-3a7f8",
    storageBucket: "train-scheduler-3a7f8.appspot.com",
    messagingSenderId: "1026859941580"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";

  $("#submit").focus().on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    console.log(trainName);

    destination = $("#destination").val().trim();
    console.log(destination);

    firstTrain = $("#firstTrain").val().trim();
    console.log(firstTrain);

    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });

  database.ref().on("child_added", function(snapshot) {

  var sv = snapshot.val();

    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);    

    var tFrequency = sv.frequency;

    var firstTime = sv.firstTrain;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    var minutesUntilTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(minutesUntilTrain).format("hh:mm a");
    console.log(nextArrival);

    var entry = $("#table").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>");

    console.log(entry);

});

});



var Debugging = {
  failureMessagesQueue: function() {
    window.Trinkbrunnen.MessageHandler.addMessage("apfel1");
    window.Trinkbrunnen.MessageHandler.addMessage("apfel3");
    window.Trinkbrunnen.MessageHandler.addMessage("apfel4");
    window.Trinkbrunnen.MessageHandler.addMessage("apfel5");
    setTimeout(function() {
      window.Trinkbrunnen.MessageHandler.addMessage("apfel2");
    }, 14000);
    setTimeout(function() {
      window.Trinkbrunnen.MessageHandler.addMessage("apfel2");
    }, 17450);
  },
  userLocationChange: function(){
    var randomLatitude = Math.random();
    window.Trinkbrunnen.Models.userLocation.set({latitude: (47 + randomLatitude)});
  }
}

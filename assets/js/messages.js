window.Trinkbrunnen.MessageHandler = {
  queue: new Array(),
  isShowingMessage: false,
  addMessage: function(message) {
    if (message == "" || message == null) {
      return;
    } else {
      this.queue.push(message);
    }

    //call only once the showMessage function
    if (!this.isShowingMessage) {
      this.showMessage();
    }
  },
  showMessage: function() {
    var self = this;

    if (window.Trinkbrunnen.isMobile()) {
      //$('#spin').hide();
    }

    if (this.queue.length > 0) {
      this.isShowingMessage = true;
      $('#failure_message').text(this.queue.shift());

      setTimeout(function() {
        if (self.queue.length == 0) {
          self.isShowingMessage = false;
          $('#failure').fadeOut();
        } else {
          self.showMessage();
        }
      }, 3500);
    }

    if ($('#failure').is(':hidden')) {
      $('#failure').show();
    }
  },
  messages: {
    position: {
      error: {
        standard: "Fehler bei der Positionsbestimmung!",
        timeout: "Zeitüberschreitung beim Ermitteln der Position!",
        denied: "Zugriff auf Position verweigert!",
        unavailable: "Position konnte nicht ermittelt werden!",
        unknown: "Positionsbestimmung zur Zeit nicht möglich!",
        unsupported: "Ihr Gerät unterstützt keine Positionsbestimmung!"
      }
    },
    route: {
      error: "Keine Route gefunden!"
    },
    fountain: {
      error: {
        unloadable: "Trinkbrunnen konnten nicht geladen werden!"
      }
    },
    feed: {
      error: {
        unloadable: "News konnten nicht geladen werden!"
      }
    },
    state: {
      offline: "Bitte stellen Sie eine Verbindung mit dem Internet her!"
    }
  }
};

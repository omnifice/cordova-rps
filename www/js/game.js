


var game = {
  
  // ********************************
  // Flags
  // ********************************
  _DEBUG: true, // Flag for controlling debugging output to console.
  
  // ********************************
  // Object variables
  // ********************************
  _dataStore: '',
  _dataFile: 'userdata.json',
  _userData: {},
  $_pageContainer: $('body'),
  _pages: { 
    home: '#homePage',
    settings: '#settingsPage',
    scores: '#scoresPage',
    rules: '#rulesPage',
    solo: '#vsComputerPage',
    oponent: '#vsHumanPage'
  },
  
   
  // ********************************
  // Primary Functions
  // ********************************
  
  //
  // Game initialization.
  // This is called from the deviceready function in index.js
  //
  initialize: function() {
    game._debug('game.initialize called');
    
    // Initialize the pagecontainer.
    $(game.$_pageContainer).pagecontainer({ defaults: false });
    
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, game.fileSystemSuccess, game.fileSystemError);
    
    
  },
  
  
  
  
  
  // ********************************
  // Utility functions.
  // ********************************
  
  //
  // Debug output.
  //
  _debug: function(msg) {
    if (game._DEBUG === true) {
      console.debug('DEBUG: ' + msg);
    }
  },
  
  
  //
  // File system request handler
  //
  fileSystemSuccess: function(fileSystem) {
    game._dataStore = fileSystem.root;
    game._debug('Got filesystem: ' + game._dataStore);
    
    game._dataStore.getFile(game._dataFile, {create: true, exclusive: false}, function(fileEntry) {
      game._debug('Got data file pointer.');
      
      if (fileEntry.file.length > 1) {
        // Read the file.
        game._debug(game._dataFile + ' found.');
        game.readUserData(fileEntry);
      }
      else {
        // TODO: Show the settings page for now...need to pull from server eventually.
        
        // TODO: Add timeout before changing page...or implement a splashscreen...
        $(game.$_pageContainer).pagecontainer('change', game._pages['settings']);
        game._debug('Should change page...');
        // TODO: Add popup indicating why on the settings page...e.g.: "Looks like you're new here..."
        
      }
    },
    function(err) {
      game._debug('Error getting pointer to file. Code: ' + err.code);
      // TODO: Decide what to display to the user...
      
    });
    
  },
  
  
  //
  // Read user data.
  //
  readUserData: function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      
      reader.onloadend = function(e) {
        game._debug('Read datafile okay.');
        game._userData = JSON.parse(this.result);
      };
      reader.readAsText(file);
    },
    game.fileReadError);
  },
  
  
  //
  // File errors
  //
  fileSystemError: function(err) {
    game._debug('Error getting pointer to file system: ' + err.code);
    // TODO: Decide what to display to the user...
    
  },
  
  fileReadError: function(err) {
    game._debug('Error reading file: ' + err.code);
    // TODO: Decide what to display to the user...
    
  }
}

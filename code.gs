  var Route = {};
  Route.path = function(route,callback){
    Route[route] = callback;
  }

  var user = '';

  function doPost(e){
    Logger.log('link:'+JSON.stringify(e));

    if (typeof e != 'undefined' && e.parameters.email != 'undefined'){
        var uname = e.parameters.email;var pswrd = e.parameters.password;
      let names = checkLogin(uname,pswrd);
      if (names[0] == 'TRUE'){
          //var t = HtmlService.createTemplateFromFile('dash');t.name = uname;
        user=uname;//t.hash=names[1];
          //t.serviceUrl = ScriptApp.getService().getUrl();    
        return render('dash',{name:uname.toString().toUpperCase(),hash:names[1]});
      }else{
        return render('index',{error:'Wrong ID or Password'});
      }
    }else{
      return render('index',{error:''});
    }
  }

  function doGet(e) {
    Logger.log('link:'+JSON.stringify(e));Logger.log('value:'+e.parameters.v);

    if (e.parameters.v == "form"){

    }else if (e.parameters.v == "out"){
      Logger.log('value: out');
      return render('index',{error:''});
    }else{

      Logger.log('value: else index');
      return render('index',{error:''});
    }
  }



  function checkLogin(username, password){
    //Logger.log('val:'+username+password);
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    var getLastRow = ws.getLastRow();
    var found_record = '';var hash='';
    for(var i = 1; i < getLastRow; i++){
      if (ws.getRange(i, 1).getValue().toString().toUpperCase() == username.toString().toUpperCase() && ws.getRange(i, 2).getValue().toString().toUpperCase() == password.toString().toUpperCase()){
          found_record = 'TRUE';var d = new Date();
          var formattedDate = Utilities.formatDate(new Date(), "BST", "dd-MM-yy HH:mm:ss a");
          hash=createHash(ws.getRange(i, 1).getValue().toString()+d.toLocaleTimeString()+d.toDateString());
          ws.getRange(i,3).setValue(hash);//d.toLocaleTimeString()+' '+d.toDateString()
          ws.getRange(i,4).setValue(formattedDate);
          }
    }
    Logger.log('val:'+found_record+'='+getLastRow);
    if (found_record == ''){
      found_record = 'FALSE';
    }
    return [found_record,hash];
  }

  function newway(){
    return HtmlService.createHtmlOutputFromFile('newentry').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  function errorMsg(){
    Browser.msgBox("Wrong id and password");
  }

  function loadAbout(){
    return render('about');
  }


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function render(file,argsObject){
  var tmp = HtmlService.createTemplateFromFile(file);
  if (argsObject){
    var keys = Object.keys(argsObject);
    keys.forEach(function(key){
      tmp[key] = argsObject[key];
    });
  }
  return tmp.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function appendRow(d1,d2,d3,d4,d5,d6,d7,d8,d9){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var getLastRow = ws.getLastRow();
  ws.appendRow([d1,new Date(),d3,d4,d5,d6,d7,d8,d9]);
  return 'ok';
}
//get ref dr name for auto complete
function getList(){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var list = ws.getRange(2,7,ws.getLastRow()-1,1).getValues();
  var values = {};
  list.forEach(function(v){
    values[v[0]] = null;
  });
  return values;
}
//get money receipt number
function getSerial(){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var getLastRow = ws.getLastRow();
  var serial = ws.getRange("A"+getLastRow).getValue();
  Logger.log((serial+1).toString());
  return (serial+1).toString();
}
//get search result by phone number
function rowOfNum(value){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var list = ws.getDataRange().getValues();var rowval = '';
  list.reverse();
  for (var i = 1; i<list.length;i++){
    if (list[i][4].toString() == value.toString()){
      rowval = i;break;
    }
  }
  if (rowval == ''){
    return null;
  }else{
    return [list[rowval][2],list[rowval][3],list[rowval][4],list[rowval][6],list[rowval][7],list[rowval][8]];
  }
}

function getData(){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var list = ws.getDataRange().getValues();
  list.reverse();Logger.log(list);
  return JSON.stringify(list);
}

function test(){
  Logger.log(getData());
}

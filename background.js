var target_page = "https://www.codechef.com/*";


function sendmessage1(id,csrf_token)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response);
    });
  });
}





function check(details)
{
    console.log(details)
    var url_string = details.url;
    var index = url_string.indexOf("solution_id=");
    if(index != -1)
    {
      var csrf_token = details.requestHeaders[2].value
      console.log(csrf_token)
      var id = url_string.substr(index+12);
      var key = id;
      var value = id;
      var store={};
      store[key]=value;
      chrome.storage.sync.get(id,function(key_values){
        if(Object.keys(key_values).length!=0)
        {
            console.log(key_values[id])
        }
        else{
          chrome.storage.sync.set(store, function() {
            console.log('Value is set to ' + value);
          });
          sendmessage1(id,csrf_token);
        }
      })
    }
}


chrome.webRequest.onBeforeSendHeaders.addListener(check,{urls:[target_page]},
["blocking", "requestHeaders"])




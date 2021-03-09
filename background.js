


chrome.runtime.onInstalled.addListener(() => {
    // chrome.storage.sync.set({ color });
    console.log('initialsed');
  });


var target_page = "https://www.codechef.com/*";

function check(details)
{
    console.log(details.url)
    var url_string = details.url;
    var index = url_string.indexOf("solution_id=");
    if(index != -1)
    {
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
        }
      })
    }
}
chrome.webRequest.onBeforeSendHeaders.addListener(check,{urls:[target_page]},
["blocking", "requestHeaders"])


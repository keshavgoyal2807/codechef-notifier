var target_page = "https://www.codechef.com/*";


// pinging codechef server.

function checkResult(id,csrf_token,url,problem_details)
{
    $.ajax({
      url:url,
      dataType:"json",
      headers:{
          "x-csrf-token":csrf_token
      },
      success:function(data,status,xhr)
      {
        console.log(data)
        console.log(status)
        console.log(xhr)
        if(data.result_code==="wait")
        {
          checkResult(id,csrf_token,url,problem_details);
        }
        else
        {
            notification_id = `Verdict for Problem id:${id}`
            notification_msg = `The Verdict for the problem submission with id :${id} is ${data.result_code}`
            console.log(problem_details)

            var notification_details={
              type:"list",
              title:`Problem Code : ${problem_details.id}`,
              message:`Verdict: - ${data.result_code}`,
              items:[{title:'Time',message:`${data.time}`}],
              iconUrl:'icon2.jpg'
            }
            chrome.notifications.create(notification_id,notification_details,
            function(details){
                console.log(details)
            }
            )
        }
      },
      error:function(xhr,type_of_error,exception)
      {
          console.log(xhr)
          console.log(type_of_error)
      }
    })

}










// sending message to content scirpt and getting info related to problem.
function sendmessage1(id,csrf_token,url)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response);
      var store={};
      store[id]=response;
      chrome.storage.sync.remove(id,function(){
        console.log("successfully_removed");
      })
      chrome.storage.sync.set(store,function(){
        console.log(store)
        checkResult(id,csrf_token,url,store[id])
        // setInterval(checkResult,1000,id,csrf_token,url)
      })
    });
  });
}


// listener function for webreqeuest.
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
            // checkResult(id,csrf_token,url_string)
        }
        else{
          chrome.storage.sync.set(store, function() {
            console.log('Value is set to ' + value);
          });
          sendmessage1(id,csrf_token,url_string);
        }
      })
    }
}


chrome.webRequest.onBeforeSendHeaders.addListener(check,{urls:[target_page]},
["blocking", "requestHeaders"])




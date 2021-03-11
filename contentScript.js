console.log("Successfully Injected")

var problem_name = document.getElementsByClassName('breadcrumb')[0].children[3].outerText;

var problem_id = document.getElementsByClassName('run-details-info')[0].children[1].children[1].outerText;


var problem_details = {
  name : problem_name,
  id : problem_id
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
    {
      console.log("got from background script")
      sendResponse(problem_details);
    }
  }
);

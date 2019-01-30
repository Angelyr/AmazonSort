//sends message to content.js to sort page every 3 seconds
setInterval(sortMsg, 1000);
function sortMsg(){
    chrome.storage.sync.get("autoSort", function(data) {
        if(data.autoSort == true){
            var params = {active: true, currentWindow: true}
            chrome.tabs.query(params, gotTabs);
            function gotTabs(tabs) {
                if(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {id: "sort"});
                }
            }
        }
    });
}
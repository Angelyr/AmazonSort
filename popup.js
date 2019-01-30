//Sends sort message to tab when sortBtn is clicked
document.getElementById("sortBtn").addEventListener("click", function(){
    var params = {active: true, currentWindow: true}
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, {id: "sort"});
	}
});

//Detects change to autoSort and stores it
var autoSort = document.getElementById("autoSort");
autoSort.addEventListener("click", function(){
	chrome.storage.sync.set({ autoSort: autoSort.checked });
});
chrome.storage.sync.get("autoSort", function(data) {
	if(data.autoSort != null){
		autoSort.checked = data.autoSort;
    }
    else {
        autoSort.checked = true;
        chrome.storage.sync.set({ autoSort: autoSort.checked });
    }
});

//Detects change to sortReviews and stores it
var sortReviews = document.getElementById("sortReviews");
sortReviews.addEventListener("click", function(){
	chrome.storage.sync.set({ sortReviews: sortReviews.checked });
});
chrome.storage.sync.get("sortReviews", function(data) {
	if(data.sortReviews !=  null){
		sortReviews.checked = data.sortReviews;
    }
    else {
        sortReviews.checked = true;
        chrome.storage.sync.set({ sortReviews: sortReviews.checked });
    }
});

//Detects change to minRating and stores it
var minRating = document.getElementById("minRating");
minRating.addEventListener("change", function(){
	chrome.storage.sync.set({ minRating: minRating.value });
});
chrome.storage.sync.get("minRating", function(data) {
	if(data.minRating != null){
		minRating.value = data.minRating;
    }
    else {
        minRating.value = 0;
        chrome.storage.sync.set({ minRating: minRating.value });
    }
});

//Detects change to minReviews and stores it
var minReviews = document.getElementById("minReviews");
minReviews.addEventListener("change", function(){
	chrome.storage.sync.set({ minReviews: minReviews.value });
});
chrome.storage.sync.get("minReviews", function(data) {
	if(data.minReviews != null){
		minReviews.value = data.minReviews;
    }
    else {
        minReviews.value = 0;
        chrome.storage.sync.set({ minReviews: minReviews.value });
    }
});

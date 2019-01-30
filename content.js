//Recieves message from components to sort
chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {
	if(request.id = "sort"){
		sortPage();
	}
}

//gets data from settings then calls sort
var minReviews = 0;
var minRating = 0;
function sortPage(){
	chrome.storage.sync.get("minReviews", function(data) {
		if(data){
			minReviews = data.minReviews;
			chrome.storage.sync.get("minRating", function(data) {
				if(data){
					minRating = data.minRating;
					sort();
				}
			});
		}
	});
}

//for each search result gets the score out of 5 stars and it gets the number of ratings and
//stores is in results[]
function sort(){
	var results = [];
	var searchList = document.getElementById("s-results-list-atf");
    if(!searchList) return;
    //for each search result
    searchList = searchList.getElementsByTagName("li");
	for(var i = 0; i < searchList.length; i++){
        //move showcase items to the top
        var showcase = searchList[i].getElementsByClassName("acs-showcase-result-item");
        if(showcase.length > 0){
            results.push({numRatings: Number.MAX_SAFE_INTEGER, score:-1, li: searchList[i]});
            continue;
        }
		var ratings = searchList[i].getElementsByClassName("a-row");
		//for each rating
		for(var j = 0; j < ratings.length; j++){
			//retrieves score
			var score = ratings[j].getElementsByClassName("a-icon-alt");
			if(!score.length) continue;
			score = Number(score[0].outerText.split(" ")[0]);
			//retrieves number of ratings
			var numRatings = ratings[j].getElementsByClassName("a-size-small a-link-normal a-text-normal");
			if(!numRatings.length) continue;
			numRatings = Number(numRatings[0].outerText.replace(",",""));
			//checks settings
			if(!score || !numRatings) continue;
			if(score < minRating || numRatings < minReviews) continue;
            //add list item 
            results.push({numRatings,score, li: searchList[i]});
		}
    }
    //sorts results if setting is enabled
    chrome.storage.sync.get("sortReviews", function(data) {
        if(data && data.sortReviews == true){
            results.sort(function(a,b){return b.numRatings - a.numRatings;});
        }
        print(results);
    });
}



//Replaces the results list on Amazon whith the one in results
function print(results){
	var resultsList = document.getElementById("s-results-list-atf");
	resultsList.innerHTML = '';
	for(var i = 0; i < results.length; i++){
		resultsList.appendChild(results[i].li);
	}
}
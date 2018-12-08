$.getJSON("../data/data.json").then(function(data){
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        let currentSite = request.title;
        let regx = /(https?:\/\/(.+?\.)?google(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/
        if(!request.id) request.id = sender.tab.id;
        
        if(regx.test(request.url)){
            if(currentSite.indexOf("Google Search") > -1){  
                setBadge(data.googleSearch.length,request.id)
                sendResponse({title:"Google Search",data:data.googleSearch}) 
            }
            if(currentSite.indexOf("Google Maps") > -1){ 
                setBadge(data.googleMaps.length,request.id)
                sendResponse({title:"Google Maps",data:data.googleMaps})
            }
            if(currentSite.indexOf("Google Scholar") > -1){ 
                setBadge(data.googleScholar.length,request.id)
                sendResponse({title:"Google Scholar",data:data.googleScholar}) 
            }
        }  
          return true; 
        });
    
})

function setBadge(data,id){
    chrome.browserAction.setBadgeText({text:data.toString(),tabId:id});
    chrome.browserAction.setBadgeBackgroundColor({color:"#366f2f"})
}

$.getJSON("../data/data.json").then(function (data) {

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        let currentSite = request.title;
        let regxAllDomains = /(https?:\/\/(.+?\.)?google(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;
        let regxGoogleHome = /(http:\/\/|https:\/\/)(www.google|google)+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?/;
        if (!request.id) request.id = sender.tab.id;
        if (regxAllDomains.test(request.url)) {
            // Logic to match url with database
            if (request.title === "Google") {
                if (regxGoogleHome.test(request.url)) {
                    redirectCheck(data[0],request.id,sendResponse);
                }
            }
            data.forEach(product => {
                if (currentSite.indexOf(product.title) > -1) {
                    redirectCheck(product,request.id,sendResponse);
                }
            });
        }
        return true;
    });
})

//Redirect user to alternative if enabled 
function redirectCheck(product,tabId,sendResponse) {
    chrome.storage.sync.get({
        redirectEnabled: false
    }, function (items) {
        if (items.redirectEnabled) {
            chrome.tabs.update(tabId, {url: product.alternatives[0].url});
        } 
        else {
            setBadge(product.alternatives.length, tabId)
            sendResponse({
                title: product.title,
                data: product.alternatives
            })
        }
    })
}

function setBadge(data, id) {
    chrome.browserAction.setBadgeText({
        text: data.toString(),
        tabId: id
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#366f2f"
    })
}
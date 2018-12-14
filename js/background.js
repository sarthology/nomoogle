$.getJSON("../data/data.json").then(function (data) {

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        let currentSite = request.title;
        let regxAllDomains = /(https?:\/\/(.+?\.)?google(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;
        let regxGoogleHome = /(http:\/\/|https:\/\/)(www.google|google)+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?/;
        if (!request.id) request.id = sender.tab.id;

        if (regxAllDomains.test(request.url)) {
            if(request.title === "Google"){
                if(regxGoogleHome.test(request.url)){
                    setBadge(data[0].alternatives.length, request.id)
                    sendResponse({
                        title: data[0].title,
                        data: data[0].alternatives
                    })
                }
            }
            data.forEach(product => {
                if (currentSite.indexOf(product.title) > -1) {
                    setBadge(product.alternatives.length, request.id)
                    sendResponse({
                        title: product.title,
                        data: product.alternatives
                    })
                }
            });
        }
        return true;
    });

})

function setBadge(data, id) {
    chrome.browserAction.setBadgeText({
        text: data.toString(),
        tabId: id
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#366f2f"
    })
}
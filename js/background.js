$.getJSON("../data/data.json").then(function (data) {

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        let currentSite = request.title;
        let regx = /(https?:\/\/(.+?\.)?google(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/
        if (!request.id) request.id = sender.tab.id;

        if (regx.test(request.url)) {
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
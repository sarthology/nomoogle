let currentTabInfo = {
    "url": window.location.href,
    "title": $(document).find("title").text()
}


chrome.runtime.sendMessage(currentTabInfo, function (response) {
    if (response) {
        $("body").append(`<div class='stopMessage'>
        <div class='shallNotPass'></div>
        <p class='messageText'> You shall not pass!!</p>
        <p class="closeButton">x</p>
        <p class="extraInfo">We have found ${response.data.length} alertnative for ${response.title}</p>
        </div>`);

        $(".closeButton").click(function (e) {
            $('.stopMessage').hide();
        });
    }
});
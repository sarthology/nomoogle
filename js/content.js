    let currentUrl = window.location.href;
    if(currentUrl.indexOf("google.com") > -1){
        $("body").append(`<div class='stopMessage'>
                            <div class='shallNotPass'></div>
                            <p class='messageText'> You shall not pass!!</p>
                            <p class="closeButton">x</p>
                        </div>`) ;
    }

$(".closeButton").click(function (e) { 
    $('.stopMessage').slideUp();
});
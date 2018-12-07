$.getJSON("../data/data.json").then(function(data){
    
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true,}, function (tabs) {
        
        let currentSite = tabs[0].title;

        if(currentSite.indexOf("Google Search") > -1){   
            renderTitle("Google Search");      
            renderData(data.googleSearch);
        }
        if(currentSite.indexOf("Google Maps") > -1){   
            renderTitle("Google Maps");       
            renderData(data.googleMaps);
        }
        if(currentSite.indexOf("Google Scholar") > -1){   
            renderTitle("Google Scholar");       
            renderData(data.googleScholar);
        }
        
    });
    
})

function renderData(data){

    var template = $('#handlebars-alternative').html(); 
        
    var context = {data: data};
    
    var templateScript = Handlebars.compile(template);
        
    var html = templateScript(context);
    
    $(".alternatives").append(html);
}

function renderTitle(data){

    var template = $('#handlebars-title').html(); 
        
    var context = {title:data};
    
    var templateScript = Handlebars.compile(template);
        
    var html = templateScript(context);
    
    $(".current-site").append(html);
}

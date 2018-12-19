$("#enableRedirects").click((e)=>{ 
    $("#enableStrictMode").prop('checked',false);
    chrome.storage.sync.set({
        redirectEnabled: e.currentTarget.checked,
        strictModeEnabled: false
      });    
})

$("#enableStrictMode").click((e)=>{   
    $("#enableRedirects").prop('checked',false);     
    chrome.storage.sync.set({
        redirectEnabled: false,
        strictModeEnabled: e.currentTarget.checked
      });    
})

document.addEventListener('DOMContentLoaded',()=>{
    chrome.storage.sync.get({
        redirectEnabled: false,
        strictModeEnabled: false
      }, function(items) {          
        $("#enableRedirects").prop('checked', items.redirectEnabled);
        $("#enableStrictMode").prop('checked', items.strictModeEnabled);
      });
});
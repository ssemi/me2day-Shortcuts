// me2day shortcuts
// v0.9
// Copyright (c) 2010, semin Seol (ssemi)

// This is a Greasemonkey user script. 
// http://greasemonkey.mozdev.org/

// ==UserScript==
// @name           me2day shortcuts
// @namespace      me2day
// @match          http://me2day.net/*
// ==/UserScript==


var keydata = [];
var isNetscape = document.layers;
var isIe = document.all;


(function() {
    try {    
        me2dayShortCut_addStyle('\
            .remove_count input[type=image] { float:right; }\
        ');        
        naviShortcut();
        topbar.appendChild(el);
    } catch(ex){}
    document.onkeypress = getKeyStroke;
    document.onkeyup = getOutPost;
})();

function me2dayShortCut_addStyle(txt) 
{
    var s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode(txt))
    document.body.appendChild(s);
}

function naviShortcut()
{
    try 
    {
        var topMenus = document.querySelectorAll("div.topMenu > ul > li > a");
        var tlen = topMenus.length;

        var keylog =  (topMenus.length <= 2) ? ['L', 'J'] : ['H', 'F', 'M', 'N'];
        for (var i = 0; i < tlen; i++)
        {
            keydata[keylog[i]] = topMenus[i].href;            
            appendShorcutText(keylog[i], topMenus[i]);
            keydata[keylog[i].toString().toLowerCase()] = topMenus[i].href;
        }
    }catch (ex){ console.log(ex.message);}

    try {
        var menus = document.querySelectorAll("div.menu_navi > ul > li > a");
        var len = menus.length;
        for (var i = 0; i < len; i++)
        {
            keydata[i+1] = menus[i].href;
            appendShorcutText(i+1, menus[i]);
        }
    }catch (ex){}
}

function appendShorcutText(txt, el)
{
    var sp = document.createElement('span');
    sp.style.float = "left";
    sp.style.backgroundColor = "#ffffcc";
    sp.style.font = "8px tahoma";
    sp.style.color = "#999999";
    sp.appendChild(document.createTextNode(txt))
    el.insertBefore(sp);
}

function getKeyStroke(KeyStroke) 
{
    tagName = isIe ? event.srcElement.tagName : KeyStroke.target.tagName;

    if ( (tagName != 'INPUT') && (tagName != 'TEXTAREA') && (tagName != 'SELECT' ) ) 
    {
        eventChooser = (isIe) ? event.keyCode : KeyStroke.which;
        if (!isIe)
            if ( KeyStroke.metaKey == true ) {
                if ( KeyStroke.shiftKey == false )
                    return;
            }
            else if ( KeyStroke.ctrlKey == true ) {
                return;
            }

        which = String.fromCharCode(eventChooser);
        
        if (which == 'W' || which == 'w') { 
            var me2writer_post_body = document.getElementById('me2writer_post_body');
            if (me2writer_post_body) me2writer_post_body.focus();
            return;
        }

        for (var i in keydata)
        {
            if (which == i) window.location = keydata[i];
        }
    }
}

function getOutPost(KeyStroke)
{
    tEl = isIe ? event.srcElement : KeyStroke.target;
    if (tEl.tagName == 'TEXTAREA' || tEl.tagName == 'INPUT' || tEl.tagName != 'SELECT')
    {
        eventChooser = (isIe) ? event.keyCode : KeyStroke.which;
        if (eventChooser == 27) { tEl.blur(); }   // esc
    }
}

// ==UserScript==
// @name         roll20_attack_roller_bridge
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  links a custom attack roller to roll20
// @author       CRC_error
// @match        https://app.roll20.net/editor/
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_listValues
// ==/UserScript==

(function() {
    'use strict';
    var is_ar_open = false;
    function toggel_ar() {
        if (!is_ar_open) {
            document.getElementById("ar_frame").style.display = "block";
            is_ar_open = true;
        } else {
            document.getElementById("ar_frame").style.display = "none";
            is_ar_open = false;
        }
    }
    function add_ar_toggle() {
        var ul = document.getElementById("floatingtoolbar").getElementsByTagName("ul")[0];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("AR"));
        li.setAttribute("id", "attack_roller");
        li.onclick = toggel_ar;
        ul.appendChild(li);
    }
    function add_ar_iframe() {
        var body = document.getElementsByTagName("BODY")[0];
        var ar_frame = document.createElement("iframe");
        ar_frame.src = "https://lehelz.github.io/me_attack_roller/index.html";
        ar_frame.id = "ar_frame";
        ar_frame.height = "100%";
        ar_frame.width = "40%";
        ar_frame.style.display = "none";
        ar_frame.style.position = "fixed";
        ar_frame.style.top = "0";
        ar_frame.style.left = "5%";
        ar_frame.style.zIndex = "10";
        ar_frame.style.background = "#f0f0f0";
        ar_frame.overflow = "scroll";
        body.appendChild(ar_frame);
    }
    function add_msg_listener() {
        window.addEventListener("message", function(event) {
            if (event.origin !== 'https://lehelz.github.io') {
                return;
            }
            var chat_area = document.getElementById("textchat-input");
            chat_area.getElementsByTagName("textarea")[0].value = event.data;
            chat_area.getElementsByTagName("button")[0].click();
        });
    }
    window.onload = () => {
        add_ar_toggle();
        add_ar_iframe();
        add_msg_listener();
    };
})();
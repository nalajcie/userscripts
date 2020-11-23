// ==UserScript==
// @name         Gerrit show unresolved comments count
// @namespace    https://github.com/nalajcie/userscripts
// @version      0.1
// @description  try to take over the world!
// @author       Marek Białowąs
// @match        https://gerrit.phoesys.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     console.log('TamperGerrit: loaded');


    function findTag(node, name) {
        if (node.tagName == name) {
            return node;
        }

        if ('shadowRoot' in node && node.shadowRoot) {
            var resNode = findTag(node.shadowRoot, name);
            if (resNode) {
                return resNode;
            }
        }
        node = node.firstChild;

        while (node) {
            var resNode = findTag(node, name);
            if (resNode) {
                return resNode;
            }
            node = node.nextSibling;
        }

        return undefined;
    }

    document.addEventListener('WebComponentsReady', function() {
        // all of the components might not be yet ready, so delay by 1000 ms
        window.setTimeout(function() {
            console.log('TamperGerrit: doc ready');

            var gr_changes = findTag(document, "GR-CHANGE-LIST");
            if (!gr_changes) {
                console.log("TAMPER: no changes dashboard");
                return;
            }

            // show table headers
            gr_changes.shadowRoot.querySelectorAll(".comments").forEach(el => el.removeAttribute("hidden"));

            // show actual values
            gr_changes.shadowRoot.querySelectorAll("gr-change-list-item").forEach(r => r.shadowRoot.querySelectorAll(".comments").forEach(el => el.removeAttribute("hidden")));
        }, 1000);
    })
})();

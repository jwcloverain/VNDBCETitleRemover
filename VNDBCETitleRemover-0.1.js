// ==UserScript==
// @name         VNDB Censored Edition title remover
// @namespace    https://github.com/jwcloverain/VNDBCETitleRemover
// @version      0.1
// @description  Remove "Censored Edition" title from VNDB titles
// @author       jwcloverain
// @match        https://vndb.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                Array.from(mutation.addedNodes).forEach(function(node) {

                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.homepage a')) {
                        node.textContent = node.textContent.replace(/-? ?Censored Edition/gi, '');
                        node.title = node.title.replace(/-? ?Censored Edition/gi, '');
                    }


                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('main article.release h1')) {
                        node.textContent = node.textContent.replace(/-? ?Censored Edition/gi, '');
                    }

                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('main article.release table tr.nostripe.title')) {
                        const textNodes = [];
                        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
                        let currentNode;

                        while (currentNode = walker.nextNode()) {
                            textNodes.push(currentNode);
                        }

                        textNodes.forEach(textNode => {
                            textNode.textContent = textNode.textContent.replace(/-? ?Censored Edition/gi, '');
                        });
                    }


                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('article.vnreleases h1')) {
                        node.textContent = node.textContent.replace(/-? ?Censored Edition/gi, '');
                    }


                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('table.releases td.tc4 a, article.vnreleases a[href]')) {
                        node.textContent = node.textContent.replace(/-? ?Censored Edition/gi, '');
                        node.title = node.title.replace(/-? ?Censored Edition/gi, '');
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Rule for browser tab title on release and visual novel pages
    if (window.location.href.match(/^https:\/\/vndb\.org\/(r|v)/)) {
        const originalTitle = document.title;
        document.title = originalTitle.replace(/-? ?Censored Edition/gi, '');
    }
})();
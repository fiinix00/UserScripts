// ==UserScript==
// @name Facebook friend tagger remover
// @description Removes bloat of people tagging their friends
// @copyright 2015, Steven Hartgers
// @license MIT; http://opensource.org/licenses/MIT
// @homepageURL https://github.com/fiinix00/UserScripts
// @supportURL https://github.com/fiinix00/UserScripts/issues
// @downloadURL https://github.com/fiinix00/UserScripts/raw/master/facebook_friend_tagger_remover.user.js
// @updateURL https://github.com/fiinix00/UserScripts/raw/master/facebook_friend_tagger_remover.meta.js
// @include /^https?://(www\.)?facebook.com(/.*)?$/
// @version 1.0
// @grant none
// @run-at document-end
// ==/UserScript==

function ready(fn) {
    if (document.readyState === "complete") {
        return fn();
    }
    else if (window.addEventListener) {
        window.addEventListener("load", fn, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", fn);
    }
    else {
        window.onload = fn;
    }
}

ready(function() {
    var me = document.querySelector("a[title=Profile]").pathname;

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var comment = mutation.target.querySelectorAll(".UFIComment");

            for (var i = 0; i < comment.length; i++) {
                var commentBody = comment[i].querySelector(".UFICommentBody");

                var containsMe = false;
                var profileLink = false;

                for (var k = 0; k < commentBody.children.length; k++) {
                    var child = commentBody.children[k];
                    if (child.classList.contains("profileLink")) {
                        profileLink = true;

                        if (child.pathname.contains(me)) {
                            containsMe = true;
                        }
                    }
                }

                if (profileLink && !containsMe) {
                    current.parentElement.removeChild(current);
                }
            }
        });
    });

    var target = document.body;
    var config = { childList: true, subtree: true };

    observer.observe(target, config);
});
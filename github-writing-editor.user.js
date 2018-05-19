// ==UserScript==
// @name         github-writing-editor
// @namespace    https://github.com/Hansimov
// @version      1.1
// @description  Enhance the capabilities of GitHub issue comment editor, including real-time previewing, resizing width of comments and hiding sidebar.
// @author       Hansimov
// @match        https://github.com/*/issues/*
// @grant        GM_getValue
// @grant        GM_setValue
// @supportURL   https://github.com/Hansimov/github-writing-editor/issues
// @updateURL    https://github.com/Hansimov/github-writing-editor/raw/master/github-comments-editor/github-comments-editor.user.js
// @downloadURL  https://github.com/Hansimov/Small-Scripts-and-Tiny-Tools/raw/master/github-comments-editor/github-comments-editor.user.js
// @require      https://github.com/markedjs/marked/raw/master/marked.min.js
// ==/UserScript==

(function() {
    'use strict';

    /*************** Add a slider to control width of dicussion width ***************/
    var container_of_all = document.getElementsByClassName('container new-discussion-timeline experiment-repo-nav');
    // var issue = document.getElementById('show_issue');
    var container_of_discussion = document.getElementsByClassName('discussion-timeline js-quote-selection-container');
    var container_of_new_comment = document.getElementsByClassName('js-new-comment-form js-needs-timeline-marker-header');

    var slider_of_discussion_width = document.createElement('input');
    slider_of_discussion_width.type = 'range';
    slider_of_discussion_width.style.marginRight = '5px';
    slider_of_discussion_width.style.marginLeft = '15px';
    slider_of_discussion_width.style.marginTop = '3px';
    slider_of_discussion_width.min = 980;
    slider_of_discussion_width.max = 1800;
    // slider_of_discussion_width.value = 1380;
    slider_of_discussion_width.value = GM_getValue('slider width', 980);

    container_of_all[0].style.width = (slider_of_discussion_width.value) + 'px';
    container_of_discussion[0].style.width = (slider_of_discussion_width.value) + 'px';
    container_of_new_comment[0].style.width = (slider_of_discussion_width.value - 60) + 'px';

    slider_of_discussion_width.oninput = function(){
        var slider_value = this.value;
        container_of_discussion[0].style.width = (slider_value) + 'px';
        container_of_new_comment[0].style.width = (slider_value - 60) + 'px';
        container_of_all[0].style.width = (slider_value) + 'px';
        container_of_all[0].style.marginLeft  = 'auto';
        container_of_all[0].style.marginRight = 'auto';
        GM_setValue('slider width', slider_value);
    };
    // var header_bar = document.getElementsByClassName('TableObject gh-header-meta');
    var head_bar = document.getElementsByClassName('pagehead-actions');
    head_bar[0].appendChild(slider_of_discussion_width);


    /*************** Add a button to show/hide discussion-siderbar ***************/
    var sidebar = document.getElementsByClassName('discussion-sidebar');

    var button_to_control_sidebar = document.createElement('input');
    button_to_control_sidebar.type = 'button';
    button_to_control_sidebar.style.marginLeft = '20px';
    button_to_control_sidebar.style.fontFamily = 'Courier';
    button_to_control_sidebar.style.fontWeight= 'bold';

    sidebar[0].style.display = GM_getValue('sidebar visiblity','none');
    button_to_control_sidebar.value = GM_getValue('sidebar button text','show');

    button_to_control_sidebar.onclick = function () {
        var sidebar = document.getElementsByClassName('discussion-sidebar');
        if (sidebar[0].style.display == 'none') {
            sidebar[0].style.display = 'block';
            button_to_control_sidebar.value = 'Hide';
        } else {
            sidebar[0].style.display = 'none';
            button_to_control_sidebar.value = 'Show';
        }
        GM_setValue('sidebar visiblity', sidebar[0].style.display);
        GM_setValue('sidebar button text', button_to_control_sidebar.value);
    };
    head_bar[0].appendChild(button_to_control_sidebar);

    /*************** Display write region and preview region side by side ***************/
    function changePreviewStyle() {
        /*-------------- When 'Write' is selected --------------*/
        // var style_of_write_at_write_selected = document.querySelectorAll('.previewable-comment-form.write-selected .write-content');
        var style_of_write = document.querySelectorAll('.previewable-comment-form .write-content');
        // var style_of_preview_at_preview_selected = document.querySelectorAll('.previewable-comment-form.preview-selected .preview-content');
        var style_of_preview = document.querySelectorAll('.previewable-comment-form .preview-content');

        for (var i=0; i<=style_of_write.length-1; i++) {
            style_of_write[i].style.width = "47%";
            style_of_write[i].style.float = "left";
            style_of_preview[i].style.display = "block";
            style_of_preview[i].style.width = "47%";
            style_of_preview[i].style.float = "right";
        }

        /*-------------- When 'Preview' is selected --------------*/
        var style_of_write_at_preview_selected = document.querySelectorAll('.previewable-comment-form .write-content');

        for (var i=0; i<=style_of_write_at_preview_selected.length-1; i++) {
            style_of_write_at_preview_selected[i].style.display = "block";
            // style_of_write_at_preview_selected[i].style.float = "left";
            // style_of_write_at_preview_selected[i].style.width = "47%";
        }
    }

    /*************** Auto-resize height of areas of write and preview ***************/
    // How to auto-resize the height of textarea?
    //   https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    // Why I use 'closure':
    //   https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    //   https://stackoverflow.com/questions/19586137/addeventlistener-using-for-loop-and-passing-values
    function changeTextareaStyle() {
        var area_of_write = document.getElementsByTagName('textarea');
        // var area_of_preview = document.getElementsByClassName('comment-body markdown-body js-preview-body');

        function resizeAreaHeight(i) {
            area_of_write[i].style.maxHeight = (area_of_write[i].scrollHeight) + 'px';
            area_of_write[i].style.height = (area_of_write[i].scrollHeight) + 'px';
            // This line below makes the `Cancel` and `Update comment` buttons always under the area of write.
            // But currently it is still unsatisfactory. So currently it is not used.
            // area_of_preview[i].style.height = (area_of_preview[i].style.height + 40) + 'px';
        }
        for (var k = 0; k <= area_of_write.length-1; k++) {
            (function () {
                var i = k;
                // textarea[i].style.overflowY = 'hidden';
                area_of_write[i].oninput = function (){ resizeAreaHeight(i);};
                area_of_write[i].onclick = function (){ resizeAreaHeight(i);};
                // Add onkeypress() to cover `Ctrl + C/X/V`
                area_of_write[i].onkeypress = function (){ resizeAreaHeight(i);};
            }());
        }
    }

    /*************** Realtime markdown preview ***************/
    // Here I create a new markdown preview engine with marked.js
    //   https://github.com/markedjs/marked/blob/master/USAGE_ADVANCED.md
    function md2html (input_text) {
        // I do not use `require('marked')` as written in the doc, because that causes some errors.
        var markedOptions = {
            renderer: new marked.Renderer(),
            highlight: function(code) {
                return require('highlight.js').highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: true, // true: hard break; false: soft break. GFM uses hard one.
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        };
        return marked(input_text,markedOptions);
    }

    function updatePreview() {
        // var textarea = document.querySelectorAll('.comment-form-textarea');
        var area_of_write = document.getElementsByTagName('textarea');
        var button_of_preview = document.getElementsByClassName('btn-link tabnav-tab preview-tab js-preview-tab');
        var button_of_edit = document.getElementsByClassName('timeline-comment-action btn-link js-comment-edit-button tooltipped tooltipped-nw');
        var area_of_preview = document.getElementsByClassName('comment-body markdown-body js-preview-body');
        // function clickPreview(i) {
        //     button_of_preview[i].click();
        //     // These lines below are to keep editor toolbar visible.
        //     // If you want to hide the editor toolbar, just click the preview button,
        //     //   although the toolbar will show again when the content of area_of_write is updated.
        //     var hidden_toolbar = document.getElementsByClassName('js-toolbar toolbar-commenting d-none');
        //     for(var p of hidden_toolbar) {
        //         p.className = 'js-toolbar toolbar-commenting';
        //     }
        // }

        // Update preview when press particular keys.
        // Note that keyup can work correctly,
        //   while keydown has one character delay, and always returns 'Process' if I use Chinese input method.

        // Here I use a debounce or throttle to prevent freshing preview too frequently.
        //   http://javascript.ruanyifeng.com/advanced/timer.html
        //   https://www.cnblogs.com/wilber2013/p/5893426.html

        // Do not show the 'Loading preview ...' text while updating the preview

        function checkKeyType(key) {
            var trigger_keys = [' ', 'Control', 'Enter', 'Backspace', 'Delete',
                                '0','1','2','3','4','5','6','7','8','9',
                                ',', '.', '!', '?',';', ':', '\\','/', '-', '_', '=', '+',
                                '(', ')', '[', ']', '{', '}', '\'', '"', '^', '*','`'];
            if (trigger_keys.indexOf(key) > -1) {
                return true;
            } else {
                return false;
            }
        }

        for (var k=0; k<=area_of_write.length-1; k++) {
            (function () {
                var i = k;
                area_of_write[i].onkeyup = function (event){
                    // console.log(event.key);
                    if (checkKeyType(event.key)){
                        area_of_preview[i].innerHTML = md2html(area_of_write[i].value);
                    }
                };
            }());
        }

        for (var k=0; k<=button_of_edit.length-1; k++) {
            (function () {
                var i = k;
                button_of_edit[i].onclick = function (){
                    area_of_preview[i].innerHTML = md2html(area_of_write[i].value);
                };
            }());
        }
    }

    /*************** Update styles when comments are created or delted ***************/
    // Here I use MutationObserver():
    //   https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    //   https://www.htmlgoodies.com/beyond/javascript/respond-to-dom-changes-with-mutation-observers.html
    //   https://stackoverflow.com/a/14570614/8328786
    //
    // After a comment is submitted, the content of preview at the new comment region will not be updated.
    // Though this does not matter, it is a little bit annoying. Maybe I would fix this afterwards.

    function updateStyles() {
        changePreviewStyle();
        changeTextareaStyle();
        updatePreview();
    }

    function createCommentsObserver () {
        var observer_target = document.getElementById('show_issue');
        // var observer_target = document.getElementsByClassName('discussion-timeline js-quote-selection-container ')[0];
        // var observer_target = document.getElementsByClassName('js-discussion js-socket-channel')[0];

        var observer_config = { childList: true, subtree:true, attributes:false};

        var observer_callback = function(mutation_list) {
            for(var mutation of mutation_list) {
                updateStyles();
            }
        };
        var comments_observer = new MutationObserver(observer_callback);
        comments_observer.observe(observer_target, observer_config);

    }


    /*************** Initialize ***************/
    changePreviewStyle();
    changeTextareaStyle();
    updatePreview();
    createCommentsObserver();

})();


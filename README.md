## Introduction

Currently, this userscript works at `https://github.com/*/issues/*`.

I will apply this userscript to more GitHub websites later (if time permits).

It enhances the capabilities of the original GitHub issue comments editor.


## Installation

(To be added ...)

## Usage

(To be added ...)

## Main features of this userscript

* Display the area of `Write` and `Preview` side by side at the same time
* Real-time preview the markdown of the writing content
* Freely resize the width of comments container with a slider (on the right of the `fork` button)
* Hide/show the sidebar with a button (on the right of the slider above)
* Remember the users' preferences at last time
* Auto-resize the textarea when the contents of comments are changed
* Show the originally hidden editor toolbar while previewing


## Todo

* Appearances
    * [ ] Choose an appropriate icon
    * [ ] Modify the layout of the slider and button
    * [ ] Have a try at GitHub Wide
    * [ ] Hide `Preview` tab
    * [ ] Remove the `Styling with Markdown is supported` text
    
* Functions
    * [ ] Apply this userscript to more GitHub websites
        * [ ] Pull requests
        * [ ] Wikis
        * [ ] Discussions
    * [ ] Load the userscript immediately without freshing when jumping from the main page
    * [ ] Apply this userscript to `New issue`
    * [x] Synchronize this userscript with Tampermonkey
    * [ ] Add a word counter
    * [ ] Add keyboard shortcuts
    * [ ] Export to `.md` and `.html` files
    * [ ] Improve markdown preview engine:
        * [x] Take a look at the preview render extension: https://github.com/DrewML/octo-preview
        * [ ] Update preview with fixed interval or after certain number of inputs (debounce or throttle)
        * [x] Remove the `Loading preview ...` page
        * [x] Use a new engine: https://github.com/markedjs/marked
        * [ ] Support `:emoji:`
        * [ ] Clear preview content after the new comment is submitted
		* [ ] Support image links outside github websites
    * [ ] Fix potential bugs
    
* Documents
    * [ ] Add installation tutorials 
    * [ ] Add GIFs to show effects
        * [ ] Resize editor width
        * [ ] Real-time preview
        * [ ] Hide/show sidebar

* Miscellaneous
    * [x] Reply to Mottie's comment
    * [x] Reply to darkred's comment

## References

* Conversations of this userscript with Mottie
    * https://github.com/Mottie/GitHub-userscripts/pull/38
* markedjs: A markdown parser and compiler. Built for speed.
    * https://github.com/markedjs/marked
    * https://github.com/markedjs/marked/blob/master/USAGE_ADVANCED.md
    * https://github.com/markedjs/marked/raw/master/marked.min.js
* GitHub Flavored Markdown Spec
    * https://github.github.com/gfm/
* requirejs: A file and module loader for JavaScript
    * http://requirejs.org/
    * https://github.com/requirejs/requirejs
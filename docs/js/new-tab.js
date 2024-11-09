'use strict';

(function () {
    const links = document.querySelectorAll('a[href^="https://"], a[href^="http://"], a[href^="/assets"]')
    links.forEach(link => {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
    })
})()
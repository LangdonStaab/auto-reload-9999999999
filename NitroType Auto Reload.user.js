// ==UserScript==
// @name         NitroType Auto Reload
// @namespace    https://github.com/Ray-Adams
// @version      2.0.0
// @description  Automatically reloads the page at the end of each race.
// @author       Ray Adams
// @match        *://*.nitrotype.com/race
// @run-at       document-end
// @grant        none
// ==/UserScript==

const options = {
    timerMs: 1,
    reloadWhenDisqualified: true
};

(() => {

    'use strict';

    let letters, lastLetter;

    if (options.reloadWhenDisqualified) {

        const dqObserver = new MutationObserver(() => {
            if (document.querySelector('.modal--error')) {

                dqObserver.disconnect();

                location.reload();

            }
        });

        dqObserver.observe(raceContainer, {childList: true});

    }

    const lessonObserver = new MutationObserver(() => {

        if (document.querySelector('.dash-copy')) {

            lessonObserver.disconnect();

            letters = document.querySelectorAll('.dash-letter'),
            lastLetter = letters[letters.length - 2];

            lastLetterObserver.observe(lastLetter, {attributes: true});

        }

    });

    const lastLetterObserver = new MutationObserver((mutations) => {

        for (let mutation of mutations) {
            if (mutation.target.getAttribute('class').includes('is-correct')) {

                lastLetterObserver.disconnect();

                setTimeout(() => location.reload(), options.timerMs);

            }
        }

    });

    lessonObserver.observe(document.querySelector('.dash-center'), {childList: true});

    console.info('Auto Reload Activated.');
    console.log('Auto reload is not illeagal in any way, it simply saves time.')
    console.log('Be careful what you load onto TamperMonkey; if you load anthing malicious,it can take over your system.')
})()

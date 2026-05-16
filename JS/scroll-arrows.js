const scrollHint = document.querySelector(".scroll-hint");
const scrollTopLink = document.querySelector(".scroll-top-link");

function getScrollTop() {
    const scrollingElement = document.scrollingElement || document.documentElement;

    return Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        scrollingElement.scrollTop || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0,
    );
}

function getScrollableDistance() {
    const scrollingElement = document.scrollingElement || document.documentElement;

    return Math.max(
        0,
        scrollingElement.scrollHeight - window.innerHeight,
    );
}

function updateScrollArrows() {
    if (!scrollHint || !scrollTopLink) {
        return;
    }

    const hasScrollablePage = getScrollableDistance() > 20;
    const hasScrolled = getScrollTop() > 20;

    scrollHint.classList.toggle("is-hidden", !hasScrollablePage || hasScrolled);
    scrollTopLink.classList.toggle("is-hidden", !hasScrolled);
}

function requestScrollArrowUpdate() {
    window.requestAnimationFrame(updateScrollArrows);
}

window.addEventListener("scroll", requestScrollArrowUpdate, { passive: true });
window.addEventListener("resize", updateScrollArrows);
window.addEventListener("load", updateScrollArrows);
window.addEventListener("pageshow", updateScrollArrows);
updateScrollArrows();

localStorage.clear();

history.pushState(null, "", location.href);

window.addEventListener("popstate", function () {
    history.pushState(null, "", location.href);
});
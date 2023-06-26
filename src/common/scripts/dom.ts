
export function getScrollPosition () {
    var body = document.body,
    html = document.documentElement;
    var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );

    var viewportHeight = Math.max(html.clientHeight, window.innerHeight || 0); // Viewport height (px)
    var scrollPosition = window.scrollY || html.scrollTop || body.scrollTop; // Current scroll position (px)
    // var documentHeight = document.clie.height(); // Document height (px)
    var scrollPositionRelative = scrollPosition / (documentHeight - viewportHeight); // The document height is reduced by the height of the viewport so that we reach 100% at the bottom
    return {
        viewportHeight: viewportHeight,
        documentHeight: documentHeight,
        relative: scrollPositionRelative,
        absolute: scrollPositionRelative * documentHeight // Yields an "average" pixel position
    };
}
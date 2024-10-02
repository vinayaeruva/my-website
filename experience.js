document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Check if the element is in view
    function isInView(el) {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }

    // Function to handle scroll and animate timeline items
    function handleScroll() {
        timelineItems.forEach(item => {
            if (isInView(item)) {
                item.classList.add('in-view');
            } else {
                item.classList.remove('in-view');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Initial check on page load
    handleScroll();
});

// listen if the element with the class "w-webflow-badge" exists in the page remove it
// using observer
const badgeObserver = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
            const badgeElement = mutation.target.querySelector('.w-webflow-badge');
            if (badgeElement) {
                badgeElement.classList.remove("w-webflow-badge");
                badgeElement.style.display = 'none'
                // disconnect the observer after removing the watermark by 3 seconds
                setTimeout(() => {
                    badgeObserver.disconnect();
                }, 3000);
            }
        }
    });
});

const badgeConfig = {
    childList: true,
    subtree: true
};

badgeObserver.observe(document.body, badgeConfig);

// disconnect the observer after remove

function getTargetNode(event) {
    const node = event.target;
    console.log(node);
}


function elementDisplayer(active) {
    if (active) {
        document.addEventListener('click', getTargetNode)
    } else {
        document.removeEventListener('click', getTargetNode)
        console.log('switch off');
    }
};



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        if (request.isToggleOn) {
            sendResponse('this is the colorizer response')
            elementDisplayer(true)
        } else elementDisplayer(false)
    }
);
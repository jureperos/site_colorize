function getTargetNode(event) {
    const node = event.target;
    node.style.background = 'red'
    console.log(node.style);
}



function elementDisplayer(active) {
    if (active) {
        document.addEventListener('click', getTargetNode);
    } else {
        document.removeEventListener('click', getTargetNode);
        console.log('switch off');
    }
};


// recieve and parse messages
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        if (request.pickedColor) {
            console.log(`you picked this color: ${request.pickedColor}`)
        }

        else if (request.isToggleOn) {
            elementDisplayer(true)
        }

        else if (!request.isToggleOn) {
            elementDisplayer(false)
        }

        else console.log(`unexpected message: ${request}`)
    }
);
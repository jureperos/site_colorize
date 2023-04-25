let pickedColor = ''
let toggleState = 'off'

function getTargetNode(event) {
    const node = event.target;
    node.style.background = pickedColor;
    console.log(node.style);
}

function getTargetNode(event) {
    const node = event.target;
    node.style.background = pickedColor;
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
            console.log(`you picked this color: ${request.pickedColor}`);
            pickedColor = request.pickedColor;
        }

        else if (request.isToggleOn === 'on') {
            elementDisplayer(true);
            sendResponse('picker active');
            toggleState = 'on'
        }

        else if (request.isToggleOn === 'off') {
            elementDisplayer(false);
            //if toggle is off respond with a falsy value
            sendResponse('');
            toggleState = 'off'
        }

        else if (request.whatState === 'check') {
            sendResponse(toggleState)
        }

        else console.log(`unexpected message: ${request}`);
    }
);
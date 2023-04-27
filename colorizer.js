let pickedColor = '';
let toggleState = 'off';

function colorNode(event) {
    const node = event.target;
    node.style.background = pickedColor;
}

// highilts node on enter
function highlightNode(event) {
    const node = event.target;
    node.style.border = 'solid 1px limegreen';

    // removes the highlight on leaving node
    // fix: When the cursor goes to the child node remove the highlight of the parent node.
    node.addEventListener('mouseleave', () => node.style.border = '')
}

function elementDisplayer(active) {
    if (active) {
        document.addEventListener('click', colorNode);
        document.addEventListener('mouseover', highlightNode);
    } else {
        document.removeEventListener('click', colorNode);
        document.removeEventListener('mouseover', highlightNode);
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
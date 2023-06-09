let pickedColor = '';
let toggleState = 'off';
let targetNode = ''; //correct the datatype for the empty variable if needed

function colorNode(event) {
    if (event.key === 'c') {
        targetNode.style.background = pickedColor;

        //undo color
    } else if (event.key === 'u') {
        targetNode.style.background = '';
    }
}

// highlights node on enter
function highlightNode(event) {
    targetNode = event.target;
    targetNode.style.border = 'solid 1px limegreen';

    // removes the highlight on leaving node. Some highlights still stay
    // when going to sibling node???
    targetNode.addEventListener('mouseleave', () => targetNode.style.border = '');
    targetNode.parentNode.style.border = '';
}

function elementDisplayer(active) {
    if (active) {
        document.addEventListener('keydown', colorNode);
        document.addEventListener('mouseover', highlightNode);
    } else {
        document.removeEventListener('keydown', colorNode);
        document.removeEventListener('mouseover', highlightNode);
        console.log('switch off');
    }
};

//  manage communication from popup.js
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
            sendResponse(toggleState);
        }

        else console.log(`unexpected message: ${request}`);
    }
);

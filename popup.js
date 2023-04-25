const onOffswitch = document.getElementById('on-off-input');
const colorPick = document.getElementById('pick-color');

// check the state of the toggle stored in colorizer so the toggle isn't reset after closing and oppening the popup
const checkSwitchState = async function sendMessage() {
    const [tab] = await chrome.tabs.query({ active: true });
    const response = await chrome.tabs.sendMessage(tab.id, { whatState: 'check' });

    if (response === 'on') {
        onOffswitch.setAttribute('checked', null)
    }
}

// -------- Send on/off state to colorizer ----------
const sendOnOff = async function sendMessage(onOff) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { isToggleOn: onOff });
    const pickColorTxt = document.getElementById('pick-color-txt');

    if (response) {
        pickColorTxt.innerHTML = 'Pick an element';
    }
    else if (!response) {
        pickColorTxt.innerHTML = '';
    }
    console.log(response);
}

onOffswitch.addEventListener('click', () => {
    if (onOffswitch.checked) {
        sendOnOff('on');
    } else {
        sendOnOff('off');
    };
});

// ------- Send picked color ---------
const sendColor = async function sendMessage(color) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { pickedColor: color });
}

// CPU go brrrrr, maybe send message only when color is picked ?!
function getColor(event) {
    const pickedColor = event.target.value;
    sendColor(pickedColor);
}

colorPick.addEventListener('input', getColor);

checkSwitchState();

const onOffswitch = document.getElementById('on-off-input');
const colorPick = document.getElementById('pick-color')

// -------- Send on/off state ----------
const sendOnOff = async function sendMessage(onOff) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { isToggleOn: onOff });
    console.log(response);
}


onOffswitch.addEventListener('click', () => {
    if (onOffswitch.checked) {
        sendOnOff(true);
    } else sendOnOff(false);
})

// ------- Send picked color ---------
const sendColor = async function sendMessage(color) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { pickedColor: color });
    console.log(response);
}

function getColor(event) {
    const pickedColor = event.target.value
    sendColor(pickedColor)
}

colorPick.addEventListener('input', getColor)
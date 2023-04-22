const onOffswitch = document.getElementById('on-off-input');
console.log(typeof onOffswitch.value, onOffswitch.value);

//this sends a message that the colorizer.js is listening to
async function sendMessage(onOff) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { isToggleOn: onOff });
    console.log(response);
}


//
onOffswitch.addEventListener('click', () => {
    if (onOffswitch.checked) {
        sendMessage(true);
    } else sendMessage(false);
})
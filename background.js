

// const sendState = async function sendMessage(state) {
//     const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//     const response = await chrome.tabs.sendMessage(tab.id, { pickedColor: color });
//     console.log(response);
// }

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(request)
//     }
// )
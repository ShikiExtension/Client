const allowedBackgroundCommands = {};
const Build = {
    success: response => {
        response.success = true;

        return response;
    },
    error: response => {
        response.success = false;

        return response;
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!(request.command in allowedBackgroundCommands))
        return Build.error({
            message: 'Unsupported command'
        });

    allowedBackgroundCommands[request.command](
        request.request,
        sender,
        sendResponse
    );

    return true;
});
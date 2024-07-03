
function jsonrpc(url, params, settings = {}) {
    const XHR = window.XMLHttpRequest;
    const data = {
        params: params,
    };
    const request = settings.xhr || new XHR();
    let rejectFn;
    const promise = new Promise((resolve, reject) => {
        rejectFn = reject;
        // handle success
        request.addEventListener("load", () => {
            if (request.status === 502) {
                reject(new Error());
                return;
            }
            const { error: responseError, result: responseResult } = JSON.parse(request.response);
            if (!responseError) {
                return resolve(responseResult);
            }
            const error = Error(responseError);
            reject(error);
        });
        // handle failure
        request.addEventListener("error", () => {
            reject(new Error());
        });
        // configure and send request
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    });
    promise.abort = function () {
        if (request.abort) {
            request.abort();
        }
        rejectFn(new Error("XmlHttpRequestError abort"));
    };
    return promise;
}

// let rpcId = 0;
export function rpc(route, params = {}, settings) {
    // return jsonrpc(rpcId++, route, params, settings);
    return jsonrpc(route, params, settings);
}

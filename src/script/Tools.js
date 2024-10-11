export function addListener(element, event, func, bubble = false){
    element.removeEventListener(event, func);
    element.addEventListener(event, func, bubble);
}
export function setInterval(globalVar, timer, func, method){
    if (typeof globalVar.interval !== 'object') globalVar.interval = {};
    if (timer === undefined) return Object.entries(globalVar.interval).forEach(([key, value]) => {
        value.funcArray.forEach(e => e());
        if (value.id !== undefined) clearInterval(value.id);
        value.id = setInterval(() => value.funcArray.forEach(e => e()), key);
    });
    if (typeof globalVar.interval[timer] !== 'object') globalVar.interval[timer] = {};
    const timerObject = globalVar.interval[timer];
    if (timerObject.funcArray === undefined) timerObject.funcArray = [];
    const arr = timerObject.funcArray;
    const setFunc = (timer) => {
        if (timerObject.id !== undefined) clearInterval(timerObject.id);
        timerObject.id = setInterval(() => timerObject.funcArray.forEach(e => e()), timer);
    }
    switch (method) {
        case 'clear':
            if (arr.length !== 0) setFunc(timer);
            break;
        case 'set':
            arr.push(func);
            setFunc(timer);
            break;
    }
}
export function enterFunc(node,button) {
    addListener(node, 'keydown', function (firedKey) {
        if(firedKey.key === 'Enter' && !firedKey.ctrlKey) button.click()
    }, false);
}
export function popMsg(msg,node){
    const popOutText = document.createElement('div');
    popOutText.setAttribute('id', 'CopiedMessage');
    popOutText.textContent = msg;
    document.body.appendChild(popOutText);
    const triggerNode = node === undefined ? this : node;
    const position = triggerNode.getBoundingClientRect();
    const popWidth = window.getComputedStyle(popOutText).width.replace('px', '') / 2;
    popOutText.style.top = `${position.bottom + window.scrollY}px`;
    popOutText.style.left = `${(position.left + position.right) / 2 + window.scrollX - popWidth}px`;
    setTimeout(() => {
        let text = document.querySelector('#CopiedMessage');
        text.remove();
    }, 1000)
}
export function copyMyText(node,textToCopy) {
    const copyNode = textToCopy!==undefined?document.createElement('span'):node===undefined?this:node;
    if(textToCopy!==undefined) copyNode.textContent = textToCopy;
    let range = document.createRange();
    range.selectNode(copyNode);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    Tools.popMsg.call(node===undefined?this:node,'Copied');
}
export function getSheetData(requestType, dataToAppend = {}, url){
    let formToFetch = new FormData();
    if (requestType === undefined) { return Promise.reject('RequestType undefined.') } else { formToFetch.append('ReQuestType', requestType) }
    Object.entries(dataToAppend).forEach(([dataName, dataValue]) => formToFetch.append(dataName, dataValue));
    const fetchOptions = { 'method': 'POST', 'body': formToFetch };
    return fetch(url, fetchOptions);
}
export function objCompare(objA, objB){
    let output = true;
    Object.entries(objA).forEach(([key, value]) => {
        if (typeof value === 'object') {
            if (typeof objB[key] !== 'object') output = false;
            else output = Tools.objCompare(value, objB[key]);
        }
        else if (typeof value === 'function') output = value.toString() === objB[key].toString();
        else if (value !== objB[key]) output = false;
    });
    return output;
}
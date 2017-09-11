/**
 * Created by Administrator on 2017/6/17.
 */
/**
 * Created by Administrator on 2017/6/5.
 */
/**
 * 添加事件和删除事件的兼容方法
 * @param {object} element
 * @param {string} type
 * @param {function}
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler, getEvent: EventUtil.getEvent, getTarget: EventUtil.getTarget, preventDefault: EventUtil.preventDefault, stopPropagation: EventUtil.stopPropagation}}
 */
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    //返回对 event对象的引用
    getEvent: function(event){
        return event ? event : window.event;
    },
    //返回事件的目标
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    //取消事件的默认行为
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //使用 DOM 方法阻止事件流
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

/**
 * 获取元素对象内部文本（兼容）
 * @param {object}element
 * @returns {*}
 */
function getElementText(element) {
    if (typeof element.innerText ==="string"){
        return element.innerText;//IE 678
    }else{
        return element.textContent;//FF
    }
}

/**
 * //设置元素对象内部文本（兼容）
 * @param {object}element
 * @param {string}content
 * @returns {*}
 */
function setElementText(element,content){
    if (typeof element.innerText ==="string"){
        return element.innerText=content;
    }else{
        return element.textContent=content;
    }
}

/**
 *
 * @param {object}element
 * @returns {*}
 */
function getNextElement(element) {
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var next=element.nextSibling;
        while(next && next.nodeType !==1){
            next=element.nextSibling;
        }
        return next;
    }
}

/**
 * 获取第一个子元素
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if(element.firstElementChild){
        return element.firstElementChild;
    }
    else{
        var node=element.firstChild;
        while(node && node.nextSibling.nodeType !==1){
            node=node.nextSibling;
        }
        return node;
    }
}

/**
 * 获取最后个子元素
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if(element.lastElementChild){
        return element.lastElementChild;
    }
    else{
        var node=element.lastChild;
        while(node && node.previousSibling.nodeType !==1){
            node=node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取非行间样式
 * @param obj
 * @param name
 * @returns {*}
 */
function getNoLineStyle(obj,name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];//IE
    }
    else
    {
        return getComputedStyle(obj, false)[name];//FF Chrome
    }
}

/**
 * 获取网页可视区的宽高
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function getClientSize() {
    return {
        width:window.innerWidth || document.documentElement.clientWidth ||document.body.clientWidth || 0,
        height:window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight ||0
    }
}
/**
 * 获取网页滚动条滚去的宽高
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}
/**
 * 缓动动画
 * @param obj
 * @param json
 * @param fn
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    var speed=10;
    obj.timer = setInterval(function () {
        var flag = true;
        var leader;
        var target;
        var step;
        for (var k in json){
            if (k==='speed'){
                speed=json[k];
                break;
            }
        }
        for (var k in json) {
            if (k === "opacity") {//特殊处理
                //var leader = parseInt(getStyle(obj, k)) || 0;
                leader = getStyle(obj, k) * 100;//1
                // 0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
                //所以这里不能给默认值 而且也没有必要
                //透明度没有单位px 所以也不用parseInt 参与运算自动变为数字
                target = json[k] * 100;//0.5
                step = (target - leader) / 5;//0.5-1=-0.5
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
                leader = leader + step;
                //obj.style[k] = leader + "px";
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//无需渐变 直接设置即可
            }else if(k==='speed'){
                continue;
            } else {
                leader = parseInt(getStyle(obj, k)) || 0;
                target = json[k];
                step = (target - leader) / speed;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }

        if (flag) {
            clearInterval(obj.timer);
            if (fn) {//如果有才调用
                fn();//动画执行完成后执行
            }
        }
    }, 15);
}
/**
 * 获取样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

var eventUtils={
    //封装获取事件目标兼容方式
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //封装获取鼠标在页面上的水平坐标兼容方式
    getPageX:function (event) {
        return event.pageX || event.clientX + document.documentElement.scrollLeft;
    },
    //封装获取鼠标在页面上的垂直坐标兼容方式
    getPageY:function (event) {
        return event.pageY || event.clientY + document.documentElement.scrollTop;
    },
    //封装阻止事件冒泡兼容方式
    stopPropagation:function (event) {
        return event.stopPropagation?event.stopPropagation():event.cancelBubble=true;//boolean类型
    },
    //封装获取事件对象的兼容方式
    getEvent:function (event) {
        return event || window.event;
    }
}

function slowAnimate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//特殊处理
                //var leader = parseInt(getStyle(obj, k)) || 0;
                var leader = getStyle(obj, k) * 100;//1
                // 0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
                //所以这里不能给默认值 而且也没有必要
                //透明度没有单位px 所以也不用parseInt 参与运算自动变为数字
                var target = json[k] * 100;//0.5
                var step = (target - leader) / 10;//0.5-1=-0.5
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
                leader = leader + step;
                //obj.style[k] = leader + "px";
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//无需渐变 直接设置即可
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 30;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {//如果有才调用
                fn();//动画执行完成后执行
            }
        }
    }, 15);
}


 utils = {
    
    /**
     * jsonp获取数据
     *
     * @param {Object} options 请求数据
     * @param {string} options.url 请求地址
     * @param {Object} options.data 请求数据
     * @param {string} options.callbackName callbackName
     * @param {Function} options.callbackFn 回调函数
     */
    jsonp(options = {}) {
        const fnName = 'myJsonp_' + Math.random().toString().replace('.', '');

        // 定义一个全局回调函数
        window[fnName] = options.callbackFn;

        // 初始化序列化参数
        let querystring = '';

        for (let attr in options.data) {
            querystring += attr + '=' + options.data[attr] + '&';
        }

        let name = options.callbackName ? options.callbackName : 'callback';
        // 动态创建script标签
        const script = document.createElement('script');

        // 后台接受回调函数，并调用
        let mark = '?';
        if (options.url && options.url.indexOf('?') > -1) {
            mark = '&';
        }
        script.src = options.url + mark + querystring + name + '=' + fnName;

        // 处理完毕之后,删除script标签，否则多次请求，页面会存在多个script标签
        script.onload = function () {
            document.body.removeChild(script);
        };

        document.body.appendChild(script);
    }

}
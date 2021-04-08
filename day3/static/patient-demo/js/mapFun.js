/**
 * 
 * @bref 简单封装定位功能
 * @param {object} options 定位参数
 * @author liuxiangnan@cd.baidu.com
 * @date 2020-02-16
 */

function Geolocation(options) {
    /**
     * 验证参数
     */
    options = options || {}
  
    /**
     * 定位配置
     */
    this.config = {
        timeout: options['timeout'] || 1000 * 10,
        maximumAge: options['maximumAge'] || 1000 * 60 * 10,
    }
}
/**
 * 获取当前的地理位置
 */
Geolocation.prototype.getCurrentPosition = function(successCallback) {
    var me = this;
    var successCallbackCalled = false;
    /**
     * 超时退出
     */

    var timeoutListener = setTimeout(function() {
            if (successCallbackCalled) {
                return;
            }
        },
        me.config.timeout);

    var innerSuccessCallback = function(geolocationInfo) {
        if (successCallbackCalled) {
            return;
        }

        if (timeoutListener) {
            clearTimeout(timeoutListener);
            timeoutListener = null;
        }

        /**
         * 先赋予geolocationInfo对象
         */
        me.geolocationInfo = geolocationInfo;

        successCallback.apply(me, arguments);
        successCallbackCalled = true;

    };

    /**
     * 高精IP定位
     */
    function highaccipLocating(next) {
        /**
         * 高精IP定位可用
         */
        if (highaccIPGeolocation.checkUsability()) {
            var highipGeolocation = new highaccIPGeolocation({
            });

            highipGeolocation.getCurrentPosition(function(geolocationInfo) {
                    /**
                     * 高级功能IP定位成功
                     */
                    innerSuccessCallback(geolocationInfo);
                },
                function(geolocationError) {
                    /**
                     * IP定位失败
                     */
                    return;
                });
            return;
        }

        /**
         * 高精IP定位不可用
         */
        next();
    }
    function html5Locating(next) {
        /**
         * 如果浏览器存在geolocation的话，使用HTML5的定位接口
         */
        if (HTML5Geolocation.checkUsability()) {
            var html5Geolocation = new HTML5Geolocation({
                timeout: me.config.timeout,
                maximumAge: me.config.maximumAge
            });

            html5Geolocation.getCurrentPosition(function(geolocationInfo) {
                    /**
                     * 定位成功
                     */
                    innerSuccessCallback(geolocationInfo);
                },
                function(geolocationError) {
                    switch (geolocationError.errorCode) {
                        case geolocationError.ERR_PERMISSION_DENIED:
                        case geolocationError.ERR_POSITION_UNAVAILABLE:
                            next();
                            break;
                        case geolocationError.ERR_TIMEOUT:
                            next();
                            break;
                    }
                });
            return;
        }

        /**
         * HTML5定位不可用
         */
        next();
    }

    html5Locating(highaccipLocating);
}

/**
 * HTML5定位
 */
function HTML5Geolocation(options) {
    /**
     * 配置
     */
    this.config = {
        /**
         * 定位超时时间，按毫秒计算
         * 默认5秒
         */
        timeout: options.timeout || 1000 * 5,

        /**
         * 定位缓存时间，按毫秒计算
         * 默认10分钟
         */
        maximumAge: options.maximumAge || 1000 * 60 * 10,
        /**
         * 是否使用高精H5定位
         */
        enableHighAccuracy: options.enableHighAccuracy || false
    }
}

/**
 * 检测判断HTML5Geolocation定位是否可使用
 */
HTML5Geolocation.checkUsability = function() {
    if (navigator.geolocation) {
        return true;
    }
    return false;
}

HTML5Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback) {
        var successCb = function(position) {
            var point = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            var translate = new Convertor();
            translate.transelate(
                [point],
                1,
                3,
                function (result) {
                    var htmlgeolocationInfo = new GeolocationInfo();
                    if (result.status === 0) {
                        htmlgeolocationInfo.point = result['result'][0];
                        successCallback(htmlgeolocationInfo);
                    }
                }
            );
        };
        var errorCb = function(error) {
            /**
             * 浏览器接口的code对应的常量
             * PERMISSION_DENIED = 1;
             * POSITION_UNAVAILABLE = 2;
             * TIMEOUT = 3;
             * 将浏览器状态码映射到API状态码，此时对应
             * BMAP_STATUS_PERMISSION_DENIED(1 + 5 = 6)
             * me._onErrorCallback(positionError.code + 5);
             */
            var geolocationError = new GeolocationError();
            if (error.code === error.PERMISSION_DENIED && error.message.indexOf('secure') === -1) {
                geolocationError.errorCode = geolocationError.ERR_PERMISSION_DENIED;
                geolocationError.errorMessage = "用户决绝定位请求";
            }
            if (error.code === error.POSITION_UNAVAILABLE) {
                geolocationError.errorCode = geolocationError.ERR_POSITION_UNAVAILABLE;
                geolocationError.errorMessage = "定位不可用";
            }

            if (error.message.indexOf('secure') > -1) {
                var auth = confirm(location.hostname + '想要获取您当前的位置。允许请点击确定，禁止请点击取消');
                if (auth) {
                    geolocationError.errorCode = geolocationError.ERR_POSITION_UNAVAILABLE;
                    geolocationError.errorMessage = "定位不可用";
                } else {
                    geolocationError.errorCode = geolocationError.ERR_PERMISSION_DENIED;
                    geolocationError.errorMessage = "用户决绝定位请求";
                }
            }

            if (error.code === error.TIMEOUT) {
                geolocationError.errorCode = geolocationError.ERR_TIMEOUT;
                geolocationError.errorMessage = "定位超时";
            }
            errorCallback(geolocationError);
        };

    navigator.geolocation.getCurrentPosition(successCb, errorCb, {
        enableHighAccuracy: this.config.enableHighAccuracy,
        maximumAge: this.config.maximumAge
    });
}


/**
 * IP定位
 */
function highaccIPGeolocation(options) {
    this.config = {
        extensions: 1,
        coord: 'bd09ll',
        coding: 'utf-8',
        callback_type: 'jsonp'
    };
}
/**
 * 检测判断highaccIPGeolocation定位是否可使用
 */
highaccIPGeolocation.checkUsability = function() {
    return true;
}

/**
 * 通过请求获取当前IP地址的地理位置信息
 *
 * @param {Function} successCallback 定位成功的回掉
 * @param {Function} errorCallback 定位失败的回掉
 */
highaccIPGeolocation.prototype.getCurrentPosition=function(successCallback, errorCallback) {
    var randomNumber = Math.floor(Math.random() * 100000);
    var randomCallbackName = "_cbk" + randomNumber;

    /**
     * 向全局注入一个随机函数
     */
    window[randomCallbackName] = function(response) {
        // var response = json['']
        // 返回的数据可以参照高精度IP定位 web api的文档
        if (response['status'] === 0) {
            if (response['content'] && response['content']['point']) {
                var geolocationInfo = new GeolocationInfo();
                // geolocationInfo.accuracy = response['content']['radius'];
                geolocationInfo.longitude = response['content']['point']['x'];
                geolocationInfo.latitude = response['content']['point']['y'];
                geolocationInfo.point = response['content']['point'];
            }
            if (response['content'] && response['content']['address_detail']) {
                if (response['content']['address_detail']['country']) {
                    geolocationInfo.address.country = response['content']['address_detail']['country'];
                }
                if (response['content']['address_detail']['province']) {
                    geolocationInfo.address.province = response['content']['address_detail']['province'];
                }
                if (response['content']['address_detail']['city']) {
                    geolocationInfo.address.city = response['content']['address_detail']['city'];
                }
                if (response['content']['address_detail']['district']) {
                    geolocationInfo.address.district = response['content']['address_detail']['district'];
                }
                if (response['content']['address_detail']['street']) {
                    geolocationInfo.address.street = response['content']['address_detail']['street'];
                }
                if (response['content']['address_detail']['street_number']) {
                    geolocationInfo.address.street_number = response['content']['address_detail']['street_number'];
                }
            }
            successCallback(geolocationInfo);
            return;
        }

        /**
         * 请求IP地理定位信息失败
         */
        var geolocationError = new GeolocationError();

        geolocationError.errorCode = 3;
        geolocationError.errorMessage = "请求IP地理定位信息失败";

        errorCallback(geolocationError);
    }
    
    utils.jsonp({
        url: 'https://api.map.baidu.com/location/ip?',
        data: {
            'ak': webAPIAK,
            'qt': 'loc',
            'coor': this.config.coord,
            'timeout': 1000
        },
        callbackFn: function (res) {
            window[randomCallbackName](res);
            return;
        }
    });
}

/**
 * 坐标转换
 */
function Convertor() {

}

Convertor.prototype.transelate = function (points, from, to, callback) {
    from = from || 1;
    to = to || 5;
    // 最多一次转换10个，如果超过限制返回状态码25,不调用后台服务
    if (points.length > 10) {
        callback && callback({'status': 25});
        return;
    }
    var url = 'https://api.map.baidu.com/geoconv/v1/?coords=';

    for (var s = 0; s < points.length; s++) {
        url += points[s].longitude + ',' + points[s].latitude + ';';
    }
   
    // 去除最后一个分号
    url = url.replace(/;$/gi, '');

    // 添加其他参数到url
    url = url + '&from=' + from + '&to=' + to + '&ak=' + webAPIAK;

    utils.jsonp({
        url: url,
        data: {
        },
        callbackFn: function (res) {
            callback && callback(res);
            return;
        }
    });
}

/**
 * 定位出的地理位置信息
 */
function GeolocationInfo() {
    /**
     * 定位精确程度，单位为米。
     * @expose
     */
    this.accuracy = null;

    /**
     * 高度
     * @expose
     */
    this.altitude = null;

    /**
     * 高度精确度
     * @expose
     */
    this.altitudeAccuracy = null;

    /**
     * @expose
     */
    this.heading = null;

    /**
     * 经度
     * @expose
     */
    this.latitude = null;

    /**
     * 纬度
     * @expose
     */
    this.longitude = null;

    /**
     * 速度
     * @expose
     */
    this.speed = null;

    /**
     * 时间戳
     * @expose
     */
    this.timestamp = null;

    /**
     * 坐标点
     * @expose
     */
    this.point = null;

    /**
     * 地址信息
     * @expose
     */
    this.address = {
        /**
         * 国家
         * @expose
         */
        country: '',
        /**
         * 城市
         * @expose
         */
        city: '',

        /**
         * 城市代码
         * @expose
         */
        city_code: 0,

        /**
         * 区域
         * @expose
         */
        district: '',

        /**
         * 省
         * @expose
         */
        province: '',

        /**
         * 街道
         * @expose
         */
        street: '',

        /**
         * 街道门牌号
         * @expose
         */
        street_number: ''
    };
}

/**
 * 定位错误结果
 */
function GeolocationError(message) {
    /**
     * 错误类型
     */
    this.errorType = 'geolocation';

    /**
     * 错误信息
     */
    this.errorMessage = message;

    /**
     * 错误状态码
     */
    this.errorCode = 1;

    /**
     * 定位被拒绝
     */
    this.ERR_PERMISSION_DENIED = 1;

    /**
     * 定位不可用
     */
    this.ERR_POSITION_UNAVAILABLE = 2;

    /**
     * 定位超时
     */
    this.ERR_TIMEOUT = 3;
}

function  Sugsearch(keywords, city) {
    this.location = city;
    this.ak = webAPIAK;
    this.query = keywords;
}
Sugsearch.prototype.suggestion = function (successCallback) {
    var randomNumber = Math.floor(Math.random() * 100000);
    var randomCallbackName = "_cbk" + randomNumber;

    /**
     * 向全局注入一个随机函数
     */
    window[randomCallbackName] = function(response) {
        // var response = json['']
        // 返回的数据可以参照高精度IP定位 web api的文档
        if (response['status'] === 0) {
            successCallback(response.result);
        }
        else {
            successCallback([]);
        }
    }
    
    utils.jsonp({
        url: 'https://api.map.baidu.com/place/v2/suggestion?',
        data: {
            'ak': this.ak,
            'query': this.query,
            'region': this.location,
            'output' : 'json'
        },
        callbackFn: function (res) {
            window[randomCallbackName](res);
            return;
        }
    });
}

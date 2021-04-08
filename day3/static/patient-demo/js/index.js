
$(document).ready(function () {
    var trackTool = new patientMap();
});
var  POI_ICON_PATH = './images/poi-icon.png';

var POI_ICON_LARGE_PATH = './images/poi-icon-large.png';
var POI_ICON_MERGE_PATH = './images/poi-icon-merge.png';
var COMMUNITY_ICON_PATH = './images/community.png';
var POI_ICON_PATH_BLUE = './images/blue-icon-big.png';
var POI_SMALL_ICON_PATH = './images/blue-icon-small.png';
var POI_TRANS_ICON_PATH = './images/transparent.gif';
var MARKER_SIZE = new BMapGL.Size(30, 34);
var MARKER_ANCHOR = new BMapGL.Size(15, 31);
var MARKER_SIZE_LARGE = new BMapGL.Size(42, 46);
var MARKER_SIZE_LARGER = new BMapGL.Size(42, 46);
var MARKER_ANCHOR_LARGE = new BMapGL.Size(21, 42);
var MARKER_ANCHOR_LARGER = new BMapGL.Size(21, 42);
// input改变触发的时间间隔
var Timespace = 3000;
var marker = null;
var showCardCallback = function () {};

var SHOW_TEXT_MARKER_ZOOM = 14;
function patientMap() {
    this.scaleCtr = '';
    this.geolocationCtr = '';
    this.center = new BMapGL.Point(116.404, 39.915);
    this.zoom = 13;
    this.currentZoom = 0;
    this.beforeZoom = 0
    this.map = BMapGL.RenderTypeUtils.ifSupportWebGL() ? 
        new BMapGL.Map('allmap', {
            style: {styleJson: customStyle},
            enableRotateGestures: false,
            enableTiltGestures: false,
            enableResizeOnCenter: true,
            enableCapture: true,
            displayOptions: {
                indoor: false
            }
        }) : 
        new BMapGL.Map('allmap', {
            enableRotateGestures: false,
            enableTiltGestures: false,
            enableResizeOnCenter: true,
            enableCapture: true,
            displayOptions: {
                indoor: false
            }
        })
    
    this.currentCity = '北京市'
    // 地点检索结果的marker
    this.searchMarker = '';
    // 地点检索结果的小marker
    this.searchsmallMarker = '';
    this.emptyMarker = '';
    this.init();
    this.locationCircleOutter = new BMapGL.Circle(this.center, 3000, {
        strokeColor: '#3385FF',
        strokeOpacity: .2,
        fillColor: '#4180DF',
        fillOpacity: .1,
        strokeWeight: .5
    });
    this.locationCircleInner = new BMapGL.Circle(this.center, 1000, {
        strokeColor: '#3385FF',
        strokeOpacity: .3,
        fillColor: '#4180DF',
        fillOpacity: .2,
        strokeWeight: .5
    });
    this.oneKMIcon = new BMapGL.Icon('./images/1km.png', new BMapGL.Size(21, 9), {
        imageSize: new BMapGL.Size(21, 9),
        anchor: new BMapGL.Size(11, 12)
    });
    
    this.threeKMIcon = new BMapGL.Icon('./images/3km.png', new BMapGL.Size(23, 10), {
        imageSize: new BMapGL.Size(23, 10),
        anchor: new BMapGL.Size(12, 13)
    });
    this.oneKMMarker = new BMapGL.Marker(this.center, {
        icon: this.oneKMIcon
    });
    this.threeKMMarker = new BMapGL.Marker(this.center, {
        icon: this.threeKMIcon
    });

    this.poiIcon = new BMapGL.Icon(POI_ICON_PATH, MARKER_SIZE, {
        imageSize: MARKER_SIZE,
        anchor: MARKER_ANCHOR
    });
    this.currentViewMarkers = [];
    this.nearbyCard = '';

}
patientMap.prototype ={
    constructor: patientMap,

    init: function () {
        this.initMap();
        this.eventBind();
    },

    eventBind: function () {
        var that = this;
        var basicli = '<li class="search-sug-none">'
        + '<span class="search-sug-none-icon"></span>'
        + '<p class="search-sug-none-txt">您查找的场所暂未收录</p>'
        + '<p class="search-sug-none-txt-s">请尝试更换名称继续查找</p>'
        + '</li>';
        var searchInput = document.getElementById('searchinput');
        var cancelBtn = document.getElementById('cancelBtn');
        searchInput.onfocus = function () {
            cancelBtn.style.display = 'block';
        };

        searchInput.onblur = function () {
            // 失去焦点的触发事件
        };

        cancelBtn.addEventListener('click', function () {
            cancelBtn.style.display = 'none';
            searchInput.value = '';
            document.getElementById('searchResult').style.display = 'none';
            document.getElementById('searchResult').innerHTML = basicli;
        });
        searchInput.addEventListener('input', that.debounce(function () {
            var resultLi = '';
            if (searchInput.value !== '') {
                var searchService = new Sugsearch(searchInput.value, that.currentCity);
                searchService.suggestion(function(response){
                    if (response.length) {
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].location && response[i].location.lng) {
                                resultLi += '<li class="search-sug-list has-border-bottom" data-position="'
                                + response[i].location.lng
                                + ',' + response[i].location.lat  + '">'
                                + '<p class="search-sug-list-name">'
                                + response[i]['name']
                                + '</p> <span class="search-sug-list-addr">'
                                + response[i]['city'] + '-' + response[i]['district']
                                + '</span></li>'
                            }
                            
                        }
                        var sugReContainer = document.getElementById('searchResult');
                        sugReContainer.style.display = 'block';
                        sugReContainer.innerHTML = resultLi;

                        sugReContainer.onclick = function(event){
                            var e = event || window.event;
                            　  //标准浏览器用e.target，IE浏览器用event.srcElement
                                var target = e.target || e.srcElement;
                                var position = '';
                                var name = '';
                                var address = ''
                                if(target.nodeName.toLowerCase() === 'span' || target.nodeName.toLowerCase() === 'p'){
                                    var realtarget =  target.parentNode;
                                    position = realtarget.getAttribute('data-position');
                                    name = realtarget.firstChild.innerHTML;
                                    address = realtarget.lastChild.innerHTML
                                }
                                else if (target.nodeName.toLowerCase() === 'li') {
                                    position = target.getAttribute('data-position');
                                    name = target.firstChild.innerHTML;
                                    address = target.lastChild.innerHTML
                                }
                                // 设置input value，隐藏下拉
                                sugReContainer.style.display = 'none';
                                sugReContainer.innerHTML = basicli;
                                searchInput.value = name;
                                cancelBtn.style.display = 'none';
                                var newCenter = new BMapGL.Point(position.split(',')[0], position.split(',')[1]);
                                // 重置中心点
                                that.currentCity = address.split('-')[0];
                                that.map.setCenter(newCenter);
                                // mapUtils.showNearbyCard(position, '', true, () => {
                                //     this.$emit('hide-info-card');
                                // }, data.city);
                                // this.lastCityName = data.city;
                                // this.updateCity(data.city);
                                // this.setMapCenter(position);
                                // 设置附近圆圈
                                that.showLocationCircle(newCenter);
                                that.addNearbyMarker(newCenter, that.map);
                                // 展示周围疫情窗口
                                that.addNearbyCard(newCenter, that.map,'131', true,showCardCallback, address.split('-')[0]);
                                that.hideInforCard();
                        }
                    }
                })                
            } else {
                document.getElementById('searchResult').innerHTML = '';
            }
        }, 150));

    },

    initMap: function (){
       var that = this;
        // gl地图
        this.map.centerAndZoom(this.center, that.zoom);
        this.map.enableScrollWheelZoom();

        // gl版的定位功能
        var geolocation = new BMapGL.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                // 添加定位结果覆盖物
                var pt = r.point;
                that.currentCity = r.address.city;
                that.zoom = 13;
                that.currentZoom = 13;
                that.map.centerAndZoom(pt, 13);
                var myIcon = new BMapGL.Icon(
                        'https://webmap0.bdimg.com/res/litemapapi/v1d1/images/loc_new.png',
                        new BMapGL.Size(48, 48),
                        {
                            anchor: new BMapGL.Size(0, 48),
                            imageSize: new BMapGL.Size(48, 116),
                            imageOffset: new BMapGL.Size(0, 20)
                        }
                    );
                var marker = new BMapGL.Marker(pt, {
                    icon: myIcon,
                    offset: new BMapGL.Size(-24, 24)
                });
                that.map.addOverlay(marker); 
                that.showLocationCircle(pt, 'locposition');
                that.updatePoiMarkers(that.zoom);
                that.addEmptyMarker(pt, that.map);
                that.addNearbyCard(pt, that.map,'131', false, showCardCallback, that.currentCity );
                that.hideInforCard();
            }
            else {
                that.updatePoiMarkers(that.zoom);

                console.log('定位失败' + this.getStatus());
            }        
        },{enableHighAccuracy: true, timeout: 1500});
        this.map.addEventListener('zoomend', function () {
            var centerpoint = new BMapGL.Point(that.map.getCenter().lng, that.map.getCenter().lat);
            var geocoder = new BMapGL.Geocoder();
            geocoder.getLocation(centerpoint, function(rs){
                var addComp = rs.addressComponents;
                that.currentCity = addComp.city;
            }); 
            var newZoom = Math.floor(this.getZoom());
            if (Math.abs(that.zoom - newZoom) >= 1 || that.zoom === 13) {
                // 保证只在跨越了一个整数级别再重绘
                that.zoom = newZoom;
                // that.getPoisInView(map).then(res => {
                that.updatePoiMarkers(newZoom);
                // });
            }
            // that.updateCommunityMarker(newZoom);
        });

        this.map.addEventListener('moveend', function () {
            var centerpoint = new BMapGL.Point(that.map.getCenter().lng, that.map.getCenter().lat);
            var geocoder = new BMapGL.Geocoder();
            geocoder.getLocation(centerpoint, function(rs){
                var addComp = rs.addressComponents;
                that.currentCity = addComp.city;
            }); 
        });

        // 定义一个控件类,即function
        function GeolocationControl(){
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
            this.defaultOffset = new BMapGL.Size(10, 55);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        GeolocationControl.prototype = new BMapGL.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        GeolocationControl.prototype.initialize = function(){
            // 创建一个DOM元素
            var div = document.createElement("div");
            div.className = 'loc-contrl';
            var divIcon = document.createElement("div");
            divIcon.className = 'loc-icon';
            div.appendChild(divIcon);
            // 绑定事件,点击一次放大两级
            div.onclick = function(e){
                var geoloc = new BMapGL.Geolocation();
                geoloc.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        document.getElementById('searchinput').value = '';
                        if (that.searchMarker !== '') {
                            that.map.removeOverlay(that.searchMarker)
                        }
                        that.currentCity = r.address.city;
                        // 添加定位结果覆盖物
                        var pt = r.point;
                        that.zoom = 13;
                        that.currentZoom = 13;
                        that.map.centerAndZoom(pt, 13);  
                        that.showLocationCircle(pt, 'locposition');
                        that.addNearbyCard(pt, that.map,'131', false,showCardCallback, that.currentCity );
                        that.hideInforCard();
                    }
                    else {
                        that.updatePoiMarkers(that.zoom);
                        console.log('定位失败' + this.getStatus());
                    }        
                },{enableHighAccuracy: true, timeout: 1500});
            }
            // div.onmousedown = function(e) {
            //     e.target.style.background = 'rgb(155,155,155) !important';
            // }
            // div.onmouseup = function(e) {
            //     e.target.style.background = 'rgb(255,255,255) !important';
            // }
            // divIcon.onmousedown = function() {
            //     div.style.background = 'rgb(155,155,155) !important';
            // }
            // divIcon.onmouseup = function() {
            //     div.style.background = 'rgb(255,255,255) !important';
            // }
            // 添加DOM元素到地图中
            that.map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }
        that.geolocationCtr = new GeolocationControl();

        // 添加定位控件
        this.map.addControl(that.geolocationCtr);

        // 添加地图缩放控件
        that.scaleCtr = new BMapGL.ZoomControl({
            offset: new BMapGL.Size(10, 20)
        });
        this.map.addControl(that.scaleCtr);

        // 设置地图log偏移量
        this.map.setCopyrightOffset(
            new BMapGL.Size(10, 15)
        );
    },

    showLocationCircle: function(position, locationCircleInner) {
        var that = this;
        var pt = new BMapGL.Point(position.lng, position.lat);
        if (!locationCircleInner) {
            that.locationCircleOutter.setCenter(pt);
            that.locationCircleInner.setCenter(pt);
            // that.map.addOverlay(that.locationCircleOutter);
            // that.map.addOverlay(that.locationCircleInner);
            // var oneKMPosition = pt.clone();
            // oneKMPosition.lat -= that.getMCSpanByMeter(pt, 1000);
            // oneKMMarker = new BMapGL.Marker(oneKMPosition, {
            //     icon: that.oneKMIcon
            // });
            // that.map.addOverlay(oneKMMarker);
            // var threeKMPosition = pt.clone();
            // threeKMPosition.lat -= this.getMCSpanByMeter(pt, 3000);
            // threeKMMarker = new BMapGL.Marker(threeKMPosition, {
            //     icon: that.threeKMIcon
            // });
            // that.map.addOverlay(threeKMMarker);
        } else {
            that.locationCircleOutter.setCenter(pt);
            that.locationCircleInner.setCenter(pt);
            that.map.addOverlay(that.locationCircleOutter);
            that.map.addOverlay(that.locationCircleInner);
            var oneKMPosition = pt.clone();
            oneKMPosition.lat -= that.getMCSpanByMeter(pt, 1000);
            that.oneKMMarker.setPosition(oneKMPosition);
            that.map.addOverlay(that.oneKMMarker);
            var threeKMPosition = pt.clone();
            threeKMPosition.lat -= this.getMCSpanByMeter(pt, 3000);
            that.threeKMMarker.setPosition(threeKMPosition);
            that.map.addOverlay(that.hreeKMMarker);
        }
    },

    getMCSpanByMeter(center, radius) {
        var d = radius / 6370996.81;
        var centerLngLat = BMapGL.Projection.convertMC2LL(center);
        var lng1 = (Math.PI / 180) * centerLngLat.lng;
        var lat1 = (Math.PI / 180) * centerLngLat.lat;
        var tc = 0;
        var y = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(tc));
        var dlng = Math.atan2(Math.sin(tc) * Math.sin(d) * Math.cos(lat1),
            Math.cos(d) - Math.sin(lat1) * Math.sin(y));
        var x = ((lng1 - dlng + Math.PI) % (2 * Math.PI)) - Math.PI;
        var latLng = new BMapGL.Point(y * (180 / Math.PI), x * (180 / Math.PI));

        var refPoint = BMapGL.Projection.convertLL2MC(latLng);
        return Math.sqrt(Math.pow(refPoint.lng - center.lng, 2)
            + Math.pow(refPoint.lat - center.lat, 2));
    },
    updatePoiMarkers (zoom) {
        var that = this;
        var map = this.map;
        // 移除当前所有 marker
        this.currentViewMarkers.forEach(marker => map.removeOverlay(marker));
        that.currentViewMarkers.length = 0;
        // 添加新 marker
        var icon;
        if (zoom > 9) {
            // 单个
            that.beforeZoom = zoom;
            icon = that.poiIcon;
            BJData.forEach(item => {
                var pos = item.point;
                var mkr = new BMapGL.Marker(new BMapGL.Point(pos[0], pos[1]), {
                    icon: icon
                });
                mkr.addEventListener('click', function (e) {
                    that.removeNearbyCard(map, new BMapGL.Point(e.target.latLng.lng, e.target.latLng.lat));
                    that.map.centerAndZoom(new BMapGL.Point(e.target.latLng.lng, e.target.latLng.lat), that.map.getZoom() + 2);
                    that.showinfoCard();

                });
                map.addOverlay(mkr);
                mkr.poiUid = item.uid;
                that.currentViewMarkers.push(mkr);
            });
        } else if (zoom < 10 && zoom > 6) {
            that.beforeZoom = zoom;
            var img = new Image();
            img.src = POI_ICON_MERGE_PATH;
            img.onload = function () {
                cityData.forEach(item => {
                    var pos = item.point;
                    var icon;
                    if (item.patient_poi_number >= 100) {
                        icon = that.generateMaximumNumberIcon(img, {
                            textColor: '#fff',
                            font: 'bold 24px sans-serif'
                        });
                    } else {
                        icon = that.generateMergedIcon(img, {
                            text: item.patient_poi_number,
                            drawPosition: [30, 36],
                            textColor: '#fff',
                            font: 'bold 28px sans-serif'
                        });
                    }
                    var mkr = new BMapGL.Marker(new BMapGL.Point(pos[0], pos[1]), {
                        icon
                    });
                    mkr.addEventListener('click', function (e) {
                        map.centerAndZoom(e.target.latLng, 13);
                    });
                    that.map.addOverlay(mkr);
                    mkr.poiUid = item.uid;
                    that.currentViewMarkers.push(mkr);
                });
            };
            
        }
        else if (zoom < 7){
            that.beforeZoom = zoom;
            var img = new Image();
            img.src = POI_ICON_MERGE_PATH;
            img.onload = function () {
                provinceData.forEach(item => {
                    var pos = item.point;
                    var icon;
                    if (item.patient_poi_number >= 100) {
                        icon = that.generateMaximumNumberIcon(img, {
                            textColor: '#fff',
                            font: 'bold 24px sans-serif'
                        });
                    } else {
                        icon = that.generateMergedIcon(img, {
                            text: item.patient_poi_number,
                            drawPosition: [30, 36],
                            textColor: '#fff',
                            font: 'bold 28px sans-serif'
                        });
                    }
                    var mkr = new BMapGL.Marker(new BMapGL.Point(pos[0], pos[1]), {
                        icon
                    });
                    mkr.addEventListener('click', function (e) {
                        map.centerAndZoom(e.target.latLng, 8);
                    });
                    that.map.addOverlay(mkr);
                    mkr.poiUid = item.uid;
                  
                    that.currentViewMarkers.push(mkr);
                });
            }
        }
        
    },
    generateMaximumNumberIcon(image, options) {
        var canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 67;
        canvas.style.width = options.width + 'px';
        canvas.style.height = options.height + 'px';
        var ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        ctx.drawImage(image, 0, 0, 60, 67);
        // 绘制文字
        ctx.fillStyle = options.textColor || '#000';
        ctx.font = options.font;
        ctx.fillText('99', 26, 36);

        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('+', 45, 29);
        var dataImg = new Image()
        dataImg.src = canvas.toDataURL('image/png');
        var icon = new BMapGL.Icon(dataImg.src, MARKER_SIZE, {
            imageSize: MARKER_SIZE,
            anchor: MARKER_ANCHOR
        });
        return icon;
    },

    generateMergedIcon(image, options) {
        var textIndex = parseInt(options.text, 10);
        
        var canvas = document.createElement('canvas');

        canvas.width = 60;
        canvas.height = 67;
        canvas.style.width = options.width + 'px';
        canvas.style.height = options.height + 'px';
        var ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        // 将图片画到canvas上面上去！
        ctx.drawImage(image, 0, 0, 60, 67);
        // 绘制文字
        ctx.fillStyle = options.textColor || '#000';
        ctx.font = options.font;
        ctx.fillText(options.text, options.drawPosition[0], options.drawPosition[1]);
        var dataImg2 = new Image()
        dataImg2.src = canvas.toDataURL('image/png')
        var icon = new BMapGL.Icon(dataImg2.src, MARKER_SIZE, {
            imageSize: MARKER_SIZE,
            anchor: MARKER_ANCHOR
        });
        return icon;
    },
    // 清除定位半径
    removeLocationCircle() {
        if (locationCircleOutter) {
            map.removeOverlay(locationCircleOutter);
            map.removeOverlay(locationCircleInner);
            map.removeOverlay(oneKMMarker);
            map.removeOverlay(threeKMMarker);
        }
    },
    // 如果定位不成功或者检索发起的显示周边疫情卡片
    addNearbyMarker(point) {
        var that = this;
        if (that.searchMarker !== '') {
            that.map.removeOverlay(that.searchMarker);
        }
        if (that.searchsmallMarker) {
            that.map.removeOverlay(that.searchsmallMarker);
        }

        var icon = new BMapGL.Icon(POI_ICON_PATH_BLUE, MARKER_SIZE_LARGER, {
            imageSize: MARKER_SIZE_LARGER,
            anchor: MARKER_ANCHOR_LARGER
        });
        that.searchMarker = new BMapGL.Marker(point, {
            icon: icon
        });
        that.searchMarker.addEventListener('click', function(e){
            that.map.removeOverlay(that.nearbyCard);
            that.addSmallMaker(point);
        });

        that.map.addOverlay(that.searchMarker);
        markerType = 'BigMarker';
    },
    addSmallMaker(point, map) {
        var that = this;
        if (that.searchsmallMarker !== '') {
            that.map.removeOverlay(that.searchsmallMarker);
        }
        if (that.searchMarker !== '') {
            that.map.removeOverlay(that.searchMarker);

        }
        var icon = new BMapGL.Icon(POI_SMALL_ICON_PATH, MARKER_SIZE_LARGER, {
            imageSize: MARKER_SIZE,
            anchor: MARKER_ANCHOR
        });
        that.searchsmallMarker = new BMapGL.Marker(point, {
            icon: icon
        });

        that.searchsmallMarker.addEventListener('click', () => {
            this.showCard(that.map, that.searchsmallMarker.getPosition());
            // map.panTo(point);
            this.addNearbyMarker(point, that.map);
        });

        that.map.addOverlay(that.searchsmallMarker);
        markerType = 'SmallMarker';
    },
    // 添加一个透明的marker，为了点击marker调起疫情卡片。只有在定位成功添加
    addEmptyMarker(point, map) {
        var that = this;
        if (that.searchMarker !== '') {
            map.removeOverlay(that.searchMarker !== '');
        }
        if (that.searchsmallMarker) {
            map.removeOverlay(that.searchsmallMarker);
        }
        var size = new BMapGL.Size(48, 48);
        var anchor = new BMapGL.Size(24, 24);
        var icon = new BMapGL.Icon(POI_TRANS_ICON_PATH, size, {
            imageSize: size,
            anchor: anchor
        });
        that.emptyMarker = new BMapGL.Marker(point, {
            icon: icon
        });
        that.emptyMarker.setZIndex(1);
        that.emptyMarker.addEventListener('click', () => {
            if (bShowNearby) {
                map.removeOverlay(that.nearbyCard);
            }
            else {
                this.showCard(map, point);
            }
            bShowNearby = !bShowNearby;
        });
        that.emptyMarker.addEventListener('touchend', () => {
            if (bShowNearby) {
                map.removeOverlay(that.nearbyCard);
            }
            else {
                this.showCard(map, point);
            }
            bShowNearby = !bShowNearby;
        });
        map.addOverlay(that.emptyMarker);
        markerType = 'TransMarker';
    },

    // 添加周边疫情窗口
    addNearbyCard(position, map, cityid, showMarker, showCallback, cityName) {
        var that = this;
        if (that.nearbyCard !== '') {
            that.map.removeOverlay(that.nearbyCard);
        }
        showCardCallback = showCallback;
        try {
            var point = new BMapGL.Point(position.lng, position.lat);
            var cityName = cityName;
            var data = {
                patient_poi_number: '**',
                patient_poi_number_1km: 0,
                patient_poi_number_3km: 1,
                nearest_poi: {uid: "50fb64ff739be75de9f8536a", point: "12950404.00,4849659.50", poi_name: "***小区"},
                nearest_poi_around_hot_area_list: [{uid: "fa19dbf49e23fca6c5f50d01", poi_name: "**市**路参观购物中心"},{uid: "fa19dbf49e23fca6c5f50d01", poi_name: "**市**路菜市场"},{uid: "fa19dbf49e23fca6c5f50d01", poi_name: "**市**路菜市场"}],
                update_time: ''
            };
            let self = this;
            if (showMarker) {
                that.addNearbyMarker(point, map);
            }
            else {
                that.addEmptyMarker(point, map);
            }
            that.nearbyCard = new NearbyOverlay(point, data, marker, showMarker, cityName, function () {
                that.removeNearbyCard(that.map, point);

                if (showMarker) {
                    that.addSmallMaker(point, that.map);
                }
            });
            this.showCard(that.map);
            that.map.panBy(0, 20);
            bShowNearby = true;
        }
        catch (e) {
            console.log(e);
        }
    },

    // 卡片已创建好显示卡片
    showCard(map, position) {
        var that = this;
        if (that.nearbyCard !== '') {
            that.map.addOverlay(that.nearbyCard);
            if (position) {
                that.map.centerAndZoom(position, 13);
            } else {
                that.map.setZoom(13, {noAnimation: true});
            }
            showCardCallback();
        }
    },

    // 隐藏周边疫情卡片
    removeNearbyCard(map, point) {
        var that = this;
        if (that.nearbyCard !== '') {
            that.map.removeOverlay(that.nearbyCard);
            that.bShowNearby = false;
            // 如果当前显示的是大marker，需要显示小marker
            // if (markerType === 'BigMarker') {
            //     that.addSmallMaker(point, map);
            // }
        }
    },

    showinfoCard () {
        var that = this;
        if (this.scaleCtr !== '' && !that.IsPC()) {
            this.scaleCtr.setOffset(new BMapGL.Size(10, 170));
            this.geolocationCtr.setOffset(new BMapGL.Size(10, 170));
            
        }
        // this.map.setCopyrightOffset(
        //     new BMapGL.Size(50, 163)
        // );
        document.getElementById('inforcard').style.display = 'block';
    },
    hideInforCard() {
        document.getElementById('inforcard').style.display = 'none';
        if (this.scaleCtr !== '') {
            this.scaleCtr.setOffset(new BMapGL.Size(10, 20));
            this.geolocationCtr.setOffset(new BMapGL.Size(10, 55));
            // 设置地图log偏移量
            
        }
        // this.map.setCopyrightOffset(
        //     new BMapGL.Size(50, 33)
        // );
    },

    // 节流函数
    debounce(fn, delay) {
        var timer
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(this, args)
          }, delay)
        }
    },
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        if(window.screen.width>=768){
             flag = true;
        }
        return flag;
    }
}

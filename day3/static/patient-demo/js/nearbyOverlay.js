var ArrowImg = './images/arrow.png';
var CloseImg = './images/close.png';
var PoiImg = './images/poi.png';
var LogoImg = './images/logo.png';

function NearbyOverlay(point, data, marker, showMarker, cityName, closeCallback) {
    this._point = point;
    this._data = data;
    this._marker = marker;
    this._closeCallback = closeCallback;
    this._showMarker = showMarker;
    this._cityName = cityName;
}
NearbyOverlay.prototype = new BMapGL.Overlay();

NearbyOverlay.prototype.initialize = function (map) {
    this._map = map;

    let div = this._div = document.createElement("div");

    // div.style.backgroundColor = '#FFF';
    // div.style.fontFamily = 'PingFangSC-Regular';
    // div.style.position = "absolute";
    div.style.zIndex = BMapGL.Overlay.getZIndex(this._point.lat);
    // div.style.padding = '.4rem .3rem .3rem';
    // div.style.width = '5.4rem';
    // div.style.whiteSpace = "nowrap";
    // div.style.MozUserSelect = "none";
    // div.style.borderRadius = '12px';
    // div.style.boxShadow = '1px 2px 12px 0 rgba(195,195,195,0.55)';

    div.className = 'infor-container';

    // 添加显示内容
    div.appendChild(this._addTitle());
    div.appendChild(this._addClose());
    div.appendChild(this._addContent());
    div.appendChild(this._addFooter());
    div.appendChild(this._addArrow());

    map.getPanes().labelPane.appendChild(div);
    return div;
}
// 添加标题栏
NearbyOverlay.prototype._addTitle = function () {
    let h2 = document.createElement("h2");
    h2.className = 'infor-title';
    h2.appendChild(document.createTextNode('周边疫情'));

    return h2;
}
// 添加close按钮
NearbyOverlay.prototype._addClose = function () {
    let div = document.createElement('div');
    div.className = 'infor-close';
    

    let close = document.createElement('img');
    close.src = CloseImg;
    
    close.className = 'infor-close-img';
    div.addEventListener('click', () => {
        this._closeCallback();
    });
    div.addEventListener('touchend', () => {
        this._closeCallback();
    });
    div.appendChild(close);
    return div;
}
// 添加内容文字
NearbyOverlay.prototype._addContent = function () {
    let data = this._data;
    let p = document.createElement('p');

    p.className = 'infor-content'
    

    p.appendChild(this._addSpan(`${this._cityName}`));
    if (data['patient_poi_number'] <= 0) {
        p.appendChild(document.createTextNode('还没有公布'));
        return p;
    }
    // 如果有疫情数据
    p.appendChild(document.createTextNode('已公布'));
    p.appendChild(this._addSpan(`${data['patient_poi_number']}个`));
    p.appendChild(document.createTextNode('场所，距离最近的在'));

    let poi = document.createElement('img');
    poi.src = PoiImg;
    poi.className = 'infor-poi';
    
    p.appendChild(poi);

    p.appendChild(this._addSpan(`${data['nearest_poi']['poi_name']}`));
    p.appendChild(document.createTextNode('('));

    let position = data['nearest_poi']['point'].split(',');
    let end = new BMapGL.Point(position[0], position[1]);
    // 注意这里不要用地图中心点算距离，是错误的。这里计算的是附近POI距离定位点或用户关注点的距离
    // 和地图的中心点无关
    let distance = this._map.getDistance(this._point, end);
    if (distance >= 1000) {
        distance = `${(distance / 1000).toFixed(2)}公里`;
    }
    else {
        distance = `${Math.floor(distance)}米`;
    }
    distance = '**公里'
    p.appendChild(this._addSpan(distance));
    p.appendChild(document.createTextNode(')'));

    let list = data['nearest_poi_around_hot_area_list'].reduce(function (prev, item, index) {
        if (index >= 2) {
            return prev;
        }
        prev.push(item.poi_name);
        return prev;
    }, []);
    if (list.length) {
        p.appendChild(document.createTextNode('，该场所周边人流聚集地是'));
        p.appendChild(this._addSpan(`${list.join('、')}`));
        p.appendChild(document.createTextNode('等场所'));
    }
    p.appendChild(document.createTextNode('。'));

    let num1 = data['patient_poi_number_1km'];
    let num3 = data['patient_poi_number_3km'];
    let show3km = num3 > 1 && num3 > num1;
    // 大于1个才显示
    if (num1 > 1) {
        p.appendChild(document.createTextNode('1km内患者曾活动场所有'));
        p.appendChild(p.appendChild(this._addSpan(`${num1}个`)));

        let dot = show3km ? '，' : '。'; // 根据是否显示3km处理符号
        p.appendChild(document.createTextNode(dot));
    }
    // 只有3km内个数多余1km内个数才显示
    if (show3km) {
        p.appendChild(document.createTextNode('3km内患者曾活动场所有'));
        p.appendChild(p.appendChild(this._addSpan(`${num3}个`)));
        p.appendChild(document.createTextNode('。'));
    }

    return p;
}
// 添加角标
NearbyOverlay.prototype._addFooter = function () {
    let footer = document.createElement('footer');
    footer.className = 'infor-footer';

    let p = document.createElement('p');
    // p.style.fontSize = '.2rem';
    // p.style.color = '#999';
    p.className = 'infor-update'
    if (this._data['update_time'] === '') {
        p.appendChild(document.createTextNode(`百度地图数据更新时间: 2020年**月**日 12:00`));

    } else {
        p.appendChild(document.createTextNode(`百度地图数据更新时间:${this._getTime(this._data['update_time'])}`));
    }
    p.style.transform = `scale(${20/24})`;
    p.style.transformOrigin = 'left';
    p.style.float = 'left';
    footer.appendChild(p);

    let logo = document.createElement('img');
    logo.src = LogoImg;
  
    logo.className = 'infor-logo';
    footer.appendChild(logo);
    return footer;
}
NearbyOverlay.prototype._addArrow = function () {
    let arrow = document.createElement('img');
    arrow.src = ArrowImg;
    arrow.className = 'infor-arrow';
    return arrow;
}
// 添加内容中的红色文字
NearbyOverlay.prototype._addSpan = function (txt) {
    let span = document.createElement('span');
    span.style.color = '#F75B5C';
    span.appendChild(document.createTextNode(txt));
    return span;
}

NearbyOverlay.prototype._getTime = function (time) {
    if (!time) {
        return;
    }
    let d = new Date(time * 1000);
    let h = d.getHours();
    h = h > 9 ? h : `0${h}`;
    let m = d.getMinutes();
    m = m > 9 ? m : `0${m}`;
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${h}:${m}`;
}

NearbyOverlay.prototype.draw = function () {
    let map = this._map;
    let pixel = map.pointToOverlayPixel(this._point);
    let offset = 20;
    if (this._marker) {
        if (this._showMarker) {
            offset = this._marker.getIcon().size.height;
        }
        else { // 如果不显示marker说明是透明的marker, 该marker anchor为中心点
            offset = this._marker.getIcon().size.height / 2;
        }
    }
    let h = this._div.clientHeight + offset;
    let w = this._div.clientWidth / 2;
    this._div.style.top  = pixel.y - h + "px";
    this._div.style.left = pixel.x - w + 'px';
}

// 初始化TMS图层
var tilerlayer;
var attr = '<a href="http://www.arctiler.com/">太乐地图</a> © 2016';
var url = tmsUrl + "/{z}/{x}/{-y}." + format2;
tileLayer = new ol.layer.Tile({
	opacity: 1,
	source: new ol.source.XYZ({
		attributions: attr,
		minZoom: layerIds[0],
		maxZoom: layerIds[layerIds.length-1],
		projection: ol.proj.get('EPSG:' + wkid),
		url: url
	})
})
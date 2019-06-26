// 初始化WMTS图层
var tilerlayer;
var attr = '<a href="http://www.arctiler.com/">太乐地图</a> © 2016';
tileLayer = new ol.layer.Tile({
  opacity: 1,
  source: new ol.source.WMTS({
	attributions: attr,
	url: wmtsUrl,
	layer: layer,
	matrixSet: matrixSet,
	format: format,
	projection: ol.proj.get('EPSG:' + wkid),
	tileGrid: new ol.tilegrid.WMTS({
	  origin: ol.extent.getTopLeft(ol.proj.get('EPSG:' + wkid).getExtent()),
	  resolutions: resolutions,
	  matrixIds: layerIds
	}),
	style: 'default',
	wrapX: true
  })
});
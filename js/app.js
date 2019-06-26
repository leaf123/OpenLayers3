var map, view;

function init(){
	var epsg = 'EPSG:' + wkid;
	var proj = ol.proj.get(epsg);
	var projExtent = proj.getExtent();
	var center = ol.proj.transform([centerLng, centerLat], 'EPSG:4326', epsg);
	
	// 初始化显示视图
	view = new ol.View({
		center: center,
		projection: proj,
		zoom: layerIds[Math.floor(layerIds.length/2)],
		minZoom: layerIds[0]
	});
	
	// 初始化地标图层
	var iconFeature = new ol.Feature({
	  geometry: new ol.geom.Point(center),
	  name: '站在分叉的十字路口，你会迷失还是继续前行？</br>太乐地图，让地理信息应用选择更简单。',
	  population: 4000,
	  rainfall: 500
	});

	var iconStyle = new ol.style.Style({
	  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		anchor: [0.5, 46],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		src: 'data/icon.png'
	  }))
	});

	iconFeature.setStyle(iconStyle);

	var vectorSource = new ol.source.Vector({
	  features: [iconFeature]
	});

	var vectorLayer = new ol.layer.Vector({
	  source: vectorSource
	});
		
    // 初始化地图
    map = new ol.Map({
        target: 'map',
		controls: ol.control.defaults().extend([
			new ol.control.FullScreen(),
			new ol.control.OverviewMap(),
			new ol.control.ScaleLine(),
			new ol.control.MousePosition({
				coordinateFormat: ol.coordinate.createStringXY(6),
				projection: ol.proj.get('EPSG:4326'),
				className: 'custom-mouse-position',
				target: document.getElementById('mouse-position')
			}),
		]),
        layers: [tileLayer, vectorLayer],
        loadTilesWhileAnimating: true,
		target: document.getElementById('map'),
        view: view
		});
		
	// 地标相关
	markers();
}

/******************************************************************************************************************
											          地标相关
******************************************************************************************************************/

function markers(){
	var element = document.getElementById('popup');

	var popup = new ol.Overlay({
	  element: element,
	  positioning: 'bottom-center',
	  stopEvent: false,
	  offset: [0, -50]
	});
	map.addOverlay(popup);

	// 鼠标点击后，弹出属性提示框
	map.on('click', function(evt) {
	  var feature = map.forEachFeatureAtPixel(evt.pixel,
		  function(feature) {
			return feature;
		  });
	  if (feature) {
		var coordinates = feature.getGeometry().getCoordinates();
		popup.setPosition(coordinates);
		$(element).popover({
		  'placement': 'top',
		  'html': true,
		  'content': feature.get('name')
		});
		$(element).popover('show');
	  } else {
		$(element).popover('destroy');
	  }
	});
	
	// 鼠标移动后，改变鼠标样式
	map.on('pointermove', function(e) {
	  if (e.dragging) {
		$(element).popover('destroy');
		return;
	  }
	  var pixel = map.getEventPixel(e.originalEvent);
	  var hit = map.hasFeatureAtPixel(pixel);
	  map.getTarget().style.cursor = hit ? 'pointer' : '';
	});
}

/******************************************************************************************************************
													窗口控制相关
******************************************************************************************************************/

function showAbout(){
    document.getElementById("aboutContainer").style.visibility = "visible";
}

function hideAbout(){
    document.getElementById("aboutContainer").style.visibility = "hidden";
}
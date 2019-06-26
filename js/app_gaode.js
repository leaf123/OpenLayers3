// 初始化Google图层
var tilerlayer;
var attr = '<a href="http://www.arctiler.com/">太乐地图</a> © 2016';
var url = "http://192.168.1.13:8088/map//tiledmap" + "/{z}/{x}/{y}.png";
tileLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: url
            })
          })
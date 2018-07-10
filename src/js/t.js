//var uploadedDataURL = "http://gallery.echartsjs.com/asset/get/s/data-1506503947494-SJ7GaJtiW.json";
var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var data = [
	{name: '长沙', value: 355},
	{name: '岳阳', value: 239}
];
var geoCoordMap = {
  
    '岳阳':[113.09,29.37],
    '长沙':[113,28.21]
  
};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
     
    return res;
};

//$.get(uploadedDataURL, function(data) {
	function test1(){
		myChart.setOption(
        option = {
        	 tooltip : {
        trigger: 'item'
    },
            bmap: {
                center: [113, 28.21],
                zoom: 12,
                roam: true
              },      
              visualMap: {	// 视觉映射组件
		type: 'continuous',
		min: 0,
		max: 200,
		calculable: true,
		inRange: {
             	color: ['#50a3ba','#eac736','#d94e5d']
          },
		textStyle: {
			color: '#fff'
		}
     	},
            series: [{
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: data, 
                     symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
               
              
             }
            ,
            {
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: 
               convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 10;
           }
                            
            }
            ]
        });
}
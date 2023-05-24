<template>
  <div class="hello" >

<!--	  :emitPath="false"-->
<!--size="large"-->
	<el-cascader ref="el-cascader" :props="{ checkStrictly: true}"
		  @change="administrativeRegionChange"
		v-model="administrativeRegion" :options="options">
	</el-cascader>
	<div class="map" ref="gdMap">
		
	</div>
  </div>
</template>

<script>
	import * as echarts from "echarts";
	
	
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async mounted() {
  	// this.initMap()
	
	
	
	//http://193.112.195.135:800/panoramicInsightLeftOne
	await axios.post('http://193.112.195.135:800/panoramicInsightLeftOne',{
		
	}).then(r=>{
		
		 let result = r.data.data.CompanyNum
		 
		 this.chartData.x = Object.keys(result)
		 this.chartData.y = Object.values(result)
	})
	
	this.chart()
	
	
  },
  data(){
	  return{
		    //初始化地图
			map: "",
			//缓存
			//多边形缓存
			cache: false,
			//条件
			query: {
				//省
				province : '',
				//市
				city: '',
				//先
				country: ''
				
			},
			
			//查询的地区
			dzname: "",
			options: require("@/assets/panoramicInsightarea.json"), // 地区json
			//绑定的数值
			administrativeRegion: ["140000", "140400"],
			
			
			chartData: {
				x: [],
				y: []
			}
	  }
  },
  methods:{
	  initMap() {
	  	this.map = new AMap.Map(this.$refs.gdMap, {
	  		resizeEnable: true,
	  		mapStyle: "amap://styles/darkblue",
	  		center: [116.418261, 39.921984],
	  		zoom: 5,
	  	});
	  },
	  // 行政区切换
	  administrativeRegionChange(value) {
	  
	  	//关闭选项框
	  	this.$refs["el-cascader"].dropDownVisible = false;
	  
	  	this.$nextTick(() => {
	  		let labelValue = this.$refs["el-cascader"].presentText;
	  		let labellist = labelValue.split(" / ")
	  
	  
	  		this.query.province = ''
	  		this.query.city = ''
	  		this.query.country = ''
	  
	  		if (labellist.length == 3) {//县
	  			this.dzname = labellist[2]
	  			
	  			
	  				this.query.province = labellist[0]
	  				this.query.city = labellist[1]
	  				this.query.country = labellist[2]
	  				
	  			
	  
	  		} else if (labellist.length == 2) {//市
	  
	  			//直辖市
	  			if (labellist[0] == '北京市' || labellist[0] == '上海市' || labellist[0] == '天津市' || labellist[
	  					0] == '重庆市') {
	  				this.query.province = labellist[0]
	  				this.query.country = labellist[1]
	  
	  				this.dzname = labellist[1]
	  
	  				this.xrAddress = 4
	  			} else {
	  				this.query.province = labellist[0]
	  				this.query.city = labellist[1]
	  
	  				this.dzname = labellist[1]
	  			}
	  		} else if (labellist.length == 1) {//全国  || 省
	  			this.dzname = labellist[0]
	  			if (labellist[0] != '全国') {
	  				this.query.province = labellist[0]

	  			}
				//默认不填全国
	  		}
	  
	  		// this.query.prototype = labellist
	  
	  		// this.heatmap.setMap(null);
	  		// this.initReLiTu()
			this.initHZMap()
	  
	  	})
	  
	  
	  },
	  
	  initHZMap(){

		  
		  //清除缓存
		  if (this.cache != false) {
		  	this.map.remove(this.cache)
		  	this.cache = false
		  }
		  
		  //是不是选中的全国
		  if (this.dzname != '全国') {
		  
		  	let dname = this.dzname
		  
		  
		  	//绘制地图坐标点
		  	//获取边界坐标点
		  	AMap.plugin('AMap.DistrictSearch', () => {
		  		var districtSearch = new AMap.DistrictSearch({
		  			// 关键字对应的行政区级别，共有5种级别
		  			level: 'province',
		  			//  是否显示下级行政区级数，1表示返回下一级行政区
		  			subdistrict: 0,
		  			// 返回行政区边界坐标点
		  			extensions: 'all',
		  		})
		  
		  		if (dname == "长治经开区") {
		  			let result = {
		  				districtList: [{boundaries: [czjingkaiqu.features[0].geometry.coordinates]}]
		  			}
		  			this.handlePolygon(result)
		  		} else {
		  			// 搜索所有省/直辖市信息
		  			districtSearch.search(dname, (status, result) => {
		  				// 查询成功时，result即为对应的行政区信息
		  				this.handlePolygon(result)
		  			})
		  		}
		  
		  
		  	})
		  }
		  
		  
	  },
	  
	  //通过AMap.Polygon对象在地图上绘制多边形
	  handlePolygon(result) {
	  	let bounds = result.districtList[0].boundaries
	  	
	  	if (bounds) {
	  
	  		for (let i = 0, l = bounds.length; i < l; i++) {
	  			//生成行政区划polygon
	  			this.cache = new AMap.Polygon({
	  				map: this.map, // 指定地图对象
	  				strokeWeight: 1, // 轮廓线宽度
	  				path: bounds[i], //轮廓线的节点坐标数组
	  				fillOpacity: 0.15, //透明度
	  				fillColor: '#256edc', //填充颜色
	  				strokeColor: '#256edc', //线条颜色
	  			})
	  
	  			this.cache.on('click', (e) => {
	  
	  			})
	  		}
	  		// 地图自适应
	  		this.map.setFitView()
	  	}
	  },
	  
	  chart() {
	  	var chartDom = this.$refs.gdMap;
	  	this.myChart = echarts.init(chartDom);
	  	var option;
	  	option = {
	  	  tooltip: {
	  	    trigger: 'axis',
	  	    axisPointer: {
	  	      type: 'shadow'
	  	    }
	  	  },
	  	  grid: {
	  	    left: '3%',
	  	    right: '4%',
	  	    bottom: '3%',
	  	    containLabel: true
	  	  },
	  	  xAxis: [
	  	    {
	  	      type: 'category',
	  	      data: this.chartData.x,
	  	      axisTick: {
	  	        alignWithLabel: true
	  	      }
	  	    }
	  	  ],
	  	  yAxis: [
	  	    {
	  	      type: 'value'
	  	    }
	  	  ],
	  	  series: [
	  	    {
	  	      name: 'Direct',
	  	      type: 'bar',
	  	      barWidth: '60%',
	  	      data: this.chartData.y
	  	    }
	  	  ]
	  	};
	   	option && this.myChart.setOption(option);
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello{
		width: 100%;
		height: 100%;
	}
	.map{
		width: 100%;
		height: 90%;
	}
</style>

/* 接口参数区 */
// 示例
import $oSit from '@/common/overallSituation.js'
// const Url='http://zntc.145u.net';
// const Url = 'https://zntc.145u.net:9099';//接口地址
//const ddtUrl='http://111.231.109.113:8004' //达达通接口地址
//const Url = 'https://zntc.145u.net:9098';//综合出行接口地址
//const Url = 'http://zntc.145u.net'; //http请求

//接口域名
const Url=$oSit.Interface.address.Url;
const Url2=$oSit.Interface.address.Url2;

//接口对象
const SbjgInterface = {
	//GET-POST
	//--------------------------------------获取所有的车站--------------------------------------
	GetStarte:{
		Url: Url2 + '/Home/GetStarte',
		name:'获取所有的车站',
		method:'POST',
		header: {'content-type': 'application/json'},
	},
	//--------------------------------------获取所有设备--------------------------------------
	GetNumAll:{
		Url: Url2 + '/Home/GetNumAll',
		name:'获取所有设备',
		method:'POST',
		header: {'content-type': 'application/json'},
	},
	
	
	//--------------------------------------获取所有的设备数据--------------------------------------
	GetSerialsByID:{
		Url: Url2 + '/Home/GetSerialsByID',
		name:'获取所有的设备数据',
		method:'POST',
		header: {'content-type': 'application/json'},
	},
	//--------------------------------------设备关机/重启--------------------------------------
	GetCommndAdd:{
		Url: Url2 + '/Home/GetCommndAdd',
		name:'设备关机/重启',
		method:'POST',
		header: {'content-type': 'application/json'},
	},
	//--------------------------------------获取设备参数--------------------------------------
	GetBySettingAID:{
		Url: Url2 + '/Home/GetBySettingAID',
		name:'获取设备参数',
		method:'POST',
		header: {'content-type': 'application/json'},
		
	},
}
// 接口声明区
export default {
	SbjgInterface
}
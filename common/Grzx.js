import $oSit from '@/common/overallSituation.js';

const Url=$oSit.Interface.address.Url;

const appConfig={
	H5Config:{
		name:'公众号的Appid和App秘钥',
		H5AppId:$oSit.appConfig.H5Config.H5AppId,
		H5AppSecret:$oSit.appConfig.H5Config.H5AppSecret,
	},
	local:{
		url:$oSit.appConfig.local.url,
		name:'公众号请求地址',
	},
}

const Interface={
	getWxUserinfo:{
		value:'http://27.148.155.9:9056/CTKY/getWxUserinfo',
		name:'公众号获取OpenID',
		method:'POST',
		pages: [],
	},
	AddSuggestion:{
		value:Url+'/api/person/AddSuggestion',
		name:'上传意见',
		method:'POST',
		pages: [],
	}, 
	login:{
		value:Url+'/api/person/login',
		name:'用户登录',
		method:'POST',
		pages: [],
	},
	changeInfo:{
		value:Url+'/api/person/changeInfo',
		name:'修改个人信息（除头像外）',
		method:'POST',
		pages: [],
	},
	changeInfoPortrait:{
		value:Url+'/api/person/changeInfoPortrait',
		name:'只修改头像',
		method:'POST',
		pages: [],
	},
	getLoginCode:{
		value:Url+'/api/person/getLoginCode',
		name:'获取手机验证码',
		method:'POST',
		pages: [],
	},
	GetUserInfoByOpenId_xcx:{
		value:Url+'/api/person/GetUserInfoByOpenId_xcx',
		name:'传什么openid就返回什么openid以及相应的用户信息',
		method:'POST',
		pages: [],
	 },
	 
}

export default {
	Interface,
	appConfig
}
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
	AddSuggestion:{
		value:Url+'/api/person/AddSuggestion',
		name:'添加意见',
		method:'POST',
		pages: [],
	}, 
}

export default {
	Interface,
	appConfig
}
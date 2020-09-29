// const Url='http://192.168.42.167:9755';
function getUrl(){
	let address = uni.getStorageSync('ipAddress') || '';
	let ipAddress = address.ipAddress + ":" + address.portNumber;
	return ipAddress;
}

const Url='';

//---------------------个人中心------------------------
const Inter_person={
	checkConnect:{
		url:Url+'/api/person/checkConnect',
		name:'测试连接',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数id=1
		header:{'content-type': 'application/json'},
	},
	
	login:{
		url:Url+'/api/person/login',
		name:'用户登录',
		method:'POST',
		pages: [],
		parameterName:'num,pwd',//需要传入的参数
		header:{'content-type': 'application/json'},
	},
	
	checkState:{
		url:Url+'/api/person/checkState',
		name:'用户审核',
		method:'POST',
		pages: [],
		parameterName:'id,examineState',//需要传入的参数
		header:{'content-type': 'application/json'},
	},
	
	register:{
		url:Url+'/api/person/register',
		name:'用户注册',
		method:'POST',
		pages: [],
		parameterName:'num,pwd',//需要传入的参数
	},
	
	updatePwd:{
		url:Url+'/api/person/updatePwd',
		name:'修改密码',
		method:'POST',
		pages: [],
		parameterName:'newPwd,pwd,id',//需要传入的参数
	},
	
	getUserByUserId:{
		url:Url+'/api/person/getUserByUserId',
		name:'通过userId获取用户信息',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
	
	updateUserByUserId:{
		url:Url+'/api/person/updateUserByUserId',
		name:'修改用户信息（除手机号）',
		method:'POST',
		pages: [],
		parameterName:'id,name,birthday,portrait,sex,signature',//需要传入的参数
	},
	
	updatePhoneNum:{
		url:Url+'/api/person/updatePhoneNum',
		name:'修改手机号',
		method:'POST',
		pages: [],
		parameterName:'id,phoneNumber',//需要传入的参数
	},
	
	exitLogin:{
		url:Url+'/api/person/exitLogin',
		name:'退出登录',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
	
	signIn:{
		url:Url+'/api/person/signIn',
		name:'签到',
		method:'POST',
		pages: [],
		parameterName:'name,id',//需要传入的参数
	},
	
	checkSignIn:{
		url:Url+'/api/person/checkSignIn',
		name:'检查是否签到',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
	
	getSignInNum:{
		url:Url+'/api/person/getSignInNum',
		name:'获取签到数',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
	
}
//---------------------个人中心endding------------------------

//---------------------工作报告------------------------
const Inter_report={
	getAllReports:{
		url:Url+'/api/workReport/getAllReports',
		name:'获取所有的报告',
		method:'POST',
		pages: [],
		parameterName:'',//需要传入的参数
	},
	
	getReportsById:{
		url:Url+'/api/workReport/getAllReports',
		name:'通过用户id获取报告',
		method:'POST',
		pages: [],
		parameterName:'userId',//需要传入的参数
	},
	
	addReport:{
		url:Url+'/api/workReport/addReport',
		name:'添加报告',
		method:'POST',
		pages: [],
		parameterName:'userId,projectName,reportType,userName,workContent,workProblem,updateTime',//需要传入的参数
	},
	
	deleteReport:{
		url:Url+'/api/workReport/deleteReport',
		name:'删除报告',
		method:'POST',
		pages: [],
		parameterName:'reportId,userId',//需要传入的参数
	},
	
	deleteReportByReportId:{
		url:Url+'/api/workReport/deleteReportByReportId',
		name:'管理员删除报告',
		method:'POST',
		pages: [],
		parameterName:'reportId',//需要传入的参数
	},
}
//---------------------工作报告endding------------------------

//---------------------项目详情------------------------
const Inter_projcet={
	addProject:{
		url:Url+'/api/projectDetail/addProject',
		name:'添加项目',
		method:'POST',
		pages: [],
		parameterName:'projectName,customerCompany,department,startDate,developPeriod,development,userName,updateTime,userId',//需要传入的参数
	},
	
	editProject:{
		url:Url+'/api/projectDetail/editProject',
		name:'修改项目',
		method:'POST',
		pages: [],
		parameterName:'id,projectName,customerCompany,department,startDate,developPeriod,development,userName,updateTime,userId',//需要传入的参数
	},
	
	getProject:{
		url:Url+'/api/projectDetail/getProject',
		name:'获得项目列表',
		method:'POST',
		pages: [],
		parameterName:'projectName,customerCompany,department,startDate,developPeriod,development,userName,updateTime,userId',//需要传入的参数
	},
	
	deleteProject:{
		url:Url+'/api/projectDetail/deleteProject',
		name:'删除项目',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
	
	getProjectProgress:{
		url:Url+'/api/projectDetail/getProjectProgress',
		name:'获取项目的总进度',
		method:'POST',
		pages: [],
		parameterName:'id',//需要传入的参数
	},
}
//---------------------项目详情endding------------------------

//---------------------项目进度------------------------
const Inter_progress={
	queryProgress:{
		url:Url+'/api/projectProgress/queryProgress',
		name:'查询项目进度',
		method:'POST',
		pages: [],
		parameterName:'projectId',//需要传入的参数
	},
	
	addProgress:{
		url:Url+'/api/projectProgress/addProgress',
		name:'添加项目进度',
		method:'POST',
		pages: [],
		parameterName:'projectName，projectId，userId，userName，progress',//需要传入的参数
	},
	
}
//---------------------项目进度endding------------------------

//---------------------好友列表------------------------
const Inter_friendList={
	getFriendList:{
		url:Url+'/api/friend/getFriendList',
		name:'获取好友列表',
		method:'POST',
		pages: [],
		parameterName:'',//需要传入的参数
	},
}
//---------------------好友列表endding------------------------

//---------------------数据库------------------------
const Inter_database={
	queryDataBase:{
		url:Url+'/api/dataBase/queryDataBase',
		name:'查询数据库表（全部）',
		method:'POST',
		pages: [],
		parameterName:'',//需要传入的参数
	},
	
	queryByNamedescribe:{
		url:Url+'/api/dataBase/queryByNamedescribe',
		name:'根据数据库名称和描述查询表名',
		method:'POST',
		pages: [],
		parameterName:'dataBaseName,describe',//需要传入的参数
	},
	
	addDataBase:{
		url:Url+'/api/dataBase/addDataBase',
		name:'添加数据库',
		method:'POST',
		pages: [],
		parameterName:'dataBaseName,describe,ipAddress,number,password',//需要传入的参数
	},
	
	addDataTable:{
		url:Url+'/api/dataBase/addDataTable',
		name:'添加数据库表',
		method:'POST',
		pages: [],
		parameterName:'dataBaseName,describe,tableName',//需要传入的参数
	},
}
//---------------------数据库endding------------------------

// 接口声明区
export default {
	Inter_person,
	Inter_report,
	Inter_projcet,
	Inter_progress,
	Inter_database,
	Inter_friendList,
	getUrl,
}
export let data = {
	id: '0xf3d',
	$$level: 0,
	name: "客户集群名称",
	children: [{
			id: 'fa3e1exd',
			pid: '0xf3d',
			name: '刘某',
			job: '总经理',
			remark: null,
			$$level: 1,
			decisions: ""
		},
		{
			id: 'fa3e224sdf',
			name: '马某',
			pid: '0xf3d',
			job: '副总经理',
			remark: null,
			decisions: "",
			$$level: 1,
			children: [{
				id: 'fa3e3gfasd',
				name: '王氏',
				job: '总经理助手',
				pid: 'fa3e224sdf',
				remark: null,
				$$level: 2,
				decisions: ""
			}]
		}
		// {
		// 	"id": 2,
		// 	"pid": 1,
		// 	"name": "刘强东",
		// 	"job": "总经理",
		// 	"remark": {
		// 		"resContent": "11",
		// 		"workExperience": "22"
		// 	},
		// 	"decisions": "1,2",
		// 	"expand": false,
		// 	"children": [
		// 		// {
		// 		// 	"id": 6,
		// 		// 	"pid": 2,
		// 		// 	"name": "禁止编辑节点",
		// 		// 	"job": "",
		// 		// 	"remark": null,
		// 		// 	"decisions": "1",
		// 		// 	"disabled": true
		// 		// },
		// 		{
		// 			"id": 7,
		// 			"pid": 2,
		// 			"name": "王氏",
		// 			"job": "",
		// 			"decisions": "1,3",
		// 			"remark": null
		// 		},
		// 		// {
		// 		// 	"id": 8,
		// 		// 	"pid": 2,
		// 		// 	"name": "禁止拖拽节点",
		// 		// 	"job": "",
		// 		// 	"decisions": "2",
		// 		// 	"remark": null,
		// 		// 	"noDragging": true
		// 		// },
		// 		{
		// 			"id": 9,
		// 			"pid": 2,
		// 			"decisions": "1",
		// 			"job": "",
		// 			"remark": null,
		// 			"name": "马化腾"
		// 		},
		// 		{
		// 			"id": 10,
		// 			"pid": 2,
		// 			"job": "",
		// 			"decisions": "1,2,3",
		// 			"remark": null,
		// 			"name": "马云"
		// 		}
		// 	]
		// },

		// {
		// 	"id": 4,
		// 	"pid": 1,
		// 	"decisions": "",
		// 	"job": "",
		// 	"remark": null,
		// 	"name": "王健林"
		// }

	]
}
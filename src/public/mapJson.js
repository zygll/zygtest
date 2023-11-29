
// //获取到需要添加地图的位置
// var myChart = echarts.init(document.getElementById('main'));
//1.中国地图
// var chinaMap = "./json/中国地图.json";
//2.台湾省地图
import taiWanMap from "./json/台湾省.json";
//3.海南省地图
import haiNanMap from "./json/海南省.json";
//4.安徽省地图
import anHuiMap from "./json/安徽省.json";
//5.江西省地图
import jiangXiMap from "./json/江西省.json";
//6.湖南省地图
import huNanMap from "./json/湖南省.json";
//7.云南省地图
import yunNanMap from "./json/云南省.json";
//8.贵州省地图
import guiZhouMap from "./json/贵州省.json";
//9.广东省地图
import guangDongMap from "./json/广东省.json";
//10.福建省地图
import fuJianMap from "./json/福建省.json";
//11.浙江省地图
import zheJiangMap from "./json/浙江省.json";
//12.江苏省地图
import jiangSuMap from "./json/江苏省.json";
//13.四川省地图
import siChuanMap from "./json/四川省.json";
//14.重庆市市地图
import chongQingMap from "./json/重庆市.json";
//15.湖北省地图
import huBeiMap from "./json/湖北省.json";
//16.河南省地图
import heNanMap from "./json/河南省.json";
//17.山东省地图
import shanDongMap from "./json/山东省.json";
//18.吉林省地图
import jiLinMap from "./json/吉林省.json";
//19.辽宁省地图
import liaoNingMap from "./json/辽宁省.json";
//20.天津市市地图
import tianJinMap from "./json/天津市.json";
//21.北京市市地图
import beiJingMap from "./json/北京市.json";
//22.河北省地图
import heBeiMap from "./json/河北省.json";
//23.山西省地图
import shanXiMap from "./json/山西省.json";
//24.陕西省地图
import shanXi2Map from "./json/陕西省.json";
//25.宁夏回族自治区省地图
import ningXiaMap from "./json/宁夏回族自治区.json";
//26.青海省地图
import qingHaiMap from "./json/青海省.json";
//27.西藏自治区地图
import xiZangMap from "./json/西藏自治区.json";
//28.黑龙江省地图
import heiLongJiangMap from "./json/黑龙江省.json";
//29.内蒙古自治区地图
import neimengGuMap from "./json/内蒙古自治区.json";
//30.甘肃省地图
import ganSuMap from "./json/甘肃省.json";
//31.新疆维吾尔自治区省地图
import xinJiangMap from "./json/新疆维吾尔自治区.json";
//32.广西壮族自治区地图
import guangxiMap from "./json/广西壮族自治区.json";
//设置初始地图
// import mapname = chinaMap;

//设置省份的json 这里注意名字要和中国地图上的名字一致
export const mapJson = [
    {
        name: "台湾",
        json: taiWanMap,
    },
    {
        name: "海南",
        json: haiNanMap,
    },
    {
        name: "安徽",
        json: anHuiMap,
    },
    {
        name: "江西",
        json: jiangXiMap,
    },
    {
        name: "湖南",
        json: huNanMap,
    },
    {
        name: "云南",
        json: yunNanMap,
    },
    {
        name: "贵州",
        json: guiZhouMap,
    },
    {
        name: "广东",
        json: guangDongMap,
    },
    {
        name: "福建",
        json: fuJianMap,
    },
    {
        name: "浙江",
        json: zheJiangMap,
    },
    {
        name: "江苏",
        json: jiangSuMap,
    },
    {
        name: "四川",
        json: siChuanMap,
    },
    {
        name: "重庆",
        json: chongQingMap,
    },
    {
        name: "湖北",
        json: huBeiMap,
    },
    {
        name: "河南",
        json: heNanMap,
    },
    {
        name: "山东",
        json: shanDongMap,
    },
    {
        name: "吉林",
        json: jiLinMap,
    },
    {
        name: "辽宁",
        json: liaoNingMap,
    },
    {
        name: "天津",
        json: tianJinMap,
    },
    {
        name: "北京",
        json: beiJingMap,
    },
    {
        name: "河北",
        json: heBeiMap,
    },
    {
        name: "山西",
        json: shanXiMap,
    },
    {
        name: "陕西",
        json: shanXi2Map,
    },
    {
        name: "宁夏",
        json: ningXiaMap,
    },
    {
        name: "青海",
        json: qingHaiMap,
    },
    {
        name: "西藏",
        json: xiZangMap,
    },
    {
        name: "黑龙江",
        json: heiLongJiangMap,
    },
    {
        name: "内蒙古",
        json: neimengGuMap,
    },
    {
        name: "甘肃",
        json: ganSuMap,
    },
    {
        name: "新疆",
        json: xinJiangMap,
    },
    {
        name: "广西",
        json: guangxiMap,
    },
];

import axios from "axios";
//获取轮播图
const baseUrl = 'http://music.cpengx.cn'
export function getBanner(type = 1) {
    return axios.get(`${baseUrl}/banner?type=${type}`);
}
export function getRecommend(number = 10) {
    return axios.get(`${baseUrl}/personalized?limit=${number}`);
}
export function getPlayDetail(id) {
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`);
}
//获取歌词
export function getLyric(id) {
    return axios.get(`${baseUrl}/lyric?id=${id}`);
}
export function searchMusic(keyword) {
    return axios.get(`${baseUrl}/search?keywords=${keyword}`);
}
//手机登录
export function phoneLogin(phone, password) {
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`);
}
//获取用户信息
export function userDetail(id) {
    return axios.get(`${baseUrl}/user/detail?uid=${id}`);
}
export default userDetail
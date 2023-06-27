const ipUrl = "http://localhost:7001/admin/";

const servicePath = {
  getTypeInfo: ipUrl + "getTypeInfo", //  获得文章类别信息
  checkLogin: ipUrl + "checkLogin",
  addArticle: ipUrl + "addArticle", //  添加文章
  updateArticle: ipUrl + "updateArticle", //  添加文章
  getArticleList: ipUrl + "getArticleList", //  文章列表
  delArticle: ipUrl + "delArticle/", //  删除文章
  getArticleById: ipUrl + "getArticleById/", // 文章详细页内容接口 ,需要接收参数
};
export default servicePath;

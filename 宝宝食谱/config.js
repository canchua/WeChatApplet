var host = "appmatrix.zhilehuo.com"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 主页
  homeUrl: `https://${host}/appmatrix_small/getRecipeAlum`,

  // 列表页
  listUrl: `https://${host}/appmatrix_small/detail/getDetailList`,

  // 搜索页
  searchUrl: `https://${host}/appmatrix_small/searchDetail`,

  // 详情页
  detailsUrl: `https://${host}/appmatrix_small/detail/getDetail`,

};

module.exports = config




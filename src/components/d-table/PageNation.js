/**
 * PageNation prop 校验器
 * @param pageSize 分页大小
 * @param currentPage 当前页码
 * @param totalCount 总数据量
 * @param pageChangeHandler 页码改变时，触发的回调，回调参数为 新的页码
 * @constructor
 */
function PageNation (pageSize, currentPage, totalCount, pageChangeHandler = () => {}) {
  this.pageSize = Number.parseInt(pageSize)
  this.currentPage = Number.parseInt(currentPage)
  this.totalCount = Number.parseInt(totalCount)
  this.pageChangeHandler = pageChangeHandler
}

export default PageNation

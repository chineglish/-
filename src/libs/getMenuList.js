const getMenuList = function () {
  const menuList = JSON.parse(localStorage.getItem('menuList'))
  return menuList
}
export default getMenuList

import db from './modules/db'
import releases from './modules/releases'
import user from './modules/user'
import menu from './modules/menu'
import theme from './modules/theme'
import log from './modules/log'
import account from './modules/account'
import fullscreen from './modules/fullscreen'
import ua from './modules/ua'
import gray from './modules/gray'
import page from './modules/page'
import transition from './modules/transition'
import search from './modules/search'
import fundCollection from './modules/fundCollection'
import manualImport from './modules/manualImport'
import fontSize from './modules/fontSize'

export default {
  namespaced: true,
  modules: {
    db,
    releases,
    user,
    menu,
    theme,
    log,
    account,
    fullscreen,
    ua,
    gray,
    page,
    transition,
    search,
    fundCollection,
    manualImport,
    fontSize
  }
}

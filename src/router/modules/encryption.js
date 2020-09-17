// 文件加解密
const oneEntry = () => import('@/pages/encryption/oneEntry')
const twoErification = () => import('@/pages/encryption/twoErification')
const ThreeUpload = () => import('@/pages/encryption/ThreeUpload')
const fourResult = () => import('@/pages/encryption/fourResult')

const encryptionRouter = [
  {
    path: 'oneEntry',
    name: 'oneEntry',
    component: oneEntry,
    meta: {
      auth: true,
      title: '文件加解密',
      noLogin: true,
      pageTitle: '柜面批量代收代付业务加密工具'
    }
  },
  {
    path: 'twoErification',
    name: 'twoErification',
    component: twoErification,
    meta: {
      auth: true,
      title: '文件加解密',
      noLogin: true,
      pageTitle: '柜面批量代收代付业务加密工具'
    }
  },
  {
    path: 'ThreeUpload',
    name: 'ThreeUpload',
    component: ThreeUpload,
    meta: {
      auth: true,
      title: '文件加解密',
      noLogin: true,
      pageTitle: '柜面批量代收代付业务加密工具'
    }
  },
  {
    path: 'fourResult',
    name: 'fourResult',
    component: fourResult,
    meta: {
      auth: true,
      title: '文件加解密',
      noLogin: true,
      pageTitle: '柜面批量代收代付业务加密工具'
    }
  }
]

export default encryptionRouter

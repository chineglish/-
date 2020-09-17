<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="mapWrap">
        <!-- <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" style="height: 500px" class="amap-demo">
        </el-amap> -->
        <el-amap
        ref="amap"
        vid="amapDemo"
        :zoom="zoom"
        :plugin="plugin"
        class="amap-demo"
        style="height: 500px">
          <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
          <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        </el-amap>
      </div>
    </div>
</template>

<script>
import { amapManager } from 'vue-amap'
import { httpPost } from '@/api/sys/http'
// export default {
//   data () {
//     let self = this
//     return {
//       breadData: ['首页', '网点查询'],
//       zoom: 16,
//       center: [121.599, 31.124],
//       plugin: [{
//         pName: 'Geolocation',
//         event: {
//           init (o) {
//             o.getCurrentPosition((status, result) => {
//               if (result && result.position) {
//                 self.lng = result.position.lng
//                 self.lat = result.position.lat
//                 self.center = [self.lng, self.lat]
//                 self.loader = true
//                 self.$nextTick()
//               }
//             })
//           }
//         }
//       }]
//     }
//   }
// }
export default {
  data: function () {
    // let self = this
    return {
      breadData: ['首页', '网点查询'],
      amapManager,
      markers: [
      ],
      windows: [],
      window: '',
      zoom: 15,
      events: {
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          alert('map clicked')
        }
      },
      plugin: [{
        pName: 'ToolBar',
        autoPosition: true,
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      }]
    }
  },
  methods: {
    getMap () {
    }
  },
  mounted () {
    httpPost('/eweb-query.HomePageDeptMapQry.do').then((res, index) => {
      let markers = []
      let windows = []
      let self = this
      res.list.forEach((item, index) => {
        windows.push({
          position: [item.lat, item.lon],
          content: `<div class="prompt">${item.deptName}</div>`,
          visible: false
        })
        markers.push({
          position: [item.lat, item.lon],
          events: {
            click () {
              self.windows.forEach(window => {
                window.visible = false
              })
              self.window = self.windows[index]
              self.$nextTick(() => {
                self.window.visible = true
              })
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>'
        })
      })
      this.markers = markers
      this.windows = windows
      this.$forceUpdate()
    })
  }
}
</script>

<style lang="scss" scoped>
.mapWrap {
  height: 500px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 20px;
}
</style>

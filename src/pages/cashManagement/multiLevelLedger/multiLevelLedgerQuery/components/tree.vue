<template>
    <div class="authorized-div">
        <div
            class="authorized-account"
            v-for="(item,index) in list"
            :key="index">
            <div class="dotted-line">&nbsp;</div>
            <span class="el-icon-caret-bottom" style="line-height: 55px" v-if="item.subLevel && item.open" @click="changeOpen(item)"></span>
            <span class="el-icon-caret-right" style="line-height: 55px" v-else-if="item.subLevel && !item.open" @click="changeOpen(item)"></span>
            <span style="width: 16px" v-else></span>
            <div class="authorized-account-div">
                <div @click="gotoSubledgerDetails(item)"><i class="el-icon-document" style="margin-right: 5px;"></i>{{item.asAcNo}}--{{item.asAcName}}</div>
                <div class="authorized-account-authority" style="font-weight: bold;">
                  <el-button class="m-submit-btn" @click="gototransferQuery(item)">转账</el-button>
                </div>
            </div>
            <div v-if="item.subLevel" v-show="item.open" class="authorized-account-children">
                <div
                class="children-line"
                v-if="index < (list.length-1)"
                >&nbsp;</div>
                <com-tree
                    :list="item.subLevel"
                ></com-tree>
            </div>
        </div>
    </div>
</template>

<script>
import ComTree from './tree'
export default {
  name: 'ComTree',
  components: {
    ComTree
  },
  props: {
    list: {
      default: () => { return [] },
      type: Array
    }
  },
  methods: {
    changeOpen (item) {
      this.$set(item, 'open', !item.open)
    },
    gotoSubledgerDetails (res) {
      this.$router.push({
        name: 'subledgerDetails',
        params: res
      })
    },
    gototransferQuery (item) {
      this.$router.push({
        name: 'singleTransPre',
        params: { item }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.authorized-div {
    width: 100%;
}
.authorized-account{
    position: relative;
    width: calc(100% - 70px);
    line-height: 54px;
    display: flex;
    flex-wrap: wrap;
    padding-left: 70px;;
    justify-content: flex-start;
    z-index: 1;

    .dotted-line{
        width: 60px;
        margin-top: -22px;
        height: 50px;
        border-left: 1px dashed #979797;
        border-bottom: 1px dashed #979797;
    }

    .authorized-account-div{
        width: calc(100% - 87px);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .authorized-account-authority{
            width: 200px;
            text-align: start;
        }
    }
    .authorized-account-children {
        width: 100%;
        .children-line{
            margin-top: -22px;
            position: absolute;
            height: 50px;
            border-left: 1px dashed #979797;
        }
    }
}
</style>

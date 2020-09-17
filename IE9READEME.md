`IE9兼容`


`IE9兼容样式在css属性后添加\9标志，如需要添加！important标志，则需要在\9之后。\9标志只能被IE9和IE10识别。
而IE10的样式也会受到\9的影响，所以需要使用
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){}消除影响，在媒体查询中的css只能被IE10识别。
如custom.css中所示`
`@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){
  body{
    #app{
      .el-form{
        .form-item{
          div{
            line-height: inherit;
          }
          .el-select{
            line-height: inherit;
          }
          .el-input{
            line-height: inherit;
            width: 100%;
          }
        }
      }
    }
  }
}`

`1.input无placeholder
使用ie-placeholder插件`

`2.display:flex
改用display:inline-block\9;
若宽度坍塌则，根据实际情况换算成width百分比宽度，若无flex设置宽度占比：则一般设置成100%`


`3.flex:1 flex宽度设置修改
在横向排列下换算成宽度百分比width: x%\9;`


`4.垂直居中
使用vertical-align: middle\9;使两个元素居中对齐，此对齐方式对float浮动元素失效`


`5.横向布局，元素不在同一行
white-space；nowrap\9;强行使父元素不换行`


`6.父元素高度自适应，子元素无法与父元素同高，获得100%高度。
如m-new-form中的el-form-item内部的el-form-item-label,无法随el-form-item-content的高度而变高。
如custom.css中所示,父元素position为relative,label脱离文档流为absolute，即可获取100%父元素高度
      .el-form-item {
        display: flex;
        justify-content: flex-start;
        float: left\9;
        .el-form-item__content{
          display: table-cell\9;
          vertical-align: middle\9;
          white-space: nowrap\9;
          margin-left: 200px\9!important ;
        }
      }
      .el-form-item__label {
        color: #333;
        line-height: 32px;
        float: left;
        width: inherit;
        height: inherit;
        text-align: right;
        vertical-align:middle\9;
        position: absolute\9;
        height: 100%\9!important;
      }
`


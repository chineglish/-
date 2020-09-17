<template>
    <div class="footer">
        <div class="footWrap">
            <!-- <div class="font">
                <span>网站声明</span>
                <span class="line">使用手册</span>
                <span class="line">联系我们</span>
            </div> -->
            <div class="mt15 fs14">版权所有 大连银行 辽CP备08004632号</div>
            <div class="mt15 fs14">全国统一客服热线： 40066-40099</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
    width: 100%;
    min-width: 1200px;
    height: 50px;
    max-height: 50px;
    background: #fff;
    border-top: 1px solid #ccc;
    .footWrap{
        width: 1200px;
        margin: 0 auto;
        height: 50px;
        display: flex;
        justify-content: center;
        color: #777;
        /* p{
            height: 20px;
        } */
        .font{
            margin-top: 30px;
            color: #555;
            cursor: pointer;
            .line{
                border-left: 1px solid #ddd;
                margin-left: 40px;
                padding-left: 20px;
            }
        }
        .mt15{
            margin-top: 15px;
            padding: 0 40px;
        }
    }
}
</style>

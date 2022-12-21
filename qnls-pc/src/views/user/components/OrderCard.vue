<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <el-descriptions :column="3" :colon="false">
        <el-descriptions-item label="订单编号：" label-class-name="labels" content-class-name="labels">{{this.order_id}}</el-descriptions-item>
        <el-descriptions-item ></el-descriptions-item>
        <el-descriptions-item ></el-descriptions-item>

        <el-descriptions-item label="预订人姓名：" label-class-name="labels" content-class-name="labels">{{this.resident}}</el-descriptions-item>
        <el-descriptions-item label="预订人电话：" label-class-name="labels" content-class-name="labels">{{this.phone}}</el-descriptions-item>
        <el-descriptions-item ></el-descriptions-item>
        <el-descriptions-item label="总计价格：" label-class-name="labels" content-class-name="totalFont">{{this.total}} 元</el-descriptions-item>
        <el-descriptions-item label="实际支付：" label-class-name="labels" content-class-name="payFont">{{this.payment}} 元</el-descriptions-item>
      </el-descriptions>
      <div class="operation-btn">
        <el-button type="info" plain @click="getDetail">订单详情</el-button><br>
        <el-button v-if="this.is_comment == 0" type="warning" plain @click="openComment">去评价</el-button>
      </div>
    </el-card>
    <el-dialog
        title="订单详情"
        :visible.sync="detailVisible"
        :center="true"
        width="640px">
        <el-descriptions :column="2" :colon="false">
          <el-descriptions-item label="订单编号：" label-class-name="labels" content-class-name="labels">{{this.orderDetail.order_id}}</el-descriptions-item>
          <el-descriptions-item label="入住青旅：" label-class-name="labels" content-class-name="labels">{{this.orderDetail.supplier_name}}</el-descriptions-item>
          <el-descriptions-item label="预订人姓名：" label-class-name="labels" content-class-name="labels">{{this.orderDetail.user_name}}</el-descriptions-item>
          <el-descriptions-item label="预订人电话：" label-class-name="labels" content-class-name="labels">{{this.orderDetail.user_phone}}</el-descriptions-item>
          <el-descriptions-item label="预订人邮箱：" label-class-name="labels" content-class-name="labels">{{this.orderDetail.user_email}}</el-descriptions-item>
          <el-descriptions-item></el-descriptions-item>
        </el-descriptions>
      <el-divider></el-divider>
      <div class="detail-box">
        <order-detail
            v-for="(item,i) in orderList" :key="i"
            :room_name="item.house_name"
            :male="item.male"
            :female="item.female"
            :children="item.children"
            :num="item.num"
            :check_in="item.check_in"
            :check_out="item.check_out"
            :days="item.days"
            :price="item.price"
            :subtotal="item.total_price"
        ></order-detail>
      </div>
      <el-divider></el-divider>
      <el-descriptions :column="2" :colon="false">
        <el-descriptions-item label="总计价格：" label-class-name="labels" content-class-name="totalFont">{{this.orderDetail.order_orgin_price}} 元</el-descriptions-item>
        <el-descriptions-item label="实际支付：" label-class-name="labels" content-class-name="payFont">{{this.orderDetail.order_price}} 元</el-descriptions-item>
      </el-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
    title="评 价"
    :visible.sync="commentVisible"
    :center="true"
    width="480px">
      <el-form ref="form">
        <el-form-item>
          <div class="grade-box">
            <el-rate
                v-model="grade"
                show-text></el-rate>
            <br>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入评价内容"
              v-model="commentContent"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="commentVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendComment">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {getOrderDetail, makeComment} from "@/network/user";
  import OrderDetail from "@/views/user/components/OrderDetail";
  import moment from "moment";

  export default {
    computed: {
      ...mapState({
        user: (state) => state.user
      }),
    },

    components: {OrderDetail},
    comments:{OrderDetail},
    props: {
      order_id: {
        type: String,
        default: ''
      },
      total:{
        type: String,
        default: ''
      },
      payment:{
        type: String,
        default: ''
      },
      resident:{
        type:String,
        default:''
      },
      phone:{
        type:String,
        default:''
      },
      is_comment:{
        type:Number,
        default:0
      },
    },

    data() {
      return {
        detailVisible: false,
        commentVisible: false,
        orderDetail: {},
        orderList:[],
        grade: null,
        commentContent:'',
        commentCode: 400
      }
    },

    methods: {
      getDetail(){
        this.detailVisible = true
        getOrderDetail({order_id: this.order_id}).then(res => {
          this.orderDetail = res.data.data.order // 存订单信息
          this.orderList = res.data.data.minorder //存订单的房间信息
          console.log(this.orderDetail)
          for(let i=0;i<this.orderList.length;i++){
            this.orderList[i].check_in = moment(this.orderList[i].check_in*1000).format('YYYY-MM-DD')
            this.orderList[i].check_out = moment(this.orderList[i].check_out*1000).format('YYYY-MM-DD')
            // console.log(this.orderList[i].check_in)
            // console.log(this.orderList[i].check_out)
          }
        })
      },
      openComment(){
        this.commentVisible = true
        getOrderDetail({order_id: this.order_id}).then(res => {
          this.orderDetail = res.data.data.order // 存订单信息
        })

      },
      sendComment(){
        makeComment({user_id:this.user.id,
          supplier_id:this.orderDetail.supplier_id,
          order_id:this.orderDetail.order_id,
          comment_score:this.grade,
          comment_content:this.commentContent}).then(res => {
            console.log(res)
            this.commentCode = res.data.code
            if(this.commentCode === 200){
              this.$message.success("评论成功！")
              this.commentVisible = false
              this.$router.replace({
                path:'refreshOrder',
                name:'refreshOrder',
              })
            }else{
              this.$message.error("评论失败！")
            }
        })
      }
    },
  mounted() {

  }

  }
</script>

<style lang="scss">
  .box-card{
    position: relative;
    width: 100%;
    min-width: 610px;
    border-radius: 5px;
    margin-bottom: 8px;
  }
  .operation-btn{
    position: absolute;
    right: 16px;
    top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .labels{
    font-size: 14px;
    line-height: 30px;
  }
  .payFont{
    color: #f7941c;
    line-height: 30px;
    font-size: 20px;
    font-weight: 900;
  }
  .totalFont{
    color: #333333;
    font-weight: 900;
    font-size: 16px;
    line-height: 28px;
  }
  .detail-box{
    height: 160px;
    overflow: scroll;
  }
  .grade-box{
    position: absolute;
    left: 158px;
  }
</style>

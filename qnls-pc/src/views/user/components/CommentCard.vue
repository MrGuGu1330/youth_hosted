<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <div class="img-box"><img :src="'http://127.0.0.1:3000'+this.supplier_imgs" alt=""></div>
      <div class="comment-box">
        <h3>{{this.supplier_name}}</h3>
        <el-rate
            v-model="this.grade*1"
            disabled
            show-score
            text-color="#ff9900"
            :score-template=this.grade>
        </el-rate>
        <span>订单编号：{{this.order_id}}</span><br>
        <span>评论时间：{{this.comment_time}}</span><br>
        <div class="writing">
          <span>评论内容：{{this.content}}</span>
        </div>
      </div>
      <div class="operation-btn">
        <el-button type="danger" plain @click="commentDialogVisible = true">删除评论</el-button>
      </div>
    </el-card>
    <el-dialog
        title="温馨提示"
        :visible.sync="commentDialogVisible"
        width="30%"
        center>
      <span>您将删除您对此订单的评价，是否继续？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="commentDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dComment">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>


import {delComment} from "@/network/user";

export default {
  name: "CommentCard",
  props:{
     grade:{
      type: String,
      default: null
    },
    content:{
      type: String,
      default: ''
    },
    comment_time:{
      type: String,
      default: ''
    },
    supplier_name:{
      type: String,
      default: ''
    },
    supplier_imgs:{
      type: String,
      default: ''
    },
    order_id:{
      type: String,
      default: ''
    },
    comment_id:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      commentDialogVisible:false,
    }
  },
  methods: {
    dComment(){
      delComment({comment_id: this.comment_id}).then(res => {
        console.log(res)
        if(res.data.code == 200){
          this.$message.success("评论删除成功！")
          this.commentDialogVisible = false
          this.$router.replace({
            path: 'refreshComment', //空白页的路由地址
            name: 'refreshComment'
          })
        }else{
          this.$message.error("评论删除失败！")
          this.commentDialogVisible = false
        }
      })
    }
  },
}
</script>
  
<style lang="scss" scoped>
    .box-card{
      position: relative;
      width: 100%;
      min-width: 610px;
      border-radius: 5px;
      margin-bottom: 8px;
    }
    .img-box{
      width: 140px;
      height: 140px;
      display: flex;

      >img{
        margin-top: 10px;
        width: 172px;
        height: 120px;
        border-radius: 8px;
      }
    }
    .comment-box{
      position: absolute;
      left: 230px;
      top: 30px;

      >h3{
        margin-bottom: 8px;
      }
      >.writing{
        width: 600px;

        >span{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;  //使用自适应布局
          -webkit-line-clamp: 2;  //设置超出行数，要设置超出几行显示省略号就把这里改成几
          -webkit-box-orient: vertical;
        }
      }
    }
    .operation-btn{
      position: absolute;
      right: 16px;
      top: 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
</style>
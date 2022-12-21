<template>
  <div class="listBar">
    <h3><label>房型及价格</label></h3>
    <div class="date">
      <div class="block">
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="timestamp">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div class="left">
        <el-table :data="listGoods" style="width: 100%">
          <el-table-column label="房型" width="300" align="center">
            <template slot-scope="scope">
              <span class="tu" style="margin-left: 10px">
                <img :src="scope.row.house_imgs" height="100px" width="100px" alt="" />
                {{ scope.row.house_detail }}</span>
            </template>
          </el-table-column>
          <el-table-column label="1晚的房价 （元）" width="180" align="center">
            <template slot-scope="scope">
              <div class="detail">
                <span style="margin-left: 10px">￥{{ scope.row.house_price }}</span>
                <span style="margin-right: 10px">{{
									scope.row.house_intro
								}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="预订" align="center" width="200">
            <template slot-scope="scope">
              <div>
                <div>
                  <label for="">人数：</label>

                  {{
										scope.row.man -
										-scope.row.women -
										-scope.row.children
									}}
                </div>
                <span>
                  <label for="">入住男生人数：</label>
                  <el-select v-model="scope.row.man" size="mini" style="width: 80px" placeholder="请选择">
                    <el-option v-for="(item, index) in scope.row
												.options1" :key="item + index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  <label for="">入住女生人数：</label>
                  <el-select v-model="scope.row.women" size="mini" style="width: 80px" placeholder="请选择">
                    <el-option v-for="(item, i) in scope.row
												.options2" :key="item + i" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  <label for="">入住小孩人数：</label>
                  <el-select v-model="scope.row.children" size="mini" style="width: 80px" placeholder="请选择">
                    <el-option v-for="(item, i) in scope.row
												.options3" :key="item + i" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </span>

                <el-button size="mini" type="warning" style="width: 80px" @click="upclick(scope.$index, scope.row)">确定
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <h6>您选择的旅舍</h6>
        <span></span>
        <div class="lvdian">
          <span class="title">{{ info.supplier_name }}</span>
          <div class="sum" ref="date">{{ datetime }}</div>
          <div class="vCart">
            <el-table :data="order" max-height="250" style="width: 100%">
              <!-- <el-table-column fixed="right" label="房型" width="100">
                <template slot-scope="scope1">
                  <img class="simg" :src="scope1.row.house_imgs" alt="" />
                </template>
              </el-table-column> -->
              <el-table-column prop="check_in" label="入住日期" width="100"></el-table-column>

              <el-table-column prop="check_out" label="退房日期" width="100"></el-table-column>

              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope1">
                  <el-button @click.native.prevent="
											deleteRow(scope1.$index, order)
										" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="huiyuan" v-show="huiyuan">
            <h1>更多机会、更多优惠</h1>
            <p>
              <a href="">现在只需50元即可享受YHA®青年旅舍®一年会籍，本次预订即可享受专属会员优惠，更可在世界各地享有食、住、行、游、购、娱等优惠，赶快来了解吧！</a>
            </p>
          </div>
          <div class="kehu" v-show="isshow">
            <h3>请输入联系人信息</h3>
            <label for="">住客全名（中文或英文）</label>
            <el-input v-model="user_name" placeholder="请输入住客全名"></el-input>
            <label for="">电子邮箱</label>
            <el-input v-model="user_email" placeholder="请输入电子邮箱"></el-input>
            <label for="">联系电话</label>
            <el-input v-model="user_phone" placeholder="请输入联系电话"></el-input>
          </div>
          <div class="dindan">
            <h2>
              合计：<label for="" class="heji">{{ sumPrice }}元</label>
            </h2>
            <div>
              <h2>
                现价：<label class="heji">{{ newPrice }}元</label>
              </h2>
            </div>
            <div>
              参与活动：<label for="">{{ activity_title }}</label>
            </div>
          </div>
          <div class="sub" v-show="huiyuan">
            <el-button style="width: 150px" type="warning" @click="open">继续</el-button>
          </div>
          <div class="sub" v-show="isshow">
            <el-button style="width: 150px" type="warning" @click="upt">支付</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGoods,
  getVip,
  getActivity,
  bookingHouses,
} from '@/network/booking';
import moment from 'moment';
export default {
  data () {
    return {
      huiyuan: true,
      isshow: false,
      value1: [],
      listGoods: [],
      label: [],
      order: [],
      sumPrice: 0,
      isvip: 0,
      activity_discount: 1,
      activity_title: '',
      user_name: '',
      user_email: '',
      user_phone: '',
      join_id: 0,
      booking: {
        order_id: '',
        order_price: '',
        order_orgin_price: '',
        user_id: '',
        supplier_id: '',
        join_id: '',
        is_vip: '',
        user_name: '',
        user_email: '',
        user_phone: '',
        house_list: '',
      },
    };
  },
  computed: {
    datetime () {
      let oldnow, newnow, days;
      if (this.value1.length) {
        oldnow = moment(this.value1[0]).format('YYYY-MM-DD');
        newnow = moment(this.value1[1]).format('YYYY-MM-DD');
        days = (this.value1[1] - this.value1[0]) / 86400000;
      } else {
        oldnow = moment(Date.now()).format('YYYY-MM-DD');
        newnow = moment(Date.now() + 60 * 60 * 24 * 1000).format(
          'YYYY-MM-DD'
        );
        days = 1;
      }
      return oldnow + '到' + newnow + '共' + days + '天';
    },
    newPrice () {
      let sum;
      if (this.vip !== 0) {
        sum = this.sumPrice * this.activity_discount * 0.9;
        return sum.toFixed(2);
      } else {
        sum = this.sumPrice * this.activity_discount;
        return sum.toFixed(2);
      }
    },
  },
  mounted () { },
  props: {
    supplier_id: '',
    info: '',
  },
  watch: {
    supplier_id (newVal, oldVal) {
      let supplier_id = newVal; //newVal即是chartData
      getGoods({ supplier_id: supplier_id }).then(res => {
        this.listGoods = res.data.data.map(item => ({
          ...item,
          house_imgs:
            this.$store.state.baseURL +
            item.house_imgs.split(',')[0],
          man: '',
          options1: [0, 1, 2, 3],
          women: '',
          options2: [0, 1, 2, 3],
          children: '',
          options3: [0, 1, 2, 3],
        }));
      });
    },
  },

  methods: {
    upt () {
      if (this.user_name && this.user_email && this.user_phone) {
        this.booking.user_name = this.user_name;
        this.booking.user_email = this.user_email;
        this.booking.user_phone = this.user_phone;

        this.$confirm('是否确认支付?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '正在跳转到支付页面!',
            });

            //发送订单
            bookingHouses(this.booking).then(res => {
              if (res.data.code == 200) {
                window.location.href = res.data.result;
              } else {
                console.log(res.msg);
              }
            });

            //
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消支付',
            });
          });
      } else {
        this.$message('请完善用户信息');
      }
    },
    open () {
      if (this.$store.state.type == 2) return this.$message.error('用户身份才可预定')
      if (Object.keys(this.$store.state.user).length == 0) {
        this.$router.push({ path: '/login' });
      } else {
        getVip({ user_id: this.$store.state.user.id }).then(res => {
          this.booking.is_vip = res.data.data.isvip;
          this.isvip = res.data.data.isvip;
        });
        getActivity({ user_id: this.$store.state.user.id }).then(
          res => {
            console.log(res);
            this.activity_discount =
              res.data.data.activity_discount || 1;
            this.activity_title = res.data.data.activity_title;
            this.booking.join_id = res.data.data.join_id;
            this.join_id = res.data.data.join_id;
          }
        );
        this.isshow = !this.isshow;
        this.huiyuan = !this.huiyuan;
        this.booking.order_id = this.$store.state.user.id + Date.now();
        this.booking.order_price = this.newPrice;
        this.booking.order_orgin_price = this.sumPrice;
        this.booking.user_id = this.$store.state.user.id;
        this.booking.supplier_id = this.supplier_id;
        // this.booking.join_id = this.join_id;
        // this.booking.is_vip = this.isvip;
        this.booking.house_list = this.order;
        this.booking.house_list.map(item => {
          item.check_in = moment(item.check_in).valueOf() / 1000;
          item.check_out = moment(item.check_out).valueOf() / 1000;
        });
      }
    },
    upclick (index, row) {
      console.log(index, row);
      //时间非空判定
      if (this.value1.length) {
      } else {
        this.value1.push(
          Math.floor(Date.now()),
          Math.floor(Date.now() + 60 * 60 * 24 * 1000)
        );
      }
      if (!(row.children - -row.man - -row.women)) {
        alert('请选择');
      } else {
        let order = {
          house_id: row.house_id,
          male: row.man,
          female: row.women,
          children: row.children,
          num: 1,
          check_in: moment(this.value1[0]).format('YYYY-MM-DD'),
          check_out: moment(this.value1[1]).format('YYYY-MM-DD'),
          days: (this.value1[1] - this.value1[0]) / 86400000,
          price: row.house_price,
          total_price: row.house_price,
          // house_imgs: row.house_imgs,
        };
        this.order.push(order);
        this.$store.commit('setOrder', order);
      }

      //计算原价总价
      this.sumPrice = 0;
      if (this.order.length > 0) {
        this.order.forEach(item => {
          this.sumPrice = this.sumPrice - -item.price;
        });
      }
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.listBar {
  height: 1000px;

  padding: 20px;
  h3 {
    height: 40px;
    border-bottom: 1px solid rgb(236, 236, 236);
    label {
      display: inline-block;
      height: 40px;
      border-bottom: 2px solid rgb(248, 170, 0);
    }
  }
  .date {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-date-editor--daterange.el-input__inner {
      width: 500px;
    }
  }
  > div {
    display: flex;
    justify-content: space-around;
    > .left {
      width: 690px;

      background-color: azure;
      height: 180px;
      .tu {
        display: flex;
        justify-content: left;
        img {
          margin-right: 10px;
        }
      }
      .detail {
        display: flex;
        flex-direction: column;
        span:first-child {
          color: #f7941c;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .right {
      width: 490px;
      height: 500px;
      padding: 0px 10px;
      > h6 {
        color: #666;
        font-size: 14px;
        height: 48px;
        line-height: 48px;
      }
      > .lvdian {
        .title {
          height: 24px;
          font-size: 16px;
        }
        .vCart {
          width: 100%;
          .simg {
            width: 40px;
            height: 40px;
          }
        }
        .huiyuan {
          color: #fff;
          background: linear-gradient(135deg, #75cee9 20%, #4c90cc 60%);
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .dindan {
          padding: 30px;
          height: 150px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          .heji {
            font-size: 30px;
            font-weight: bold;
            color: #f7941c;
          }
        }
        .sub {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="header">
      <h3>旅店设施</h3>
    </div>
    <div>
      <el-form>
        <el-form-item v-for="item in facilities" :key="item.id" :label="item.title" label-width="120px">
          <el-select multiple @change="change" v-model="list[item.field]" placeholder="请选择">
            <el-option v-for="tag in item.tags" :key="tag" :label="tag" :value="tag"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getEquip, updateEquip } from "@/network/supplier";
import { mapState } from "vuex";
import { facilities } from "@/utils/facilities";

const defaultList = {
  leisure: [],
  network: [],
  restaurant: [],
  provide: [],
  scenic: [],
  service: [],
  easy: [],
  motion: [],
  wheelchair: [],
};

export default {
  data () {
    return {
      facilities,
      list: Object.assign({}, defaultList),
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted () {
    getEquip({ supplier_id: this.user.id }).then((res) => {
      console.log(res);

      console.log(this.list);

      if (res.data.code == 200 && res.data.data) {
        this.list = res.data.data;
      } else {
        this.list = Object.assign({}, defaultList);
      }
    });
  },
  methods: {
    change () {
      console.log(this.list);

      updateEquip({ supplier_id: this.user.id, ...this.list }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("修改成功");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  border-bottom: 2px solid #ccc;
  > h3 {
    line-height: 40px;
    position: relative;
    font-weight: 500;
    color: var(--color-primary);

    > &::after {
      content: "";
      display: block;
      width: 4em;
      height: 4px;
      background-color: var(--color-primary);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>

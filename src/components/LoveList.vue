<template>
  <div>
    <center>
      <el-main v-loading="loading" element-loading-text="清單加载中">
        <h1>我的最愛</h1>
        <el-table
          :data="lovelist"
          height="400"
          border
          style="width: 85%;font-size: 20pt;height: 100%"
        >
          <el-table-column prop="prodname" label="商品名稱"></el-table-column>
          <el-table-column prop="price" label="單價" align="right" width="100"></el-table-column>
          <el-table-column prop="time" label="加入時間" width="300"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="Delete(scope.$index)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
      </el-main>
    </center>
  </div>
</template>

<script>
export default {
  name: "LoveList", //file name
  components: {},
  data() {
    return {
      user_log: this.GLOBAL.user_log,
      loading: true,
      lovelist: []
    };
  },
  created() {
    this.getLoveList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getLoveList() {
      let self = this;
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/lovelist/read.php";
      this.$https
        .post(url, {
          custid: this.GLOBAL.user_log.account
        })
        .then(function(response) {
          console.log(response);
          if (response.data.message === "ok") {
            self.lovelist = response.data.results;
          }
          self.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Delete(index) {
      let self = this;
      let info = {
        custid: this.GLOBAL.user_log.account,
        prodid: self.lovelist[index].prodid
      };
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/lovelist/delete.php";

      self
        .$confirm(`確認要將 ${self.lovelist[index].prodname} 移除我的最愛嗎？`)
        .then(_ => {
          this.$https
            .post(url, info)
            .then(function(response) {
              if (response.data.message === "ok") {
                self.getLoveList();
                self.$message({
                  message: "移除成功",
                  type: "success"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(_ => {});
    }
  }
};
</script>


<style scoped>
.el-main {
  position: relative;
  top: 100px;
  background-color: #f2f2f2;
}
</style>
<template>
  <div>
    <center>
      <el-main v-loading="loading" element-loading-text="商品加载中">
        <el-row :gutter="0" type="flex" justify="center" align="top">
          <!-- 幻燈片 -->
          <el-col :span="10">
            <br />
            <el-carousel
              indicator-position="outside"
              trigger="click"
              :autoplay="false"
              :loop="false"
              style="width: 400px;height: 330px"
            >
              <el-carousel-item v-for="item in 4" :key="item" style="width: 400px;height: 300px">
                <h3>商品圖片 {{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <!-- 商品資訊 -->
          <el-col :span="5">
            <el-row :gutter="10" type="flex" justify="start" align="top" style="width: 300px">
              <h1>[熱銷] {{this.product.Prodname}}</h1>
            </el-row>
            <el-col style="height: 100px">
              <p>這是一些描述</p>
            </el-col>
            <el-row :gutter="10" type="flex" justify="end" align="bottom">
              <el-button @click="addtocargo()" :disabled="isDisable">加入購物車</el-button>
              <el-button v-if="!iscustlove" @click="pluslovelist()">加入最愛</el-button>
              <el-button v-if="iscustlove" @click="dellovelist()" type="danger">移除最愛</el-button>
            </el-row>
            <br />
            <el-row :gutter="10" type="flex" justify="start" align="bottom">
              <font size="4" class="money">$</font>
              <font size="5" class="money">{{this.product.Price}}</font>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="height: 500px" type="flex" justify="center" align="middle">
          <h1>商品說明</h1>
        </el-row>
      </el-main>
    </center>
  </div>
</template>

<script>
export default {
  name: "ProductPage",
  components: {},
  data() {
    return {
      user_log: this.GLOBAL.user_log,
      product: {
        ProdID: "",
        Prodname: "",
        Price: 0
      },
      loading: true,
      iscustlove: false,
      isDisable: false
    };
  },
  created() {
    this.getProductInfo();
    this.iscustloveorno();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getProductInfo() {
      let self = this;
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/product/read.php?ProdID=" +
        this.$route.query.ProdID;
      this.$https
        .get(url)
        .then(function(response) {
          self.product.ProdID = response.data.results[0]["ProdID"];
          self.product.Prodname = response.data.results[0]["ProdName"];
          self.product.Price = response.data.results[0]["Price"];
          self.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    iscustloveorno() {
      let self = this;
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/lovelist/islove.php";
      this.$https
        .post(url, {
          custid: self.user_log.account,
          prodid: this.$route.query.ProdID
        })
        .then(function(response) {
          console.log(response.data.message);
          if (response.data.message === "YES") {
            self.iscustlove = true;
          } else {
            self.iscustlove = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pluslovelist() {
      let self = this;
      if (self.user_log.account === "") {
        self.$message({
          message: "請先登入",
          type: "error"
        });
      } else {
        let url =
          "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/lovelist/add.php";
        this.$https
          .post(url, {
            custid: self.user_log.account,
            prodid: this.$route.query.ProdID
          })
          .then(function(response) {
            console.log(response);
            if (response.data.message === "ok") {
              self.iscustlove = !self.iscustlove;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    dellovelist() {
      let self = this;
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/lovelist/delete.php";
      this.$https
        .post(url, {
          custid: self.user_log.account,
          prodid: this.$route.query.ProdID
        })
        .then(function(response) {
          console.log(response.data.message);
          if (response.data.message === "ok") {
            self.iscustlove = !self.iscustlove;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addtocargo() {
      let self = this;
      if (self.user_log.account === "") {
        self.$message({
          message: "請先登入",
          type: "error"
        });
      } else {
        let url =
          "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/cargolist/add.php";
        this.$https
          .post(url, {
            custid: self.user_log.account,
            prodid: this.$route.query.ProdID
          })
          .then(function(response) {
            console.log(response);
            if (response.data.message === "ok") {
              self.$message({
                message: "加入購物車",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1000);
      }
    }
  }
};
</script>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-row {
  width: 90%;
  background-color: white;
}
.el-main {
  position: relative;
  top: 100px;
}
.money {
  color: #cc9900;
}
</style>
<template>
  <div>
    <!-- 幻燈片廣告 -->
    <el-main class="top">
      <el-row :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="15">
          <br />
          <el-carousel height="250px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h1 class="small">廣告 {{ item }}</h1>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-main>
    <!-- 商品卡片 -->
    <el-main class="bottom" v-loading="loading" element-loading-text="商品加载中">
      <el-row>
        <el-col :span="6" v-for="project in allproducts" :key="project.ProdID">
          <br />
          <el-card
            :body-style="{ padding: '0px', height:'30px'}"
            shadow="hover"
            style="width: 280px;height: 320px;"
          >
            <router-link :to="{path: '/ProductPage', query: { ProdID: project.ProdID}}" tag="a">
              <div style="padding: 6px;height: 310px;">
                <div style="position: relative;background-color: #b4d9de;height:230px;">
                  <br />
                  <h1 class="word">示意圖片</h1>
                </div>
                <div>
                  <div style="position: relative;top: 15px">
                    <font size="6" class="word">{{project.ProdName}}</font>
                  </div>
                  <div style="position: relative;top: 20px;text-align: left;margin-left:0px;">
                    <font size="4" class="money">$</font>
                    <font size="5" class="money">{{project.Price}}</font>
                  </div>
                </div>
              </div>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "Startpage", //file name
  components: {},
  data() {
    return {
      allproducts: [],
      loading: true,
    };
  },
  created() {
    this.getProduct();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getProduct() {
      var url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/product/read.php";
      let self = this;
      this.$https
        .get(url)
        .then(function(response) {
          console.log(response);
          self.allproducts = response.data.results;
          console.log(self.allproducts);
          self.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
.el-carousel__item h1 {
  color: #475669;
  font-size: 50px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.top {
  background-color: white;
}
.el-row {
  width: 90%;
}
.money {
  color: #cc9900;
  text-align: left;
}
.bottom {
  background-color: #f2f2f2;
}
.el-main {
  position: relative;
  top: 80px;
}
a {
  text-decoration: none;
}
.word {
  color: black;
}
</style>
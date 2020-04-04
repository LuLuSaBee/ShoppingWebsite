<template>
  <div>
    <center>
      <el-container>
        <el-header style="position: fixed;top: 0px;width: 100%;z-index: 100;height: 100px">
          <el-row :gutter="2" type="flex" justify="end" align="middle" style="height: 30px">
            <el-col :span="6" :xs="1" :sm="1" :md="4" :lg="4" :xl="4" :pull="2">
              <router-link
                tag="a"
                style="text-decoration: none;color: gray;font-size: 11pt"
                v-if="user_log.account !==''"
                :to="{path: '/LoveList'}"
              >查看最愛</router-link>
              <el-link :underline="false" @click="showlogin()" v-if="user_log.account===''">登入</el-link>
              <el-link :underline="false" @click="logout()" v-else>登出{{this.user_log.account}}</el-link>
            </el-col>
          </el-row>
          <el-row :gutter="10" type="flex" justify="center" align="middle">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <router-link to="/" tag="a" style="text-decoration: none;color: black;">
                <h2>聖龍購物</h2>
              </router-link>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
              <el-input
                v-model="input_s"
                placeholder="搜尋"
                autosize
                size="large"
                @input="change($event)"
              >
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
              </el-input>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <!-- <el-button icon="el-icon-shopping-cart-1"></el-button> -->
              <router-link
                tag="a"
                class="el-icon-shopping-cart-1"
                style="text-decoration: none;color: black;font-size: 2rem"
                :to="{path: '/CargoList'}"
              ></router-link>
              <!-- <i class="el-icon-shopping-cart-1"></i> -->
            </el-col>
          </el-row>
        </el-header>

        <router-view></router-view>

        <el-footer class="forfixhead" style="height: 200px">
          <el-row :gutter="20" type="flex" justify="center" align="middle" style="height: 180px">
            <el-col :span="6">底層資訊、各式連結、聯絡我們、等等資訊</el-col>
            <br />
          </el-row>
          <el-row :gutter="20" type="flex" justify="center" align="middle" style="height: 20px">
            <el-col :span="6">Mabe by ShengLong Liu</el-col>
          </el-row>
        </el-footer>
      </el-container>
      <!-- log in page -->
      <el-dialog
        title="會員登入"
        width="40%"
        :visible.sync="dialogVisible"
        @close="this.$refs[formName].resetFields();"
      >
        <el-form :model="user_log" :rules="rules" status-icon ref="user_log">
          <center>
            <el-form-item prop="account">
              <el-input v-model="user_log.account" placeholder="帳號 : root"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="user_log.password" placeholder="密碼 : root"></el-input>
            </el-form-item>
          </center>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('user_log')">取 消</el-button>
          <el-button type="primary" @click="submitForm('user_log')">登 入</el-button>
        </span>
      </el-dialog>
    </center>
  </div>
</template>

<script>
export default {
  name: "App",
  comments: {},
  data() {
    var validateAcc = (rule, value, callback) => {
      if (!value) return callback(new Error("請輸入帳號"));
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (!value) return callback(new Error("請輸入密碼"));
      callback();
    };
    return {
      input_s: "",
      user_log: this.GLOBAL.user_log,
      dialogVisible: false,
      rules: {
        account: [{ validator: validateAcc, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      login_message: {
        message: "",
        type: "",
        center: true,
        duration: 1000,
        showClose: true
      }
    };
  },
  methods: {
    change($e) {
      this.$forceUpdate();
    },
    showlogin() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.checkAccount();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.user_log.account = "";
      this.user_log.password = "";
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    checkAccount() {
      let self = this;
      let url =
        "http://fs.mis.kuas.edu.tw/~C107156227/vscode/ShoppingWeb/api/v1/custom/read.php";
      this.$https
        .post(url, {
          custid: self.user_log.account,
          custpass: self.user_log.password
        })
        .then(function(response) {
          console.log(response);
          if (response.data.message === "ok") {
            self.user_log.token = "userhere";
            self.login_message.message = "登入成功";
            self.login_message.type = "success";
            self.dialogVisible = false;
          } else if (response.data.message == "password is worng") {
            self.login_message.message = "密碼輸入錯誤";
            self.login_message.type = "error";
          } else {
            self.login_message.message = "查無此帳號";
            self.login_message.type = "warning";
          }
          self.$message(self.login_message);
        });
    },
    logout() {
      let self = this;
      self.user_log.account = "";
      self.user_log.password = "";
      self.user_log.token = "";
      location.reload();
    },
    search() {
      let self = this;
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #ffbf00;
}
.el-footer {
  background-color: #e6e6e6;
}
.forfixhead {
  position: relative;
  top: 80px;
}
</style>

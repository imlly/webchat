<template>
  <div>
  	<div class="login_box">
      <el-tabs type="border-card">
        <el-tab-pane label="登录">
          <div class="top_bar">
            <div class="name">微信</div>
          </div>
          <div style="height: 30px;"></div>
          <el-input v-model="userName" placeholder="用户名"></el-input>
          <div style="height: 30px;"></div>
          <el-input v-model="password" placeholder="密码" show-password></el-input>
          <div style="height: 50px;"></div>
          <el-button type="success" icon="el-icon-check"  @click="login" circle></el-button>
          <div style="height: 140px;"></div>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <div class="top_bar">
            <div class="name">微信</div>
          </div>
          <div class="choose_head">
            <div class="headimg">
              <img :src="'../../static/img/'+headimgArr[current_head]" style="width:100px;"/>
            </div>
            <div class="to_left to" @click="change_head(-1)">〈</div>
            <div class="to_right to" @click="change_head(1)">〉</div>
          </div>
          <div style="height: 20px;"></div>
          <el-input v-model="nickname" placeholder="昵称"></el-input>
          <div style="height: 30px;"></div>
          <el-input v-model="userName2" placeholder="用户名"></el-input>
          <div style="height: 30px;"></div>
          <el-input v-model="password2" placeholder="密码" show-password></el-input>
          <div style="height: 30px;"></div>
          <el-button type="success" icon="el-icon-check"  @click="register" circle></el-button>
          <div style="height: 140px;"></div>
        </el-tab-pane>
      </el-tabs>
  	</div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>  
export default {
  name: 'login',
  data () {
    return {
      nickname:'',
      userName:'',
      password:'',
      userName2:'',
      password2:'',
      current_head:0,
      headimgArr:[
      	'headimg01.jpg',
      	'headimg02.jpg',
      	'headimg03.jpg',
      	'headimg04.jpg',
      	'headimg05.jpg',
      	'headimg06.jpg',
      	'headimg07.jpg',
      	'headimg08.jpg',
      	'headimg09.jpg',
      	'headimg10.jpg'
      ]
    }
  },
	mounted: function(){
		this.current_head=Math.floor(Math.random()*this.headimgArr.length);
	},
  methods: {
  	change_head(lr){
  		if(lr==1){
  			this.current_head++;
				if(this.current_head>=this.headimgArr.length){
					this.current_head=0;
				}
  		}else{
  			if(this.current_head<=0){
					this.current_head=this.headimgArr.length;
				}
  			this.current_head--;
  		}
  	},
  	login(){
      // 调用 LarkCloud 函数
      axios.post(
          'https://afwt8c.toutiao15.com/login',
          { userName: this.userName,
            password: this.password,
          }
      ).then(function(res) {
          // 处理正常结果
          const data = res.data;
          console.log(data.result);
      }).catch(function(error) {
          // 处理异常结果
          console.log(JSON.stringify(error));
          console.log(error.result);
      }).finally(function() {
          console.log('调用登录完成');
      });
      var userInfo = {userName: this.userName};
      this.$router.push({ name: 'chat', params: userInfo});
    },
    register(){
      // 调用 LarkCloud 函数
      axios.post(
          'https://afwt8c.toutiao15.com/register',
          { userName: this.userName2,
            password: this.password2,
            nickname: this.nickname,
            headImg: this.headimgArr[this.current_head]
          }
      ).then(function(res) {
          // 处理正常结果
          const data = res.data;
          console.log(data.result);
      }).catch(function(error) {
          // 处理异常结果
          console.log(JSON.stringify(error));
          console.log(error.result);
      }).finally(function() {
          console.log('调用注册完成');
      });
    }
  }
}
</script>

<style scoped>
	.login_box {
		width: 350px;
		height: 500px;
		background: #f5f5f5;
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		overflow: hidden;
		box-shadow: 0 0 10px 0px #999;
	}
	.top_bar {
		width: 100%;
		height: 64px;
	}
	.top_bar .name {
		float: left;
		font-size: 20px;
		line-height: 64px;
		margin-left: 26px;
		color: #4a4a4a;
	}
	.choose_head {
		width: 100%;
		height: 100px;
		position: relative;
	}
	.choose_head .headimg {
		width: 100px;
		height: 100px;
		margin: 0 auto;
		background: #999;
	}
	.choose_head .to {
		position: absolute;
		top: 36px;
		font-size: 32px;
		font-weight: bold;
		color: #1aad19;
		cursor: pointer;
	}
	.choose_head .to_left {
		left: 30px;
	}
	.choose_head .to_right {
		right: 30px;
	}
</style>
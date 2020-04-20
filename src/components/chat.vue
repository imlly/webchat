<template>
    <div>
        <div class="chat_box">
            <div class="panel_left">
                <div class="left_bar">
                    <div class="current_head">
                        <p>img</p>
                    </div>
                    <ul class="icon_list">
                        <li @click="changeIcon(index)" v-for="(icon,index) in icons" v-bind:key="index">
  							<img v-show="icon_show==index" :src="'../../static/img/'+icons_[index]" style="width:35px; margin-left:-55px;"/>
  							<img v-show="icon_show!=index" :src="'../../static/img/'+icons[index]" style="width:35px; margin-left:-55px;"/>
  						</li>
                    </ul>
                    <div class="more">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="online_box">
                    <div class="search_box">
                        <div class="search_bar">
                            <input type="text" placeholder="搜索"/>
                            <div class="add">+</div>
                            <div class="search_icon"></div>
                        </div>
                    </div>
                    <ul class="online_list" v-show="icon_show==0">
                        <li style="margin-left: -40px;" @click="changeMessage(index)" v-for="(message,index) in messageList" v-bind:key="index">
                            <div class="info">
                                <div class="user_head">
                                    <img src="../../static/img/headimg02.jpg" style="width:50px;margin-top:-5px;"/>
                                    <span class="fubiao"></span>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{message.friendName}}</div>
                                    <div class="user_msg">{{message.recentMessage}}</div>
                                </div>
                            </div>
                            <div class="other">
                                <div class="time">{{message.createdAt}}</div>
                            </div>
                        </li>
                    </ul>
                    <ul class="online_list" v-show="icon_show==1">
                        <li style="margin-left: -40px;" @click="changeFriend(index)" v-for="(friend,index) in friendList" v-bind:key="index">
                            <div class="info">
                                <div class="user_head">
                                    <img src="../../static/img/headimg02.jpg" style="width:50px;margin-top:-5px;"/>
                                    <span class="fubiao"></span>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{friend.friendNickname}}</div>
                                    <div class="user_msg"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="panel_right" v-show="icon_show==0">
                <div class="chatTitle_bar">
                    <div class="title">{{chat_title}}</div>
                </div>

                <div class="msg_box" id="msgbox">
                    <div class="more_record">查看更多消息</div>
                    <div>
                        <div class="the_head">
                            <img src="../../static/img/headimg02.jpg" style="width:50px;"/>
                        </div>
                        <div class="msg_body">
                            <div class="name">item.username <span>item.usermsg.time</span></div>
                            <div class="text"></div>
                        </div>
                    </div>    
                </div>
                <div>
                    <div class="top_bar">
                        <div class="face_icon" title="表情"></div>
                    </div>
                    <textarea class="text_box"></textarea>
                    <div class="send_btn">发送</div>
                </div>
            </div>
            <div class="panel_right" v-show="icon_show==1">
                <div style="margin-top:200px;">
                    <div>{{friend_message.userName}}</div>

                    <div>
                        <p><span>备注：</span>{{friend_message.note}}</p>
                        <el-button type="success">发消息</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
export default {
    name: 'chat',
    data () {
        return {
        userName:'',
        messageList: [],
        friendList:[],
        icons:[
            'chat_icon.png',
            'user_icon.png',
            'box_icon.png'
        ],
        icons_:[
            'chat_icon_.png',
            'user_icon_.png',
            'box_icon_.png'
        ],
        icon_show: 0,
        message_show:0,
        chat_title:'',
        friend_show:0,
        friend_message:'',
        //friendNickname_show:''
        }
    },
    mounted: function(){
        this.userName=this.$route.params.userName
        console.log('欢迎'+this.userName);
        var self = this;
        // 请求最近消息列表
        axios.post(
            'https://afwt8c.toutiao15.com/get_message_list',
            { 
                userName: this.userName
            }
        ).then((res)=>{
            // 处理正常结果
            const data = res.data;
            //console.log(data.result);
            //console.log(data.result.length);
            self.messageList = data.result;
            if(data.result.length!=0) self.chat_title=self.messageList[0].friendName;
            //console.log(self.messageList[0].createdAt);
            /*
            for(var index = 0;index < data.result.length;index++){
                self.messageList
            }*/
        }).catch(function(error) {
            // 处理异常结果
            console.log(JSON.stringify(error));
            console.log(error.result);
        }).finally(function() {
          console.log('请求最近消息列表成功');
        });
        // 请求好友列表
        axios.post(
            'https://afwt8c.toutiao15.com/get_friend_list',
            { 
                userName: this.userName
            }
        ).then((res)=>{
            // 处理正常结果
            const data = res.data;
            self.friendList = data.result;
        }).catch(function(error) {
            // 处理异常结果
            console.log(JSON.stringify(error));
            console.log(error.result);
        }).finally(function() {
          console.log('请求好友列表成功');
        });
        
    },
    methods:{
        changeIcon(index){
  		    this.icon_show=index;
          },
        changeMessage(index){
            this.message_show=index;
            this.chat_title=this.messageList[index].friendName;  
        },
        changeFriend(index){
            var self = this;
            this.friend_show=index;
            this.friend_message={
                userName: this.friendList[this.friend_show].friendName,
                note: this.friendList[this.friend_show].friendNickname
            }
            //this.friendNickname_show=this.friendList[this.friend_show].friendNickname;
            /*
            // 请求好友信息
            axios.post(
                'https://afwt8c.toutiao15.com/get_friend',
                { 
                    userName: this.friendList[index].friendName
                }
            ).then((res)=>{
                // 处理正常结果
                const data = res.data;
                self.friend_message = data.result;
                //console.log(data.result);
            }).catch(function(error) {
                // 处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {
            console.log('请求好友信息成功');
            });*/
        }
    }
}
</script>


<style scoped>
    ul{
        list-style: none;
    }
    .chat_box {
        width: 900px;
    height: 640px;
    overflow: hidden;
    border-radius: 4px;
    background: #f5f5f5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        box-shadow: 0 0 10px 0px #999;
    }
    .panel_left {
        width: 310px;
        height: 100%;
        float: left;
        background: #ebe9e8;
    }
    .panel_left .left_bar {
        width: 60px;
        height: 100%;
        background: #2c2726;
        float: left;
        position: relative;
    }
    .online_box {
        float: right;
        width: 250px;
        height: 100%;
    }
    .online_box .search_box {
        width: 100%;
        height: 62px;
        background: #eeeae8;
        overflow: hidden;
    }
    .panel_right {
        width: 590px;
        height: 100%;
        float: right;
    }
    .chatTitle_bar {
        width: 100%;
        height: 62px;
        border-bottom: 1px solid #e1e1e1;
        position: relative;
    }
    .chatTitle_bar .title {
        float: left;
        font-size: 20px;
        margin-top: 24px;
        margin-left: 30px;
    }
    .current_head {
        width: 35px;
        height: 35px;
        background: #ccc;
        margin: 20px auto 21px;
    }
    .icon_list {
        width: 35px;
        margin: 0 auto;
    }
    .icon_list li {
        margin-bottom: 10px;
        cursor: pointer;
    }
    .left_bar .more {
        width: 35px;
        height: 35px;
        position: absolute;
        bottom: 7px;
        left: 12px;
        cursor: pointer;
    }
    .left_bar .more span {
        width: 16px;
        height: 1px;
        background: #7e7e7f;
        display: block;
        margin: 0 auto 5px;
    }
    .left_bar .more span:nth-child(1) {
        margin-top: 10px;
    }
    .search_bar {
        width: 226px;
        height: 25px;
        margin: 25px auto 0;
        position: relative;
    }
    .search_bar>* {
        background: #e5e2e2;
        box-sizing: border-box;
        border: 1px solid #c7c7c7;
        height: 100%;
    }
    .search_bar input {
        width: 190px;
        outline: none;
        font-size: 12px;
        padding-left: 2px;
        float: left;
    }
    .search_bar .search_icon {
        width: 25px;
        position: absolute;
        top: 0;
        right: 36px;
        background: url(../../static/img/find.png);
        background-size: 100% 100%;
        border: none;
    }
    .search_bar .focus {
        background: #f2efee;
    }
    .search_bar .add {
        width: 25px;
        height: 25px;
        float: right;
        cursor: pointer;
        text-align: center;
        line-height: 22px;
        font-weight: lighter;
        font-size: 22px;
        color: #666;
    }
    .online_list {
        width: 100%;
        height: 578px;
        overflow: auto;
    }
    .online_list li {
        width: 100%;
        height: 64px;
        padding: 12px;
        box-sizing: border-box;
        position: relative;
    }
    .online_list .current {
        background: #c9c9c9;
    }
    .online_list .current:hover {
        background: #c9c9c9;
    }
    .online_list li:hover {
        background: #d8d8d8;
    }
    .online_list li .info {
        width: 184px;
        height: 40px;
        float: left;
    }
    .online_list li .other {
        width: 40px;
        height: 40px;
        float: right;
        position: absolute;
        right: 12px;
    }
    .online_list li .time {
        width: 100%;
        font-size: 12px;
        color: #aaa;
        text-align: right;
    }
    .online_list li .info .user_head {
        width: 40px;
        height: 40px;
        float: left;
        position: relative;
    }
    .online_list li .info .user_info {
        width: 144px;
        height: 40px;
        font-size: 14px;
        float: right;
        color: #111;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .online_list li .info .user_msg {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 12px;
        margin-top: 4px;
        color: #999;
    }
    .panel_right .msg_box {
        width: 100%;
        height: 432px;
    }
    .panel_right .send_box {
        width: 100%;
        height: 145px;
        border-top: 1px solid #e1e1e1;
        background: #f5f5f5;
        position: relative;
    }
    .panel_right .send_box .top_bar {
        width: 100%;
        height: 40px;
        padding: 14px 0 0 30px;
        box-sizing: border-box;
        position: relative;
    }
    .panel_right .send_box .top_bar .face_icon {
        width: 18px;
        height: 18px;
        background: url(../../static/img/face_icon.png);
        background-size: 100% 100%;
        cursor: pointer;
    }
    .panel_right .send_box .top_bar .face_icon:hover {
        background: url(../../static/img/face_icon_.png);
        background-size: 100% 100%;
    }
    .panel_right .send_box .text_box {
        width: 554px;
        height: 68px;
        margin-left: 30px;
        outline: none;
        resize:none;
        font-size: 14px;
        border: none;
        background: none;
    }
    .panel_right .focus {
        background: #fff;
    }
    .panel_right .send_box .send_btn {
        width: 68px;
        height: 25px;
        background: #f5f5f5;
        border: 1px solid #e1e1e1;
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 25px;
        position: absolute;
        right: 30px;
        bottom: 10px;
        border-radius: 2px;
        cursor: pointer;
    }
    .panel_right .send_box .send_btn:hover {
        background: #129611;
        color: #fff;
        border: 1px solid #129611;
    }
    .panel_right .msg_box {
        padding: 0 30px;
        box-sizing: border-box;
        overflow: auto;
    }
    .panel_right .msg_box .other_msg {
        float: left;
        width: 350px;
        margin-top: 12px;
    }
    .panel_right .msg_box .other_msg .the_head {
        width: 36px;
        height: 36px;
        margin-top: 4px;
        float: left;
    }
    .msg_box>div:last-child {
        margin-bottom: 12px;
    }
    .msg_box .other_msg .msg_body {
        float: left;
        max-width: 304px;
        margin-left: 10px;
    }
    .msg_box .other_msg .msg_body .name {
        font-size: 12px;
        color: #999;
        width: 20px;
    white-space: nowrap;
    }
    .msg_box .other_msg .msg_body .text {
        margin-top: 4px;
        font-size: 14px;
        color: #111;
        background: #fff;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }
    .panel_right .msg_box .my_msg {
        float: right;
    }
.panel_right .msg_box .my_msg .the_head {
        float: right;
    }
.msg_box .my_msg .msg_body {
        float: right;
        margin-right: 10px;
        margin-left: 0;
    }
    .msg_box .my_msg .msg_body .name {
        width: 100%;
        float: right;
        text-align: right;
    }
    .msg_box .my_msg .msg_body .text {
        float: right;
        background: #9eea6a;
    }
    .facebox {
        width: 400px;
        height: 200px;
        position: absolute;
        top: -200px;
        left: 0;
        background: #ccc;
    }
    .fubiao {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        background: #ff3b30;
        right: -5px;
        top: -5px;
    }
    .online_list .top {
        background: #dedede;
    }
    .more_record {
        text-align: center;
        font-size: 12px;
        color: #2c90ff;
        margin-top: 6px;
        cursor: pointer;
    }
    .left_bar .more_box {
        width: 134px;
        height: 92px;
        background: #323232;
        position: absolute;
        z-index: 1000;
        left: 59px;
        bottom: 14px;
        
    }
    .left_bar .more_box>div {
        width: 100%;
        height: 46px;
        color: #8c8c8c;
        font-size: 14px;
        line-height: 46px;
        padding-left: 12px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .left_bar .more_box>div:hover {
        background: #3c3c3c;
    }
    .feedback {
        width: 360px;
        height: 250px;
        background: #f5f5f5;
        box-shadow: 0 0 8px 0px #d3d3d3;
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        border-radius: 2px;
        border: 1px solid #ccc;
    }
    .feedback .top_bar {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
    }
    .feedback .top_bar .title {
        float: left;
        font-size: 12px;
        margin-left: 12px;
        line-height: 40px;
        color: #333;
    }
    .feedback .close>span {
        width: 10px !important;
    }
    .feedback .feedbacktext {
        width: 338px;
        height: 150px;
        margin: 0 auto;
        outline: none;
        resize:none;
        font-size: 14px;
        border: 1px solid #dcdcdc;
        background: #fff;
        display: block;
        padding: 24px 16px;
        box-sizing: border-box;
    }
    .feedback .btn_group {
        width: 150px;
        height: 26px;
        margin-top: 16px;
        margin-left: 200px;
    }
    .feedback .btn_group>div {
        float: left;
        width: 70px;
        height: 100%;
        background: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        color: #666;
        cursor: pointer;
    }
    .feedback .btn_group .back {
        float: right;
        border: 1px solid #dcdcdc;
    }
    .feedback .btn_group .back:hover {
        background: #f5f5f5;
    }
    .feedback .btn_group .sure {
        background: #87d087;
        color: #fff;
    }
    .feedback .btn_group .sure2 {
        background: #1aad19;
    }
    .feedback .close span {
        width: 10px !important;
        height: 2px;
        background: #777;
    }
    .feedback .close:hover span {
        background: #fff;
    }
    .sendEmpty {
        width: 114px;
        height: 34px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        line-height: 34px;
        position: absolute;
        right: 12px;
        bottom: 46px;
        box-shadow: 0 2px 4px 0px #d3d3d3;
    }
    .sendEmpty:after {
        content: "";
        width: 8px;
        height: 8px;
        background: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        position: absolute;
        bottom: -5px;
        right: 20px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-shadow: 2px 2px 2px 0px #d3d3d3;
    }
    .notice {
        width: 200px;
        height: 20px;
        background: #d4d4d4;
        position: absolute;
        left: 50%;
        margin-left: -100px;
        top:  29px;
        font-size: 12px;
        border-radius: 16px;
        color: #fff;
        text-align: center;
        line-height: 20px;
    }
</style>
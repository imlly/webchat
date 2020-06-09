<template>
    <div id="chat">
        <div class="chat_box">
            <div class="panel_left">
                <div class="left_bar">

                    <!--头像-->
                    <div class="current_head" @click="setbox2()">
                        <img :src=myHead style="width:35px; height:35px;"/>
                    </div>

                    <!--名片-->
                    <div class="alter_box" v-show="alterbox_show">
                        <div style="margin-left:7%; margin-top:7%; width: 86%; height:43%;">
                            <div style="float:left; margin-top:-5%;">
                                <p style="font-weight:bold; font-size:20px;">{{nickname}}</p>
                                <p style="color:#888888"><span>用户名: </span>{{userName}}</p>
                            </div>
                            <div style="float:right;">
                                <img :src=myHead style="width:80px; height: 80px;"/>
                            </div>
                        </div>
                        <hr style="width:85%; border:0; background-color:#DDDDDD; height:1px;"/>
                        <div style="margin-left:7%; margin-bottom:7%; width: 86%; height:40%; text-align:left;">
                            <p class="hehe"><span style="color:#888888">地区： </span><span style="font-weight:bold;">{{region}}</span></p>
                            <p class="hehe"><span style="color:#888888">签名： </span><span style="font-weight:bold;">{{sign}}</span></p>
                        </div>
                    </div>

                    <!--菜单栏-->
                    <ul class="icon_list" @click="hidebox()">
                        <li @click="changeIcon(index)" v-for="(icon,index) in icons" v-bind:key="index">
  							<img v-show="icon_show==index" :src="'../../static/img/'+icons_[index]" style="width:35px; margin-left:-55px;"/>
  							<img v-show="icon_show!=index" :src="'../../static/img/'+icons[index]" style="width:35px; margin-left:-55px;"/>
  						</li>
                    </ul>
                    <div class="more" @click="setbox()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div style="text-align: left;" class="more_box" v-show="setbox_show" @click="setbox_show=0">
  						<div class="logout" @click="logout();alterbox_show=0">退出登录</div>
                        <div class="setting" @click="configbox_show=1">设置</div>
  					</div>

                </div>

                <div class="online_box">

                    <!--搜索框-->
                    <div class="search_box">
                        <div class="search_bar">
                            <input type="text" v-model="searchName" placeholder="搜索"/>
                            <div class="add">+</div>
                            <div class="search_icon" @click="searchUser(3)"></div>
                        </div>
                    </div>

                    <!--最近消息列表-->
                    <ul class="online_list" v-show="icon_show==0">
                        <li style="margin-left:-40px;" @click="changeMessage(index)" v-for="(message,index) in messageList" v-bind:key="index" :class="index==message_show?'clicked':'unclicked'">
                            <div class="info">
                                <div class="user_head">
                                    <img :src=message.friendHead style="width:50px; height:50px; margin-top:-5px;"/>
                                    <!--<span class="fubiao"></span>-->
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{ userName==message.user1?message.user2:message.user1 }}</div>
                                    <div class="user_msg" v-html="message.message"></div>
                                </div>
                            </div>
                            <div class="other">
                                <div class="time">{{dateFormat(message.createdAt)}}</div>
                            </div>
                        </li>
                    </ul>

                    <!--好友列表-->
                    <ul class="online_list" v-show="icon_show==1">
                        <li style="margin-left: -40px;" @click="changeFriend(-2)" :class="friend_show==-2?'clicked':'unclicked'">
                            <div class="info">
                                <div class="user_head">
                                    <img :src="'../../static/img/'+'addIcon.png'" style="width:50px; height:50px; margin-top:-5px;"/>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">新的朋友</div>
                                    <div class="user_msg"></div>
                                </div>
                            </div>
                        </li>
                        <li style="margin-left: -40px;" @click="changeFriend(index)" v-for="(friend,index) in friendList" v-bind:key="index" :class="index==friend_show?'clicked':'unclicked'">
                            <div class="info">
                                <div class="user_head">
                                    <img :src=friend.friendHead style="width:50px; height:50px; margin-top:-5px;"/>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{friend.friendNickname}}</div>
                                    <div class="user_msg"></div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul class="online_list" v-show="icon_show==3">
                        <div class="noUser" v-show="userList.length == 0 && linkmanList.length == 0">
                            <div>提示：没有匹配的结果</div>
                        </div>
                        <div class="noUser" v-show="userList.length != 0">
                            <p>用户:</p>
                            <div v-show="userList.length == 0">提示：用户不存在</div>
                        </div>
                        <li style="margin-left: -40px;" @click="showUserInfo(index)" v-for="(user,index) in userList" v-bind:key="'user' + index">
                            <div class="info">
                                <div class="user_head">
                                    <img :src=user.headImg style="width:50px; height:50px; margin-top:-5px;"/>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{user.nickname}}</div>
                                    <div class="user_msg"></div>
                                </div>
                            </div>
                        </li>
                        <div class="noUser" v-show="linkmanList.length != 0">
                            <p>联系人:</p>
                            <div v-show="linkmanList.length == 0">提示：联系人不存在</div>
                        </div>
                        <li style="margin-left: -40px;" @click="jumpMessage_Search(index)" v-for="(linkman,index) in linkmanList" v-bind:key="'linkman' + index">
                            <div class="info">
                                <div class="user_head">
                                    <img :src=linkman.headImg style="width:50px;margin-top:-5px;"/>
                                </div>
                                <div class="user_info">
                                    <div class="user_name">{{linkman.nickname}}</div>
                                    <div class="user_msg"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <!--聊天界面-->
            <div class="panel_right" v-show="icon_show==0">
                <div class="chatTitle_bar">
                    <div class="title">{{chat_title}}</div>
                </div>

                <div class="msg_box" id="msgbox">
                    <div class="more_record" @click="getMoreChat()" v-show="more_chat==1">查看更多消息</div>
                    <div class="no_record" v-show="no_chat==1">没有更多消息了</div>
                    <div>
                        <div class="msg_body">
                            <ul id="message" style="padding-left: 0px;">
                                <div v-for="(chat_content,index) in chat_list" v-bind:key="index">
                                    <li style="height:50px; width:100%;">
                                        <div v-bind:class="userName===chat_content.source?'send':'receive'">
                                            <div class="the_head" v-show="chat_content.source===userName">
                                                <img :src=myHead style="width:36px; height:36px;"/>
                                            </div>
                                            <div class="the_head" v-show="chat_content.source===chat_title">
                                                <div v-for="(friend,index) in friendList" v-bind:key="index">
                                                    <li v-if="friend.friendName==chat_title">
                                                        <img :src=friend.friendHead style="width:36px; height:36px;"/>
                                                    </li>
                                                </div>
                                            </div>
                                            <div class="msg">
                                                <div class="text" v-html="chat_content.message"></div>
                                            </div>
                                        </div>
                                        <br>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div :class="['send_box',{'focus':write_flag}]">
                    <div class="top_bar">
                        <div class="face_icon" title="表情"></div>
                    </div>
                    <textarea class="text_box" v-model="send_text" @focus="write_flag=1" @focusout="write_flag=0"></textarea>
                    <div class="send_btn" @click="sendMessage()">发送</div>
                    <div class="sendEmpty" v-show="sendEmptyFlag">不能发送空白信息</div>
                </div>
            </div>

            <!--显示好友信息-->
            <div class="panel_right" v-show="icon_show==1 && friend_show==-2">
                <h1 class="newfriend_titile">新的朋友</h1>
                <hr/>
                <ul v-for="(request, index) in request_list" v-bind:key="index">
                    <li>
                        <div style="height:80px">
                            <div class="newfriend_head">
                                <img :src=request.friendHead style="width:60px;height:60px">
                            </div>
                            <div class="newfriend_info">
                                <p style="margin-top:5px">{{request.sender}}</p>
                                <p style="margin-top:5px"></p>
                            </div>
                            <div class="newfriend_button" v-show="request['undo'] == true">
                                <button @click="accept_request(index)">接受</button>
                            </div>
                            <div class="newfriend_button" v-show="request['undo'] == false">
                                <p>已添加</p>
                            </div>
                        </div>
                        <hr style="width:80%">
                    </li>
                </ul>
            </div>
            <div class="panel_right" v-show="icon_show==1 && friend_show==-1">
                <img :src="'../../static/img/'+'friendListBackground.png'" style="width:100%"/>
            </div>
            <div class="panel_right" v-show="icon_show==1 && friend_show>-1">
                <div class="friendBox">
                    <p>{{friend_info.nickname}}</p>
                    <p>{{friend_info.sign}}</p>
                </div>
                <div class="friendImg">
                    <img :src=friend_info.headImg style="width:80px; height:80px;"/>
                </div>
                <div class="friendInfo">
                    <div>
                        <ul v-for="(friend,index) in friendList" v-bind:key="index">
                            <li v-if="index==friend_show">
                                <hr class="friendLine"><br>
                                <p class="hehe"><span>备注：</span>{{friend.friendNickname}}</p>
                                <p class="hehe"><span>地区：</span>{{friend_info.region}}</p>
                                <p class="hehe"><span>用户名：</span>{{friend_info.userName}}</p>
                                <br><hr class="friendLine">
                            </li>
                        </ul>
                    </div>
                </div>
                <el-button type="success" @click="jumpMessage()">发消息</el-button>
            </div>


            <!--词云-->
            <div class="panel_right" v-show="icon_show==2">
                <h1 class="newfriend_titile">新的朋友</h1>
                <hr/>
                <div id="wordcloudtest" style="width:100%; height:100%;" />
            </div>


            <div class="panel_right" v-show="icon_show==3">
                <div style="margin-top:200px;" v-show="not_add==1">
                    <p><span>昵称：</span>{{userInfo['nickname']}}</p>
                    <p><span>用户名：</span>{{userInfo['userName']}}</p>
                    <p>备注：</p>
                    <textarea></textarea>
                    <br>
                    <el-button type="success" @click="addFriend()">添加好友</el-button>
                </div>
            </div>

            <!--设置-->
            <div class="configbox" v-show="configbox_show" style="text-align:left; overflow:auto;">
                <div style="float:left; margin-left:5%; margin-top:4%; font-weight:bold; color:#888888;"><span>设置</span></div>
                <div style="margin-left:92%; margin-top:3%;">
                    <span @click="configbox_show=0" style="font-size:30px; cursor:pointer; color:red;">×</span>
                </div>
                <p></p>
                <div style="margin-left:25%; width: 50%;">
                    <p style="font-weight:bold;">头像：</p>
                    <img id="base64Img" style="width:100px;height:100px;" :src=myHead />
                    <input type="file" id="Updateimage" lay-verify="required" @change="updataImg()" accept="image"/>
                    <div style="height: 30px;"></div>
                    <span style="font-weight:bold;">昵称：</span>
                    <el-input v-model="nickname" placeholder=nickname></el-input>
                    <div style="height: 30px;"></div>
                    <span style="font-weight:bold;">签名：</span>
                    <el-input v-model="sign" placeholder=user[sign]></el-input>
                    <div style="height: 30px;"></div>
                    <span style="font-weight:bold;">地区：</span>
                    <el-input v-model="region" placeholder=user.region></el-input>
                    <div style="height: 30px;"></div>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="changeInformation">确认修改</el-button>
                        <!--<el-button type="success" icon="el-icon-check" @click="changeInformation" circle></el-button>-->
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chat',
    data () {
        return {
        userName:'',
        messageList: [],
        friendList:[],
        myHead:'',
        nickname:'',
        newNick:'',
        sign:'',
        region:'',
        // 搜索相关
        userList:[],
        linkmanList:[],
        searchName:'',
        not_add:0,
        userInfo:{},

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
        write_flag: 0,
        // 获取更多信息相关
        more_chat: 1,
        chat_num: 1,
        no_chat: 0,

        head_index: 0,
        // 头像、昵称设置框
        alterbox_show: 0,
        // 其他设置框
        setbox_show: 0,
        // 设置框
        configbox_show: 0,
        icon_show: 0,
        message_show: 0,
        chat_title:'',
        friend_show: -1,
        friend_info:'',
        send_text:'',
        sendEmptyFlag: 0,
        //friendNickname_show:''
        //用于装载聊天信息
        chat_list:[],
        obj:'',
        //存储好友请求
        request_list:[],
        }
    },
    created:function(){

    },
    mounted: function(){
        const params = this.$route.params;
        if(params.userName){
            this.userName = params.userName;
            console.log('欢迎, ' + this.userName);
        }
        else{
            this.goBack();
        }
        // 历史返回重新登陆
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL)
            window.addEventListener('popstate', this.goBack, false)
        }
        var self = this;
        //表情启动
        this.obj=new Face({
            el:document.querySelector('.face_icon'),
            callBack:function (face) {
                self.send_text+="〖"+face.title+"〗";
                document.querySelector('.face-warp').style.display='none';
            }
        });
        // 获取用户信息
        axios.post(
            'https://afwt8c.toutiao15.com/get_user',
            {
                userName: this.userName
            }
        ).then((res)=>{
            // 处理正常结果
            const data = res.data;
            self.nickname = data.result.nickname;
            self.sign = data.result.sign;
            self.region = data.result.region;
        }).catch(function(error) {
            // 处理异常结果
            console.log(JSON.stringify(error));
            console.log(error.result);
        }).finally(function() {
            console.log('请求用户信息成功');
        });
        // 获取用户头像
        axios.post(
            'https://afwt8c.toutiao15.com/get_headImg',
            {
                userName: this.userName
            }
        ).then((res)=>{
            // 处理正常结果
            const data = res.data;
            self.myHead = data.result;
        }).catch(function(error) {
            // 处理异常结果
            console.log(JSON.stringify(error));
            console.log(error.result);
        }).finally(function() {
            console.log('请求头像成功');
        });
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
            // console.log(moment(data.result[0].createdAt).utcOffset(480).format('YYYY-MM-DD HH:mm:ss'));
            for(var i=0; i<self.messageList.length; i++){
                self.messageList[i].message = self.obj.replaceFace(self.messageList[i].message);
            }
            if(data.result.length!=0) {
                if(self.messageList[0].user1 == this.userName)
                    self.chat_title=self.messageList[0].user2;
                else
                    self.chat_title=self.messageList[0].user1;
                // 请求列表第一个人的聊天记录
                axios.post(
                    'https://afwt8c.toutiao15.com/get_chat_record',
                    {
                        userName:this.userName,
                        friendName:this.chat_title,
                        num: 5
                    }
                ).then((res)=>{
                    //处理正常结果
                    const data = res.data;
                    console.log(data.result.length);
                    this.chat_list = [];
                    for(var i = data.result.length - 1;i >= 0;i--)
                    {
                        data.result[i].message = self.obj.replaceFace(data.result[i].message);
                        if(data.result[i].sender == 1){
                            this.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                        }
                        else{
                            this.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                        }
                    };
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log("获取聊天记录成功！")
                });
            }
            //console.log(self.messageList[0].createdAt);

            // for(var index = 0;index < self.messageList.length;index++){
            //     console.log(self.messageList[index]);
            // }
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
        //与服务器建立连接，持续监听服务器发来的消息
        socket.emit('user_info', {
            username: this.userName,
        });
        socket.on(this.userName, function(msg){
            //收到的信息类型为：消息
            if(msg.type == "message"){
                if(msg.source == self.chat_title)
                    self.chat_list.push(msg);
                let userExist = 0;
                /*for(let i = 0;i < self.messageList.length;i++)
                {
                    let tempName = (self.messageList[i].user1 == self.userName ? self.messageList[i].user2 : self.messageList[i].user1);
                    if(msg.source == tempName)
                    {
                        self.messageList[i].message = msg.message;
                        userExist = 1;
                        break;
                    }
                }*/
                if(userExist == 0)
                {
                    // 刷新最近消息列表
                    axios.post(
                        'https://afwt8c.toutiao15.com/get_message_list',
                        {
                            userName: self.userName
                        }
                    ).then((res)=>{
                        // 处理正常结果
                        const data = res.data;
                        //console.log(data.result);
                        //console.log(data.result.length);
                        self.messageList = data.result;
                        if(data.result.length!=0 && self.chat_title == '') {
                            if(self.messageList[0].user1 == self.userName)
                                self.chat_title=self.messageList[0].user2;
                            else
                                self.chat_title=self.messageList[0].user1;
                        }
                        // 请求列表选定的人的聊天记录
                        if(self.chat_title != '')
                        {
                            axios.post(
                                'https://afwt8c.toutiao15.com/get_chat_record',
                                {
                                    userName:self.userName,
                                    friendName:self.chat_title,
                                    num: 5
                                }
                            ).then((res)=>{
                                //处理正常结果
                                const data = res.data;
                                console.log(data.result.length);
                                console.log(self.chat_title);
                                self.chat_list = [];
                                for(var i = data.result.length - 1;i >= 0;i--)
                                {
                                    data.result[i].message = self.obj.replaceFace(data.result[i].message);
                                    if(data.result[i].sender == 1){
                                        self.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                                    }
                                    else{
                                        self.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                                    }
                                };
                            }).catch(function(error) {
                                // 处理异常结果
                                console.log(JSON.stringify(error));
                                console.log(error.result);
                            }).finally(function() {
                                console.log("获取聊天记录成功！");
                            });
                        }
                    }).catch(function(error) {
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(function() {
                        console.log('请求最近消息列表成功');
                    });
                }
            }
            else if(msg.type == "request")  //收到的信息类型为：好友请求
            {
                //获取好友请求
                axios.post(
                    'https://afwt8c.toutiao15.com/get_friend_request',
                    {
                        userName: self.userName
                    }
                ).then((res)=>{
                    //处理正常结果
                    const data = res.data;
                    self.request_list = data.result;
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log('更新好友请求成功');
                });
            }
            else{
                console.log("信息类型不明确!");
            }
        });
    },
    beforeDestroy: function(){
    },
    methods:{
        logout(){
            // 用户登出，清除session
            //window.sessionStorage.removeItem('user');
            console.log("用户登出！");
            alert("已登出！");

            // 返回登录页
            this.$router.push('/');
        },
        // 格式化时间
        dateFormat:function(time) {
            var date=new Date(new Date(time).getTime());
            var year=date.getFullYear();
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            var day=date.getDate();
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            var currDate = new Date();
            var currMonth = currDate.getMonth()+1<10 ? "0"+(currDate.getMonth()+1) : currDate.getMonth()+1;
            var currDay = currDate.getDate();
            if(currDate.getFullYear()!=year || currMonth!=month){
                var day1 = day<10? "0"+day : day;
                return year+"/"+month+"/"+day1;
            }
            if(currDay!=day){
                if((currDay-day) < 7){
                    var weekDay = "";
                    switch(date.getDay()){
                        case 0:
                            weekDay = "星期天";
                            break;
                        case 1:
                            weekDay = "星期一";
                            break;
                        case 2:
                            weekDay = "星期二";
                            break;
                        case 3:
                            weekDay = "星期三";
                            break;
                        case 4:
                            weekDay = "星期四";
                            break;
                        case 5:
                            weekDay = "星期五";
                            break;
                        case 6:
                            weekDay = "星期六";
                    }
                    return weekDay;
                }
                else{
                    return year+"/"+month+"/"+day;
                }
            }
            if(currDay==day){
                return hours+":"+minutes+":"+seconds;
            }
        },
        changeIcon(index){
            this.icon_show=index;
            this.more_chat = 1;
            this.chat_num = 1;
            this.no_chat = 0;
            if(index==0)
            {
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
                    this.messageList = data.result;
                    if(data.result.length!=0 && this.chat_title == '') {
                        if(this.messageList[0].user1 == this.userName)
                            this.chat_title=this.messageList[0].user2;
                        else
                            this.chat_title=this.messageList[0].user1;
                    }
                    if(this.chat_title != '')
                    {
                        // 请求列表选定的人的聊天记录
                        axios.post(
                            'https://afwt8c.toutiao15.com/get_chat_record',
                            {
                                userName:this.userName,
                                friendName:this.chat_title,
                                num: 5
                            }
                        ).then((res)=>{
                            //处理正常结果
                            const data = res.data;
                            console.log(data.result.length);
                            this.chat_list = [];
                            for(var i = data.result.length - 1;i >= 0;i--)
                            {
                                data.result[i].message = this.obj.replaceFace(data.result[i].message);
                                if(data.result[i].sender == 1){
                                    this.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                                }
                                else{
                                    this.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                                }
                            };
                        }).catch(function(error) {
                            // 处理异常结果
                            console.log(JSON.stringify(error));
                            console.log(error.result);
                        }).finally(function() {
                            console.log("获取聊天记录成功！");
                        });
                    }
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log('请求最近消息列表成功');
                });
            }
            else if(index==1)
            {
                // 请求好友列表
                axios.post(
                    'https://afwt8c.toutiao15.com/get_friend_list',
                    {
                        userName: this.userName
                    }
                ).then((res)=>{
                    // 处理正常结果
                    const data = res.data;
                    this.friendList = data.result;
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                console.log('请求好友列表成功');
                });
                //获取好友请求
                axios.post(
                    'https://afwt8c.toutiao15.com/get_friend_request',
                    {
                        userName: this.userName
                    }
                ).then((res)=>{
                    //处理正常结果
                    const data = res.data;
                    this.request_list = data.result;
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log('获取好友请求成功');
                    //console.log(self.friend_info);
                });
                // 请求好友信息
                /*
                axios.post(
                'https://afwt8c.toutiao15.com/get_friend',
                {
                    userName: this.friendList[this.friend_show]['friendName']
                }
                ).then((res)=>{
                    // 处理正常结果
                    const data = res.data;
                    this.friend_info = data.result;
                    //console.log(data.result);
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log('请求好友信息成功');
                    //console.log(self.friend_info);
                });
                */
            } else if(index==2){
              this.$nextTick(() => {
                this.renderCloud();
              });
//                 var wct = document.getElementById('wordcloudtest');
//                 console.log(wct);
//                 var wc = new Js2WordCloud(wct);
//                 console.log(wc);
//                 wc.setOption({
//                     tooltip: {
//                         show: true
//                     },
//                     list: [['谈笑风生', 80], ['谈笑风生', 80], ['谈笑风生', 70], ['谈笑风生', 70], ['谈笑风生', 60], ['谈笑风生', 60]],
//                     color: '#15a4fa'
//                 })
            }
        },
        changeMessage(index){
            //this.message_show=index;
            //this.chat_title=this.messageList[index].friendName;
            if(this.message_show != index){
                this.message_show = index;
                this.more_chat = 1;
                this.chat_num = 1;
                this.no_chat = 0;
                this.chat_title=(this.messageList[index].user1 == this.userName?this.messageList[index].user2:this.messageList[index].user1);
                console.log("changeMessage",this.chat_title);
                //默认获取最近的5条聊天记录
                axios.post(
                    'https://afwt8c.toutiao15.com/get_chat_record',
                    {
                        userName:this.userName,
                        friendName:this.chat_title,
                        num: 5
                    }
                ).then((res)=>{
                    //处理正常结果
                    const data = res.data;
                    this.chat_list = [];
                    for(var i = data.result.length - 1;i >= 0;i--)
                    {
                        data.result[i].message = this.obj.replaceFace(data.result[i].message);
                        if(data.result[i].sender == 1){
                            this.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                        }
                        else{
                            this.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                        }
                    };
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log("获取聊天记录成功！")
                });
            }
        },
        // 获取更多信息
        getMoreChat(){
            this.chat_num += 1;
            var number = 5 * this.chat_num;
            axios.post(
                'https://afwt8c.toutiao15.com/get_chat_record',
                {
                    userName:this.userName,
                    friendName:this.chat_title,
                    num: number
                }
            ).then((res)=>{
                //处理正常结果
                const data = res.data;
                this.chat_list = [];
                if(data.result.length < number){
                    this.more_chat = 0;
                    this.no_chat = 1;
                }
                for(var i = data.result.length - 1;i >= 0;i--)
                {
                    data.result[i].message = this.obj.replaceFace(data.result[i].message);
                    if(data.result[i].sender == 1){
                        this.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                    }
                    else{
                        this.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                    }
                };
            }).catch(function(error){
                // 处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function(){
                console.log("获取更多聊天记录成功！")
            });
        },
        // 修改头像昵称
        confirm_btn(){
            if(this.newNick==''){
                this.newNick = this.nickname;
            }
            axios.post(
                'https://afwt8c.toutiao15.com/set_nickname',
                {
                    userName: this.userName,
                    nickname: this.newNick
                }
            ).then((res)=>{
                // 处理正常结果
                const data = res.data;
                console.log(data.result);
            }).catch(function(error) {
                // 处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {
                console.log('修改昵称成功');
            });
            axios.post(
                'https://afwt8c.toutiao15.com/set_headImg',
                {
                    userName: this.userName,
                    headImg: this.headimgArr[this.head_index]
                }
            ).then((res)=>{
                // 处理正常结果
                const data = res.data;
                console.log(data.result);
            }).catch(function(error){
                // 处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function(){
                console.log('修改头像成功');
            });
            this.myHead = this.headimgArr[this.head_index];
        },
        changeFriend(index){
            /*var self = this;
            this.friend_show=index;
            this.friend_info={
                userName: this.friendList[this.friend_show].friendName,
                note: this.friendList[this.friend_show].friendNickname
            }*/
            this.friend_show=index;
            // console.log("friendList",this.friendList);
            // 请求好友信息
            if(index>-1){
                axios.post(
                    'https://afwt8c.toutiao15.com/get_friend',
                    {
                        userName: this.friendList[this.friend_show]['friendName']
                    }
                ).then((res)=>{
                    // 处理正常结果
                    const data = res.data;
                    this.friend_info = data.result;
                    //console.log(data.result);
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                console.log('请求好友信息成功');
                //console.log(self.friend_info);
                });
            }
        },
        sendMessage(){
            if(this.send_text == ''){
                var _this=this;
                this.sendEmptyFlag = 1;
                setTimeout(function(){
                    _this.sendEmptyFlag=0;
                }, 1500);
                return;
            }
            else{
                this.send_text = this.obj.replaceFace(this.send_text);
                var msg = {source:this.userName, des:this.chat_title, message : this.send_text, type : "message"};
                socket.emit('send message', msg);
                this.chat_list.push(msg);
                this.send_text = '';
                for(let i = 0;i < this.messageList.length;i++)
                {
                    let tempName = (this.messageList[i].user1 == this.userName ? this.messageList[i].user2 : this.messageList[i].user1);
                    if(msg.des == tempName)
                    {
                        this.messageList[i].message = msg.message;
                        break;
                    }
                }
                axios.post(
                    'https://afwt8c.toutiao15.com/add_chat_record',
                    {
                        sender:msg.source,
                        receiver:msg.des,
                        message:msg.message,
                    }
                ).then((res)=>{
                    //处理正常结果

                }).catch((error)=>{
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(()=>{
                    console.log('聊天记录已保存至数据库');
                });
                // 更新最近消息列表
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
                    this.messageList = data.result;
                    this.message_show = 0;
                    // 请求列表选定的人的聊天记录
                    axios.post(
                        'https://afwt8c.toutiao15.com/get_chat_record',
                        {
                            userName:this.userName,
                            friendName:this.chat_title,
                            num: 5
                        }
                    ).then((res)=>{
                        //处理正常结果
                        const data = res.data;
                        console.log(data.result.length);
                        this.chat_list = [];
                        for(var i = data.result.length - 1;i >= 0;i--)
                        {
                            data.result[i].message = this.obj.replaceFace(data.result[i].message);
                            if(data.result[i].sender == 1){
                                this.chat_list.push({source: data.result[i].user1, des:data.result[i].user2, message:data.result[i].message});
                            }
                            else{
                                this.chat_list.push({source: data.result[i].user2, des:data.result[i].user1, message:data.result[i].message});
                            }
                        };
                    }).catch(function(error) {
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(function() {
                        console.log("获取聊天记录成功！");
                    });
                }).catch(function(error) {
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function() {
                    console.log('请求最近消息列表成功');
                });
            }
        },
        //搜索好友
        searchUser(index){
            console.log(this.searchName);
            axios.post(
                'https://afwt8c.toutiao15.com/search_user',
                {
                    userName:this.userName,
                    searchName:this.searchName
                }
            ).then((res)=>{
                //处理正常结果
                const data = res.data;
                console.log(data.result);
                this.userList = [];
                this.linkmanList = [];
                for(let i = 0;i < data.result.length;i++)
                {
                    if(data.result[i]['isFriend'])
                        this.linkmanList.push(data.result[i]);
                    else
                        this.userList.push(data.result[i]);
                }
            }).catch(function(error) {
                //处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {
                console.log('查找成功');
            })
            this.icon_show=index;
            this.not_add=0;
        },
        //查看用户个人资料
        showUserInfo(index){
            this.not_add=1;
            console.log(index);
            this.userInfo=this.userList[index];
        },
        //添加好友
        addFriend(){
            axios.post(
                'https://afwt8c.toutiao15.com/add_friend',
                {
                    userName:this.userName,
                    friendName:this.userInfo['userName']
                }
            ).then((res)=>{
                //处理正常结果
                const data = res.data;
                console.log(data.result);
                if(data.result == '添加好友成功！')
                {
                    var msg = {source:this.userName, des:this.userInfo['userName'], message : "你们已经是好友了，马上开始聊天吧", type : "message"};
                    socket.emit('send message', msg);
                    //将这条消息保存到数据库
                    axios.post(
                        'https://afwt8c.toutiao15.com/add_chat_record',
                        {
                            sender:msg.source,
                            receiver:msg.des,
                            message:msg.message,
                        }
                    ).then((res)=>{
                        //处理正常结果

                    }).catch((error)=>{
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(()=>{
                        console.log('聊天记录已保存至数据库');
                    })
                    //更新好友请求列表
                    axios.post(
                        'https://afwt8c.toutiao15.com/get_friend_request',
                        {
                            userName: this.userName
                        }
                    ).then((res)=>{
                        //处理正常结果
                        const data = res.data;
                        this.request_list = data.result;
                        console.log(this.request_list);
                    }).catch(function(error) {
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(function() {
                        console.log('获取好友请求成功');
                        //console.log(self.friend_info);
                    });
                }
                //广播一条好友请求，让收方更新请求列表
                else{
                    var msg = {source:this.userName, des:this.userInfo['userName'], message : "", type : "request"};
                    socket.emit('send message', msg);
                }
            }).catch(function(error) {
                //处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {

            })
        },
        // 点击发消息跳转页面
        jumpMessage(){
            this.icon_show = 0;
            var judge = 0;
            for(let i = 0;i < this.messageList.length;i++)
            {
                if(this.userName==this.messageList[i].user1) var tempName = this.messageList[i].user2;
                else var tempName = this.messageList[i].user1;
                if(tempName==this.friendList[this.friend_show]['friendName'])
                {
                    //console.log(i);
                    judge = 1;
                    this.changeMessage(i);
                    break;
                }
            }
            /*
            if(judge==0){
                axios.post(
                    'https://afwt8c.toutiao15.com/add_chat_record',
                    {
                        sender:this.userName,
                        receiver:this.friendList[this.friend_show]['friendName'],
                    }
                ).then((res)=>{
                    //处理正常结
                }).catch((error)=>{
                    // 处理异常结果
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(()=>{
                    console.log('已添加空消息');
                })
            } */
        },
        //点击搜索结果中的好友跳转页面
        jumpMessage_Search(index)
        {
            this.icon_show = 0;
            for(let i = 0;i < this.messageList.length;i++)
            {
                let tempName;
                this.userName==this.messageList[i].user1 ? tempName = this.messageList[i].user2 : tempName = this.messageList[i].user1;
                if(tempName == this.linkmanList[index]['userName'])
                {
                    this.changeMessage(i);
                    break;
                }
            }
        },
        //接受好友请求
        accept_request(index){
            axios.post(
                'https://afwt8c.toutiao15.com/add_friend',
                {
                    userName:this.userName,
                    friendName:this.request_list[index].sender
                }
            ).then((res)=>{
                //处理正常结果
                const data = res.data;
                console.log(data.result);
                if(data.result == '添加好友成功！')
                {
                    const record = data.record;
                    this.request_list[index].undo = record.undo;
                    var msg = {source:this.userName, des:this.request_list[index].sender, message : "你们已经是好友了，马上开始聊天吧", type : "message"};
                    socket.emit('send message', msg);
                    axios.post(
                        'https://afwt8c.toutiao15.com/add_chat_record',
                        {
                            sender:msg.source,
                            receiver:msg.des,
                            message:msg.message,
                        }
                    ).then((res)=>{
                        //处理正常结果

                    }).catch((error)=>{
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(()=>{
                        console.log('聊天记录已保存至数据库');
                    })
                    // 重新请求好友列表
                    axios.post(
                        'https://afwt8c.toutiao15.com/get_friend_list',
                        {
                            userName: this.userName
                        }
                    ).then((res)=>{
                        // 处理正常结果
                        const data = res.data;
                        this.friendList = data.result;
                    }).catch(function(error) {
                        // 处理异常结果
                        console.log(JSON.stringify(error));
                        console.log(error.result);
                    }).finally(function() {
                    console.log('请求好友列表成功');
                    });
                }
            }).catch(function(error) {
                //处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {

            })
        },
        // 显示设置框
        setbox(){
            if(this.setbox_show==0) this.setbox_show=1;
            else this.setbox_show=0;
            this.alterbox_show=0;
        },
        setbox2(){
            if(this.alterbox_show==0) this.alterbox_show=1;
            else this.alterbox_show=0;
            this.setbox_show=0;
        },
        // 隐藏设置框
        hidebox(){
            this.alterbox_show=0;
            this.setbox_show=0;
        },
        // 上传图片
        updataImg(){
            var self = this;
            var file = document.querySelector('input[type=file]').files[0];
            console.log("base64",file);
            var reader = new FileReader();
            reader.onload = function () {
                $("#base64Img").attr("src",reader.result);
                self.imageUrl = reader.result;
                // console.log(self.imageUrl);
                //刷新头像
                self.myHead = reader.result;
                //上传到数据库
                axios.post(
                    'https://afwt8c.toutiao15.com/set_headImg',
                    {
                        userName: self.userName,
                        headImg: reader.result
                    }
                ).then((res)=>{
                    const data = res.data;
                }).catch(function(error){
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function(){
                    console.log('修改头像成功');
                });
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        goBack () {
            let href = window.location.href
            window.location.href = href.split('#')[0]
        },
        // 修改用户信息
        changeInformation(){
            axios.post(
               'https://afwt8c.toutiao15.com/set_user',
               {
                   userName: this.userName,
                   nickname: this.nickname,
                   sign: this.sign,
                   region: this.region
               }
            ).then((res)=> {
                // 处理正常结果
                const data = res.data;
                console.log("data:", data);
            }).catch(function(error) {
                // 处理异常结果
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function() {
                console.log('修改完成！');
            });
        },
        // 词云
        renderCloud() {
            var option = {
                tooltip: {
                    show: true,
                    formatter: function(item) {
                        return item[0] + ': 价值¥' + item[1] + '<br>' + '词云图'
                    }
                },
                list: [['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1], ['谈笑风生', 500000], ['谈笑风生', 50], ['谈笑风生', 40], ['谈笑风生', 40], ['谈笑风生', 30], ['谈笑风生', 30], ['谈笑风生', 20], ['谈笑风生', 20], ['谈笑风生', 1], ['谈笑风生', 1]],
                // list:[["玻璃瓶",941],["塑料瓶",15],["易拉罐",3]],
                color: '#15a4fa',
                shape: 'circle',
                ellipticity: 1
            }
            var wc = new Js2WordCloud(document.getElementById('wordcloudtest'))
            wc.showLoading({
                backgroundColor: '#fff',
                text: '看见了福建省的附件里是卡洛斯的家',
                effect: 'spin'
            })
            setTimeout(function() {
                wc.hideLoading()
                wc.setOption(option)
            }, 2000)

            var wc = new Js2WordCloud(document.getElementById('wordcloudtest'));
            //let list = words
            // let option = {
            //     tooltip: {
            //         show: false,
            //         formatter: function (item) {
            //             console.log(item)
            //         }
            //     },
            //     list: [['谈笑风生', 80], ['谈笑风生', 80], ['谈笑风生', 70], ['谈笑风生', 70], ['谈笑风生', 60], ['谈笑风生', 60]],
            //     shape: 'pentagon',
            //     ellipticity: 1
            // }
            console.log(wc);
            wc.setOption(option);
            window.onresize = function () {
                wc.setOption(option)
            }
            console.log('finish');
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
        cursor: pointer;
    }

    .left_bar .alter_box {
        width: 300px;
		height: 230px;
		background: white;
		position: absolute;
		z-index: 1000;
		left: 45px;
		top: 40px;
        border-radius: 25px;
        border: 2px solid #888888;
        padding: 20px;
    }
    .choose_head {
        width: 100%;
		height: 120px;
		position: relative;
    }
    .choose_head .headimg {
        position: absolute;
        top: 27px;
		width: 70px;
		height: 70px;
		left: 95px;
		background: #999;
	}
    .choose_head .to {
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
		position: absolute;
		top: 36px;
		font-size: 26px;
		font-weight: bold;
		color: #1aad19;
		cursor: pointer;
	}
	.choose_head .to_left {
		left: 35px;
	}
	.choose_head .to_right {
		right: 25px;
	}
    .nick {
        height: 50px;
    }
    .nick>input {
        height: 25px;
        background: #323232;
        border: 1px;
        color: #FFFFFF;
        text-align: center;
        font-size: 15px;
        outline:none;
    }
    .nick>input::-webkit-input-placeholder {
        text-align: center;
        color: #FFFFFF;
        font-size: 15px;
    }
    .nick>input::-moz-placeholder {
        text-align: center;
        color: #FFFFFF;
        font-size: 15px;
    }
    .nick>input:-moz-placeholder {
        text-align: center;
        color: #FFFFFF;
        font-size: 15px;
    }
    .nick>input:-ms-input-placeholder {
        text-align: center;
        color: #FFFFFF;
        font-size: 15px;
    }
    .configbox {
		width: 550px;
		height: 470px;
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
    .confirm {
        height: 60px;
    }
    .confirm>button {
        position: absolute;
        left: 92px;
        bottom: 11px;
        height: 38px;
        width: 80px;
        font-size: 15px;
        color: #FFFFFF;
        background: #323232;
        border: 1px solid #323232;
        cursor: pointer;
        outline:none;
    }
    .confirm>button:active{
        background: #3c3c3c;
    }
    .logout{
        font-size: 20px;
        color: #ff0000;
        cursor: pointer;
        outline:none;
    }
    .setting{
        font-size: 20px;
        color: #8c8c8c;
        cursor: pointer;
        outline:none;
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
    .online_list .clicked {
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
        font-size: 10px;
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
    .online_list .noUser{
        margin-left: -40px;
        margin: 1px;
    }
    .online_list .noUser p{
        text-align: left;
        color: gray;
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
    .msg_box>div:last-child {
        margin-bottom: 12px;
    }
    .panel_right .newfriend_titile{
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        margin-left: 8%;
        margin-top: 22px;
        color: black;
    }
    .panel_right .newfriend_info{
        float: left;
        margin-top: 0px;
        margin-left: 10%;
    }
    .panel_right .newfriend_head{
        float: left;
        width: 60px;
        height: 60px;
        margin-left: 10%;
        background-color: brown;
    }
    .panel_right .newfriend_button{
        float: right;
        margin-right: 20%;
        margin-top: 10px;
    }
    .panel_right .friendBox{
        text-align: left;
        margin-left: 20%;
        margin-top: 15%;
        float:left;
    }
    .panel_right .friendImg{
        margin-top: 15%;
    }
    .panel_right .friendInfo{
        text-align: left;
        margin-top:5%;
    }
    .panel_right .friendInfo .friendLine{
        width:75%;
        border:0;
        background-color:#ff0000;
        height:1px;
    }
    .panel_right .friendInfo .hehe{
        margin-left: 20%;
    }
    .msg_box .msg_body .send{
        width: 100%;
        height: 40px;
    }
    .msg_box .msg_body .receive{
        width: 100%;
        height: 40px;
    }
    .msg_box .msg_body .send .the_head {
		float: right;
    }
    .msg_box .msg_body .receive .the_head{
        float: left;
    }
    .msg_box .msg_body .send .msg{
        float: right;
        margin-right: 10px;
		margin-left: 0;
    }
    .msg_box .msg_body .receive .msg{
        float: left;
        margin-left: 10px;
    }
    .msg_box .msg_body .send .text{
        margin-top: 4px;
		font-size: 14px;
        padding: 8px;
		box-sizing: border-box;
        background-color: #9eea6a;
        border-radius: 5px;
    }
    .msg_box .msg_body .receive .text{
        margin-top: 4px;
		font-size: 14px;
        padding: 8px;
		box-sizing: border-box;
        background-color: rgba(214, 211, 211, 0.692);
        border-radius: 5px;
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
    .no_record {
        text-align: center;
        font-size: 12px;
        color: #7e7e7f;
        margin-top: 6px;
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

        font-size: 14px;
        line-height: 46px;
        padding-left: 12px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .left_bar .more_box>div:hover {
        background: #3c3c3c;
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

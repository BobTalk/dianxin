// ================================================================
//  author:文霞
//  createDate: 2017/05/04
//  description: 各个模块公用util
//  ===============================================================
"use strict";
define(['jquery', 'underscore','base64','plupload'],
    function ($, _) {
        var resizeHandlers = [];
        var PublicUTIL = {
            UserObject: {
                user_id: "1",//"1",//用户id
                user_dlm: "",//""//用户登录名
                user_name: "测试用户",//"测试用户",//用户真实姓名
                user_role: "超级管理员",//"超级管理员",//角色值目前为汉字,括号里为角色解释；0无权限，1超级管理员，2教育局人员(教育局管理员),3教官中心人员(教官中心管理员),4校长（学校管理员）,5资料管理员(学校资料上传,量表填写),6教师,7学生,8家长
                server_id: "axyr",//"652ffb6afea946c29ed29eda3dc0b579",// 人员所在集团id
                server_name: "清华大学附属中学",//"清华大学附属中学",// 人员所在集团名称,学校名称/教育局名称等
                user_sex: "",//"0",//  用户性别;
                grade_id: "",//"1",//  年级主键;
                class_id: "",//"1",//  班级主键;
                grade_name: "",//"一年级",//  年级名称;
                class_name: "",//"一班",//  班级名称
                user_img: "",//"http://scs.ganjistatic1.com/gjfs15/M08/06/44/CgEHQVYPQi3GOVq0AADKyBjz9NA161_600-0_6-0.jpg",// 用户头像;
                user_age: "",//"1",//  用户年龄;
                user_type: "",//"1",//  用户类型;0无类型，1老师，2学生，3家长
                user_phone: "",//"1",//  用户电话;
                user_email: "",//"1",//  用户邮件;
                state: "",//"1",//启用状态；0未启用，1启用
                xz: ""//"",//学制：1小学五年制，2小学六年制，3          初中三年制，4初中四年制，5高中,6是完中(初中和高中共存),7幼儿园
            },
            initLayui:function(){
                layui.config({
                    base: '../js/'
                    ,version: ''//'1492579944915'
                }).use('global');

                layui.use(['form','element','layer'], function(){
                    PublicUTIL.layElement = layui.element();
                    PublicUTIL.layForm = layui.form();
                    PublicUTIL.layLayer = layui.layer;
                });
            },
            layerOpen:function(option){
                var newOption=$.extend({
                    type:1,
                    title:'标题'
                    ,content: "",// $('#modal').html(),//tplArr.join(""),//$('#modal'),////'页面内容字符串',
                    //自定义弹出层样式及按钮
                    skin:'data-titleFile',//'layui-layer-molv',//layui-layer-lan layui-layer-molv
                    area: ['800px', '500px'],
                    offset:'100px'//['100px','50px'],//位置偏移量坐标
                    ,btn: ['保存','取消']//['按钮一', '按钮二', '按钮三']
                    ,yes: function(index, layero){//确定按钮回调方法，默认不关闭？！
                    }
                    ,btnAlign: 'c'
                    ,closeBtn:2//关闭按钮的风格
                    ,shade: [0.8, '#393D49']//0
                    ,shadeClose:false//是否点击遮罩关闭
                    ,maxmin:false
                    ,resize:false
                    ,scrollbar:false//屏蔽浏览器滚动条
                    ,move: false,
                    success: function(layero, index){
                    },
                    end:function(){
                    }
                },option);
                layer.open(newOption);
                PublicUTIL.layForm.render();
            },
            layerLoad:function(){
                var layerIndex=layer.load(0, {shade: false});
                return layerIndex;
            },
            message:function(type,contentText,_callback){
                switch(type){
                    case 'success':
                        contentText=contentText||'操作成功';
                        //成功提示:success
                        layer.msg(contentText, {
                            icon: 1,
                            time: 2000
                        });
                        break;
                    case 'fail':
                        contentText=contentText||'操作失败';
                        //失败提示:fail
                        layer.msg(contentText, {
                            icon: 2,
                            time: 2000
                        });
                        break;
                    case 'alert':
                        contentText=contentText||'警告';
                        //警告提示:alert1
                        layer.msg(contentText, {
                            icon: 0,
                            time: 2000
                        });
                        break;
                    case 'alertSure':
                        contentText=contentText||'警告';
                        //警告提示:alert2
                        layer.alert(contentText, {
                            icon: 0,
                            title:false,
                            closeBtn:false
                        });
                        break;
                    case 'confirm':
                        contentText=contentText||'确认操作';
                        //确认操作:confirm
                        layer.confirm(contentText, {icon: 3}, function(index){
                            //do something
                            layer.close(index);
                            if(_callback){
                                _callback();
                            }
                        });
                        break;
                }
            },
            //上传文件
            UploadFile: function (e, callback) {
                var file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) {
                    var fileSize = file.size / 1024 / 1024;
                    if (fileSize > 20) {
                        PublicUTIL.message("alert","上传图片不能大于20MB");
                        return;
                    }

                    var reader = new FileReader();
                    //异步方式，不会影响主线程
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        //清空上传控件的内容
                        //$("#" + uploadInputId).val("");
                        if (callback)
                            callback(this.result, file);
                    }
                }
            },
            initLayuiCheckAll:function(CheckAllEle,UsualEle,ParentClass,callback,callbackCheckedAll){
                var form = PublicUTIL.layForm;
                ParentClass=ParentClass||'.layui-input-block';
                //全选点击事件
                form.on('checkbox('+CheckAllEle+')', function(data){
                    var child=$(this).parents(ParentClass).find('input[lay-filter="'+UsualEle+'"]').not(':disabled');
                    child.each(function(index, item){
                        item.checked = data.elem.checked;
                    });
                    form.render('checkbox');

                    var $this=$(this);
                    if(callbackCheckedAll){
                        callbackCheckedAll($this,data);
                    }
                    //触发全选按钮的点击事件，因为form的事件监听会出现覆盖，所以需要在input上写事件
//                    $('input[lay-filter="'+CheckAllEle+'"]').click();
                });
                //根据勾选内容，确定全选按钮的选择状态
                form.on('checkbox('+UsualEle+')', function(data){
                    var child=$(this).parents(ParentClass).find('input[lay-filter="'+UsualEle+'"]').not(':disabled');
                    var checkboxResult=true;
                    child.each(function(index, item){
                        checkboxResult=checkboxResult&&item.checked;
                    });
                    $(this).parents(ParentClass).find('input[lay-filter="'+CheckAllEle+'"]')[0].checked=checkboxResult;
                    form.render('checkbox');

                    var $this=$(this);
                    if(callback){
                        callback($this,data);
                    }

                    //测试用，触发change事件
//                    $(this).click();
//                    $('input[lay-filter="'+UsualEle+'"]').click();
//                    $('input[lay-filter="'+UsualEle+'"]').change();
                });
            }
        };
        Date.prototype.Format = function (formatStr) {
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];

            str = str.replace(/yyyy|YYYY/, this.getFullYear());
            str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

            str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
            str = str.replace(/M/g, this.getMonth() + 1);

            str = str.replace(/w|W/g, Week[this.getDay()]);

            str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
            str = str.replace(/d|D/g, this.getDate());

            str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
            str = str.replace(/h|H/g, this.getHours());
            str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
            str = str.replace(/m/g, this.getMinutes());

            str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
            str = str.replace(/s|S/g, this.getSeconds());

            return str;
        };
        String.prototype.trim=function() {
            return this.replace(/(^\s*)|(\s*$)/g,'');
        };

        window.PublicUTIL = PublicUTIL;
    }
);
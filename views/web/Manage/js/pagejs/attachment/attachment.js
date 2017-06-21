/**
 * Created by sanghuina on 17/5/12.
 */
define(function (require) {
    "use strict";
    var tpl = require('text!tpl/attachment/attachment.html'),
        template = _.template(tpl), _this,_form,attachJGJson,_spk="",_jsonObject;
    var DataTable = require('dataTable1');
    var myossupload = require('myossupload');
    return Backbone.View.extend({
        className: "layui-main",
        initialize: function () {
            _this = this;
            this.render();
        },
        render: function () {
            this.$el.html(template(this.model));
            return this;
        },
        afterRender: function () {
            _form=PublicUTIL.layForm;
            _jsonObject=JSON.parse(_this.model._jsonObject);
            _spk=_jsonObject.spk;
            attachJGJson={
                "attachment_id":"",
                "attachment_name":"",
                "score_type":"",
                "stand_id":"",
                "submit_num":"",
                "use_role":""
            };
            if(_this.model._opType=="0"){
                /*0预览,1是添加,2修改,3查看,4审批*/
                /*根据id加载附件表单结构*/
                _this.getAttachmentByID();
                $("#btndiv").hide();

            }else if(_this.model._opType=="1"){
                /*根据id加载附件表单结构*/
                _this.getAttachmentByID();

            }else if(_this.model._opType=="2"){
                /*根据id加载附件表单结构*/
                _this.getAttachmentByID(_this.getAttachData);
            }else if(_this.model._opType=="3"){
                /*根据id加载附件表单结构*/
                _this.getAttachmentByID(_this.getAttachData);
                $("#save").hide();
                $("#submit").hide();
            }else{
                /*根据id加载附件表单结构校长的审批状态*/
                _this.getAttachmentByID(_this.getAttachData);
                $("#save").hide();
                $("#submit").hide();
                $("#pass").show();
                $("#reject").show();
            }
            /*加载datatable中数据*/
        },
        events: {
            "click #back":"backFun",
            "click #save":"saveFun",
            "click #submit":"submitFun",
            "click #pass":"passFun",
            "click #reject":"rejectFun"
        },
        getAttachmentByID:function(callback){
           /* 加载附件表单,根据参数调用数据回显方法*/
            var paramjson={"attachment_id":_this.model._currentId};
            PublicAjax.ajaxGet(PublicAjax.ajaxUrl.getAttachmentJGByID, JSON.stringify(paramjson), function (_d) {
                    var jsondata = _d.resultdata;
                    /*附件表单加载*/
                    if(jsondata.length>0){
                        attachJGJson.attachment_id=jsondata[0].attachment_id;
                        attachJGJson.attachment_name=jsondata[0].attachment_name;
                        attachJGJson.score_type=jsondata[0].score_type;
                        attachJGJson.stand_id=jsondata[0].stand_id;
                        attachJGJson.submit_num=jsondata[0].submit_num;
                        attachJGJson.use_role=jsondata[0].use_role;
                        var attachmentterm=JSON.parse(jsondata[0].term);
                        $("#attachname").html(jsondata[0].attachment_name);
                        var formStr="";
                        for(var i=0;i<attachmentterm.length;i++){
                            /*根据附件项加载附件表单*/
                            if(attachmentterm[i].type=="text"){
                                /*文本类型*/
                                formStr="<div class=\"layui-form-item\">"+
                                        "<div class=\"data-input-block\">"+
                                        "<label class=\"data-form-label\">"+attachmentterm[i].name+":</label>"+
                                        "<div class=\"data-upload-box\">"+
                                        "<input type=\"text\"  placeholder=\"请输入"+attachmentterm[i].name+"\" autocomplete=\"off\" class=\"datavalue layui-input dataInput\" datavalue='"+attachmentterm[i].id+"' score='"+attachmentterm[i].score+"' itemtype='text'>"+
                                        "</div>"+
                                        "</div>"+
                                        "</div>";
                                $("#attachform").append(formStr);

                            }else if(attachmentterm[i].type=="select"){
                                /*下拉框选择*/
                                var optionstr="<option value=''>请选择</option>";
                                for(var j=0;j<attachmentterm[i].items.length;j++){
                                    optionstr+="<option value=\""+attachmentterm[i].items[j].value+"\" score='"+attachmentterm[i].items[j].score+"'>"+attachmentterm[i].items[j].text+"</option>";
                                }
                                formStr="<div class=\"layui-form-item\">"+
                                    "<div class=\"data-input-block\">"+
                                    "<label class=\"data-form-label\">"+attachmentterm[i].name+":</label>"+
                                    "<div class=\"data-upload-box\">"+
                                    "<select class='datavalue' datavalue='"+attachmentterm[i].id+"' itemtype='select'>"+optionstr+"</select>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>";
                                $("#attachform").append(formStr);
                            }
                            else if(attachmentterm[i].type=="date"){
                               /*日期类型*/
                                formStr="<div class=\"layui-form-item\">"+
                                    "<div class=\"data-input-block\">"+
                                    "<label class=\"data-form-label\">"+attachmentterm[i].name+":</label>"+
                                    "<div class=\"data-upload-box\">"+
                                    "<input type=\"text\" placeholder=\"请输入"+attachmentterm[i].name+"\" autocomplete=\"off\" lay-verify=\"date\" autocomplete=\"off\" class=\"datavalue layui-input\" onclick=\"layui.laydate({elem: this})\" datavalue='"+attachmentterm[i].id+"' score='"+attachmentterm[i].score+"' itemtype='date'>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>";
                                $("#attachform").append(formStr);
                            }
                            else{
                                /*附件类型*/
                                var fileinput="<input type=\"file\" lay-ext=\""+attachmentterm[i].items[0].filetype+"\" class=\"datavalue data-upload-file\" id='"+attachmentterm[i].id+"file'>";
                                if(attachmentterm[i].items.length>1){
                                    fileinput+="<input type=\"file\" lay-ext=\""+attachmentterm[i].items[0].filetype+"\" class=\"datavalue data-upload-file\" id='"+attachmentterm[i].id+"upload'>";
                                }
                                formStr="<div class=\"layui-form-item\">"+
                                     "<div class=\"data-input-block\">"+
                                    "<label class=\"data-form-label\">"+attachmentterm[i].name+":</label>"+
                                    "<div class=\"data-upload-box\" id='"+attachmentterm[i].id+"div'>"+ fileinput+
                                    "<span class=\"data-upload-icon\"></span>"+
                                    "</div>"+
                                    "</div>"+
                                    "<div class=\"datavalue dataDocBox\" id='"+attachmentterm[i].id+"' name='"+attachmentterm[i].id+"' datavalue='"+attachmentterm[i].id+"' score='"+attachmentterm[i].score+"' itemtype='file'>"+
                                    "</div>"+
                                    "</div>";
                                $("#attachform").append(formStr);
                                var uploadoption2;
                                if(attachmentterm[i].items.length>1){
                                    uploadoption2={
                                        "choosebtn":attachmentterm[i].id+"file",// 选择文件按钮id
                                        "uploadbtn":attachmentterm[i].id+"upload",//确定上传按钮id
                                        "container":attachmentterm[i].id+"div",//选择和确实上传按钮的父节点id
                                        "ossfile":attachmentterm[i].id,//图片存放位置区域id
                                        "g_dirname":attachJGJson.attachment_name+"/",//如果不填，默认是上传到根目录, 注意目录要带/结尾
                                        "g_object_name_type":"random_name",//local_name:上传文件名字保持本地文件名字,random_name:上传文件名字是随机文件名
                                        "type":"file",//head头像模式显示为头像,img图片格式可以是多个图片是个图片列表,file文件格式一个个文件列表带进度条显示
                                        "multiple":false//是否多个文件上传
                                    };
                                }
                                else{
                                    uploadoption2={
                                        "choosebtn":attachmentterm[i].id+"file",// 选择文件按钮id
                                        //"uploadbtn":"postfiles2",//确定上传按钮id
                                        "container":attachmentterm[i].id+"div",//选择和确实上传按钮的父节点id
                                        "ossfile":attachmentterm[i].id,//图片存放位置区域id
                                        "g_dirname":attachJGJson.attachment_name+"/",//如果不填，默认是上传到根目录, 注意目录要带/结尾
                                        "g_object_name_type":"random_name",//local_name:上传文件名字保持本地文件名字,random_name:上传文件名字是随机文件名
                                        "type":"file",//head头像模式显示为头像,img图片格式可以是多个图片是个图片列表,file文件格式一个个文件列表带进度条显示
                                        "multiple":false//是否多个文件上传
                                    };
                                }
                                var uploader2=myossupload.createUploader(uploadoption2);
                                uploader2.init();
                            }
                        }
                        layui.use(['laydate'], function(){
                            //时间控件
                            var laydate = layui.laydate;
                        });
                        _form.render();
                        /*判断状态,查看和审批状态文本不可操作*/
                        if(_this.model._opType=="3"||_this.model._opType=="4"){
                            $("#attachform").find(".data-upload-icon").parent().hide();
                            $("#attachform").find("input").attr("disabled","disabled");
                            $("#attachform").find("select").attr("disabled","disabled");
                        }
                        if (callback) {
                            callback();
                        }
                    }
            });
        },
        backFun:function(){
            location.href="#attachmentList/"+_jsonObject.type;
        },
        saveFun:function(){
            _this.saveData("save");
        },
        saveData:function(action,callback){
            var insertAttachArr=[];
            var updateAttachArr=[];
           /* 0保存；1 提交，2是审批通过，3为驳回*/
            var statev=0;
            if(action=="save"){
                statev=0;
            }else{
                statev=1;
            }
            var attachterm={};
            var resultjson=[];
            var allscore=0;
            $("#attachform").find(".datavalue").each(function(){
                var $this=$(this);
                var type=$this.attr("itemtype");
                if(type=="text"||type=="date"){
                    if($this.val()!=undefined&&$this.val()!=null&&$this.val()!="") {
                        var json = {
                            "termid": $this.attr("datavalue"),
                            "value": $this.val(),
                            "score": $this.attr("score")
                        };
                        if ($this.attr("score") != undefined && $this.attr("score") != null && $this.attr("score") != "") {
                            allscore += parseInt($this.attr("score"));
                        }
                        resultjson.push(json);
                    }
                }else if(type=="select"){
                    if($this.val()!=""){
                        var scorev=$this.find("option:selected").attr("score");
                        var json={
                            "termid":$this.attr("datavalue"),
                            "value":$this.val(),
                            "score":scorev
                        };
                        if(scorev!=undefined&&scorev!=null&&scorev!=""){
                            allscore+=parseInt(scorev);
                        }
                        resultjson.push(json);
                    }

                }else if(type=="file"){
                    var flieresultjson=[];
                    if($this.children().length>0){
                        $this.children().each(function(){
                            var $file=$(this);
                            var filejson={
                                "type":"file",
                                "name":$file.attr("filename"),
                                "value":$file.attr("fileurl"),
                                "size":$file.attr("filesize")
                            };
                            flieresultjson.push(filejson);
                        });
                        var json={
                            "termid":$this.attr("datavalue"),
                            "value":flieresultjson,
                            "score":$this.attr("score")
                        };
                        if($this.attr("score")!=undefined&&$this.attr("score")!=null&&$this.attr("score")!=""){
                            allscore+=parseInt($this.attr("score"));
                        }
                        resultjson.push(json);
                    }
                }
            });
            if(resultjson.length==0){
                PublicUTIL.message("alert","还没任何项填写资料了呢");
                return false;
            }
            if(_spk!=""){
                /*修改状态*/
                attachterm={
                    "attachment_id":attachJGJson.attachment_id,
                    "attachment_name":attachJGJson.attachment_name,
                    "attachment_term_resultjson":JSON.stringify(resultjson),
                    "score":allscore,
                    "score_type":attachJGJson.score_type,
                    "user_id":PublicUTIL.UserObject.user_id,
                    "user_name":PublicUTIL.UserObject.user_name,
                    "school_id":PublicUTIL.UserObject.server_id,
                    "school_name":PublicUTIL.UserObject.server_name,
                    "stand_id":attachJGJson.stand_id,
                    "state":statev,
                    "id":_spk
                };
            }else{
                /*添加状态*/
                attachterm={
                    "attachment_id":attachJGJson.attachment_id,
                    "attachment_name":attachJGJson.attachment_name,
                    "attachment_term_resultjson":JSON.stringify(resultjson),
                    "score":allscore,
                    "score_type":attachJGJson.score_type,
                    "user_id":PublicUTIL.UserObject.user_id,
                    "user_name":PublicUTIL.UserObject.user_name,
                    "school_id":PublicUTIL.UserObject.server_id,
                    "school_name":PublicUTIL.UserObject.server_name,
                    "stand_id":attachJGJson.stand_id,
                    "state":statev
                };
            }
            var paramjson={"saveAttachArr":attachterm};
            PublicAjax.ajaxGet(PublicAjax.ajaxUrl.saveAttachment, JSON.stringify(paramjson), function (_d) {
                   _spk=_d.resultdata[0].insertId;
                    if (callback) {
                        callback();
                    }else{
                        /*提示保存成功*/
                        PublicUTIL.message('success','数据保存成功,如果确定不再更改可以点击"提交"按钮!');
                    }
            });
        },
        submitFun:function(){
            _this.saveData("submit",function(){
                /*提交数据,先保存后*/
                var JSONPARAM={id:_spk,state:1 };
                PublicAjax.ajaxGet(PublicAjax.ajaxUrl.updateAttachmentState,JSON.stringify(JSONPARAM),function(data){
                    PublicUTIL.message("success","资料提交成功");
                    location.href="#attachmentList/"+_jsonObject.type;
                });
            });
        },
        getAttachData:function(){
            var paramjson={"id":_spk};
            PublicAjax.ajaxGet(PublicAjax.ajaxUrl.getAttachmentResultByID, JSON.stringify(paramjson), function (_d) {
                    var jsondata=_d.resultdata;
                    if(jsondata.length>0){
                        var termjson=JSON.parse(jsondata[0].attachment_term_resultjson);
                        for(var j=0;j<termjson.length;j++){
                            var $obj=$("#attachform").find(".datavalue[datavalue='"+termjson[j].termid+"']");
                            if($obj.attr("itemtype")=="file"){
                                var filejson=termjson[j].value;
                                var filedivStr="";
                                for(var m=0;m<filejson.length;m++){
                                    filedivStr+="<div class=\"dataDocTitle\" filename='"+filejson[m].name+"' fileurl='"+filejson[m].value+"' filesize='"+filejson[m].size+"'><i></i>"+
                                    "<span class=\"lookfile data-downloadDoc-icon\"></span>"+
                                    "<a href='"+filejson[m].value+"' class=\"data-preview-icon\"></a>"+filejson[m].name+"</div>";
                                }
                                $obj.html(filedivStr);
                            }else{
                                $obj.val(termjson[j].value);
                            }
                        }
                        _form.render("select");
                    }
            });
        },
        passFun:function(){
            /*审批通过事件*/
            if(attachJGJson.score_type==1){
                /*直接计算得分的,需要修改状态和计算得分到得分结果表中*/
                var JSONPARAM={id:_spk,state:2,stand_id:attachJGJson.stand_id,school_id:PublicUTIL.UserObject.server_id,school_name:PublicUTIL.UserObject.server_name,score:jsonObject.scoreall,score_source:"附件"};
                PublicAjax.ajaxGet(PublicAjax.ajaxUrl.submitAttachmentResult,JSON.stringify(JSONPARAM),function(data){
                    PublicUTIL.message("success","资料审批通过");
                    location.href="#attachmentList/"+_jsonObject.type;
                });
            }else{
                /*审批通过,只修改状态*/
                var JSONPARAM={id:_spk,state:2 };
                PublicAjax.ajaxGet(PublicAjax.ajaxUrl.updateAttachmentState,JSON.stringify(JSONPARAM),function(data){
                    PublicUTIL.message("success","资料审批通过");
                    location.href="#attachmentList/"+_jsonObject.type;
                });
            }
        },
        rejectFun:function(){
            /*审批驳回事件*/
            var JSONPARAM={id:_spk,state:3 };
            PublicAjax.ajaxGet(PublicAjax.ajaxUrl.updateAttachmentState,JSON.stringify(JSONPARAM),function(data){
                PublicUTIL.message("success","资料审批未通过");
                location.href="#attachmentList/"+_jsonObject.type;
            });
        }
    });
});
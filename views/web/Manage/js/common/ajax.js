// ================================================================
//  author:文霞
//  createDate: 2017/05/09
//  description: 各个模块公用ajax
//  ===============================================================
define(['jquery'],
    function ($) {
        var baseUrl="192.168.1.73";//"10.0.0.3:8081";//"10.0.0.5";
        var publicAjax = {
            //ajaxUrl定义
            ajaxUrl: {
                /* =================author:wenxia  begin==========================*/
                //--保存项目（添加或修改项目信息）【已调通，适用post或者get还没定，现在用的get！！！！】
                saveProjectInfo:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/saveProjectInfo",


                //--获取问卷列表接口    【 已调通 】
                getQuestionnaireList:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/getQuestionnaireList",
                //--获取资料（附件）列表  【 已调通，但是需要添加查询参数之后再测试，注意rows 】
                getAttachmentList:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachmentList",
                //--获取量表列表      【 已调通，但是需要添加查询参数之后再测试，注意rows 】
                getscaleList:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scaleController/getscaleList",
                //--获取教管中心列表    【 已调通 】
                getOrganList:"http://"+baseUrl+"/QHPG-BJDF1/bdmanage/baseDataController/getOrganList",
                //--获取学校列表        【 已调通 】
                getSchoolList:"http://"+baseUrl+"/QHPG-BJDF1/bdmanage/baseDataController/getSchoolList",

                //保存任务 【 已调通 】
                saveProjectTaskInfo:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/saveProjectTaskInfo",
                //删除任务 【 已调通 】
                deleteTaskInfo:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/deleteTaskInfo",

                //--获取项目列表【 已调通】
                getProjectList:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/getProjectList",
                //--修改项目状态【 已调通】
                setProjectState:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/setProjectState",
                //--获取项目详情【 已调通】
                getProjectInfo:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/projectController/getProjectInfo",

                //--问卷管理-获取问卷列表
                getQuestionnaireList2:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/getQuestionnaireList2",
                //--问卷管理-上传问卷
                insertQuestionnaire:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/insertQuestionnaire",
                //--问卷管理-删除问卷
                deleteQuestoinnaire:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/deleteQuestoinnaire",
                //--问卷管理-获取问卷详情
                getQuestoinnaireInfo:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/getQuestoinnaireInfo",
                //---问卷管理-导入问卷【 已调通】
                importQuestionnaire:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/questionnaireController/importQuestionnaire",



                /* =================author:wenxia  end============================*/
                /* =================author:shn  begin==========================*/
                /*获取附件结构表数据,共多少个附件表单*/
                getAttachmentJG:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachmentList",
                /*根据结构id获取附件表单结构数据*/
                getAttachmentJGByID:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachmentByID",
                /*附件上传数据保存*/
                saveAttachment:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/saveAttachment",
                /*获取附件数据结果*/
                getAttachmentResultByID:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachmentResultByID",
                /*获取附件上传数据列表*/
                getAttachmentResultList:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachmentResultList",
                /*修改附件结果数据状态*/
                updateAttachmentState:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/updateAttachmentState",
                /*附件结果数据审批*/
                submitAttachmentResult:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/submitAttachmentResult",
                /*对于每年只能上传一次的数据做验证*/
                getAttachResultNums:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/attachmentController/getAttachResultNums",
                /*举报数据列表*/
                getTipoffList:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/getTipoffList",
                /*举报单个信息获取*/
                getTipoffInfo:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/getTipoffInfo",
                /*举报数据保存*/
                saveTipoff:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/saveTipoff",
                /*举报审批*/
                examineTipoff:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/examineTipoff",
                /*举报数据状态修改*/
                updatetipState:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/updatetipState",
                /*举报数据删除*/
                deleteTipoff:"http://"+baseUrl+"/QHPG-BJDF1/client/tipoffController/deleteTipoff",
                /*项目进度列表*/
                projectSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/projectSchedule",
                /*教育局进度*/
                organSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/organSchedule",
               /* 学校进度列表*/
                schoolListSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/schoolListSchedule",
                /*单个学校进度*/
                schoolSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/schoolSchedule",
                /*年级进度*/
                gradeSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/gradeSchedule",
                /*班级进度*/
                classSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/classSchedule",
                /*教师进度*/
                teacherSchedule:"http://"+baseUrl+"/QHPG-BJDF1/pgmanage/scheduleController/teacherSchedule"
                /* =================author:shn  end==========================*/
            },
            //通用post接口
            ajaxPost: function (url, params, _callback) {
//                Pace.restart();
                url+="?_n="+Date.parse(new Date())/1000;
                $.ajax({
                    type: 'post',
                    url: url,
                    data: {
                        JSONPARAM: params
                    },
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    if (data.resultnum === "0000")
                        _callback(data); //模板获取后回调方法
                    else {
                        console.log(JSON.stringify(data));
                    }
                }).fail(
                    function (errMessage) {
//                        PublicUTIL.toastrAlert("warning", "警告", "网络错误");
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //通用get接口
            ajaxGet: function (url, params, _callback) {
//                Pace.restart();
                var layerIndex = PublicUTIL.layerLoad();
                var requsturl = url;
                if (!!params) {
                    requsturl = url + "?JSONPARAM=" + params;
                    requsturl+="&_n="+Date.parse(new Date())/1000;
                }
                else{
                    requsturl+="?_n="+Date.parse(new Date())/1000;
                }
                $.ajax({
                    type: 'get',
                    url: requsturl,
                    data: {},
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    if(layerIndex){
                        layer.close(layerIndex);
                    }
                    if (data.resultnum === "0000") {
                        _callback(data); //模板获取后回调方法
                    }//2000表示数据为空
                    else {
                        PublicUTIL.message("fail","操作失败，请稍后再试");
                        console.log(JSON.stringify(data));
                    }
                }).fail(
                    function (errMessage) {
                        if(layerIndex){
                            layer.close(layerIndex);
                        }
                        PublicUTIL.message("fail","操作失败，请稍后再试");
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //登陆接口（获取基础数据返回值）
            ajaxGetLogin: function (url, params, _callback) {
                Pace.restart();
                var requsturl = url;
                if (!!params) {
                    requsturl = url + "?JSONPARAM=" + params;
                }
                $.ajax({
                    type: 'get',
                    url: requsturl,
                    data: {},
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    _callback(data); //模板获取后回调方法
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //通用接口返回数据为后台返回数据，不管对错都走回调方法
            ajaxFuncTwo: function (url, params, _callback) {
               // Pace.restart();
                var requsturl = url;
                if (!!params) {
                    requsturl = url + "?JSONPARAM=" + params;
                }
                $.ajax({
                    type: 'get',
                    url: requsturl,
                    data: {},
                    cache: false,
                    dataType: 'json'
                }).done(function (data) {
                    _callback(data); //模板获取后回调方法
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //通用接口返回数据为后台返回数据，不管对错都走回调方法,参数名称不固定,根据情况定
            ajaxFuncThree: function (url, params, _callback) {
                Pace.restart();
                var requsturl = url;
                if (!!params) {
                    requsturl = url + "?" + params;
                }
                $.ajax({
                    type: 'get',
                    url: requsturl,
                    data: {},
                    cache: false,
                    dataType: 'json'
                }).done(function (data) {
                    _callback(data); //模板获取后回调方法
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //通用基础数据接口返回数据，入参没有jsonparams,GET方法
            ajaxGetTwo: function (url, params, _callback) {
                Pace.restart();
                $.ajax({
                    type: 'get',
                    url: url + "?" + params,
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    if (data.resultnum === "0000")
                        _callback(data); //模板获取后回调方法
                    else {
                        console.log(JSON.stringify(data));
                    }
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //通用基础数据接口返回数据，入参没有jsonparams,DELETE方法
            ajaxDeleteTwo: function (url, params, _callback) {
                Pace.restart();
                $.ajax({
                    type: 'delete',
                    url: url + "?" + params,
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    if (data.resultnum === "0000")
                        _callback(data); //模板获取后回调方法
                    else {
                        console.log(JSON.stringify(data));
                    }
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //保存或修改接口，基础数据使用
            ajaxSaveOrUpdateTwo: function (url, params, _callback) {
                //Pace.restart();
                $.ajax({
                    type: 'post',
                    url: url,
                    data: {
                        JSONPARAM: params
                    },
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    if (data.resultnum === "0000")
                        _callback(data); //模板获取后回调方法
                    else {
                        console.log(JSON.stringify(data));
                    }
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            },
            //保存或修改接口，基础数据使用, 不管对错都走回调方法
            ajaxSaveOrUpdateThree: function (url, params, _callback) {
                //Pace.restart();
                $.ajax({
                    type: 'post',
                    url: url,
                    data: {
                        JSONPARAM: params
                    },
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded"
                }).done(function (data) {
                    _callback(data); //模板获取后回调方法
                }).fail(
                    function (errMessage) {
                        if (errMessage.responseText == "SESSION_TIMEOUT") {
                            //UTIL.sessionTimeOut();
                        }
                    }
                )
            }
        };

        window.PublicAjax = publicAjax;
//     return publicAjax;
    });
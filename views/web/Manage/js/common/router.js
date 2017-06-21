// ================================================================
//  author:wenxia
//  createDate: 2017/4/26.
//  description: 清华评估 路由定义
//  ===============================================================
define(function (require) {
    "use strict";
    return Backbone.Router.extend({
        routes: {
            /* by 文霞--begin  */
            "": "ChartsSetting",
            //图表设置
            "ChartsSetting": "ChartsSetting",
            //文件上传
            "fileUpload": "fileUpload",
            //列表页
            "dataTable":"dataTable",
            "dataTable1":"dataTable1",
            /*项目下发--demo(1是添加,2编辑,3查看)*/
            "dataNewTask/:type/:projectId":"dataNewTask",
            /*项目列表--demo*/
            "projectList1":"projectList1",

            /*项目列表--正式*/
            "projectList":"projectList",
            /*项目下发--正式(1是添加,2编辑,3查看)*/
            "projectDetail/:type/:projectId":"projectDetail",

            /* 问卷管理 */
            "quesManage":"quesManage",

            /* by 文霞--end  */

            /* by 王燕欣--begin  */

            /*wyx问卷列表--demo*/
            "questionnaireList":"questionnaireList",
            /*wyx问卷--demo*/
            "answerList":"answerList",
            /*wyx学校统计列表--demo*/
            "onEachSchool":"onEachSchool",
            /*wyx校内统计总和--demo*/
            "onSchool":"onSchool",
            /*wyx年级进度--demo*/
            "onGrade":"onGrade",
            /*wyx班级进度--demo*/
            "onClass":"onClass",
            /*wyx--项目问卷列表demo*/
            "bulletedList":"bulletedList",

            /* by 王燕欣--end  */
            /*表单组件*/
            "formAssembly":"formAssembly",
            /*文件上传*/
            "uploadFile":"uploadFile",
            /*by shn --begin*/
            /*附件列表,1为资源管理员上传,2校长,3公示列表*/
            "attachmentList/:type":"attachmentList",
            /*参数分别为操作(0预览,1是添加,2修改,3查看);附件机构id;{"type":1,"spk":""}type1为资源管理员上传,2校长,3公示列表,数据主键*/
            "attachment/:action/:attachmentid/:obj":"attachment",
            /*举报审批列表type为1公示信息,2为教育局的审批列表,3是个人举报列表*/
            "tipoffExamineList/:type":"tipoffExamineList",
            /*1添加,2修改,3查看,4审批;主键id;对象*/
            "tipoffInfo/:action/:spk/:obj":"tipoffInfo",
            /*项目进度列表*/
            "scheduleProject":"scheduleProject",
            /*教育局进度列表*/
            "scheduleBureauEdu/:obj":"scheduleBureauEdu",
            /*学校进度列表*/
            "scheduleSchoolList/:obj":"scheduleSchoolList",
            /*学校进度概括*/
            "scheduleSchoolInfo/:obj":"scheduleSchoolInfo",
            /*学校年级/教师进度*/
            "scheduleInfo/:obj":"scheduleInfo",
            /*学校班级进度*/
            "scheduleDetails/:obj":"scheduleDetails",
            /*by shn --end*/
        },
        goIndex: function (requirePath, operationType, currentId, jsonObject) {
            //菜单栏选中事件
//            PublicUTIL.initMenu();
            require([requirePath], function (view) {
//      		var viewObj=(!currentId)?{model: {_opType:operationType}}:{model: {_opType:operationType,_currentId:currentId}};

                var viewObj = {model: {_opType: operationType, _currentId: currentId, _jsonObject: jsonObject}};
                var _view = new view(viewObj);
                $('#content').html(_view.$el);
                //设置中间内容区域屏幕的高度,中间内容区域层的class必须是page-content
                _view.afterRender();

            });
        },
        /* by 王燕欣--begin  */
        /*wyx问卷dome*/
        answerList:function(){
            this.goIndex("pages/demo/answerList");
        },
        /*wyx问卷列表dome*/
        questionnaireList:function(){
            this.goIndex("pages/demo/questionnaireList");
        },
        /*wyx各学校进度dome*/
        onEachSchool:function(){
            this.goIndex("pages/demo/onEachSchool");
        },
        /*wyx各学校进度dome*/
        onSchool:function(){
            this.goIndex("pages/demo/onSchool");
        },
        /*wyx年级进度dome*/
        onGrade:function(){
            this.goIndex("pages/demo/onGrade");
        },
        /*wyx班级进度dome*/
        onClass:function(){
            this.goIndex("pages/demo/onClass");
        },
        /*wyx项目问卷列表demo*/
        bulletedList:function(){
            this.goIndex("pages/demo/bulletedList");
        },


        /* by 王燕欣--end  */

        /* by 文霞--begin  */
        /*任务下发*/
        dataNewTask:function(type,projectId){
            this.goIndex("pages/demo/dataNewTask",type,projectId);
        },
        projectList1:function(){
            this.goIndex("pages/demo/projectList");
        },
        /*项目列表--正式*/
        projectList:function(){
            this.goIndex("pages/project/projectList");
        },
        /*项目下发--正式(1是添加,2编辑,3查看)*/
        projectDetail:function(type,projectId){
            this.goIndex("pages/project/projectDetail",type,projectId);
        },
        /* 问卷管理 */
        quesManage:function(){
            this.goIndex("pages/quesManage/quesManage");
        },
        //图表设置
        ChartsSetting:function(){
            this.goIndex("pages/demo/ChartsSetting");
        },
        //列表页
        dataTable:function(){
            this.goIndex("pages/demo/dataTable");
        },
        dataTable1:function(){
            this.goIndex("pages/demo/dataTable1");
        },
        //附件上传
        fileUpload:function(){
            this.goIndex("pages/demo/fileUpload");
        },
        /* by 文霞--end  */

        /*文件上传*/
        uploadFile:function(){
            this.goIndex("pages/demo/uploadFile");
        },
        /*表单组件*/
        formAssembly:function(){
            this.goIndex("pages/demo/formAssembly");
        },

        dataStatistics:function(orgId){
            this.goIndex("pages/dataStatistics/dataStatistics",orgId)
        },
        progress:function(operationType, currentId, jsonObject){
            this.goIndex("pages/progress/progess",operationType, currentId, jsonObject);
        },
        /*by shn --begin*/
        attachmentList:function(type){
            this.goIndex("pages/attachment/attachmentList",type);
        },
        attachment:function(action,attachmentid,type){
            this.goIndex("pages/attachment/attachment",action,attachmentid,type);
        },
        tipoffExamineList:function(type){
            this.goIndex("pages/tipoff/tipoffExamineList",type);
        },
        tipoffInfo:function(operationType, currentId, jsonObject){
            this.goIndex("pages/tipoff/tipoffInfo",operationType, currentId, jsonObject);
        },
        scheduleProject:function(jsonObject){
            this.goIndex("pages/schedule/scheduleProject","", "", jsonObject);
        },
        scheduleBureauEdu:function(jsonObject){
            this.goIndex("pages/schedule/scheduleBureauEdu","", "", jsonObject);
        },
        scheduleSchoolList:function(jsonObject){
            this.goIndex("pages/schedule/scheduleSchoolList","", "", jsonObject);
        },
        scheduleSchoolInfo:function(jsonObject){
            this.goIndex("pages/schedule/scheduleSchoolInfo","", "", jsonObject);
        },
        scheduleInfo:function(jsonObject){
            this.goIndex("pages/schedule/scheduleInfo","", "", jsonObject);
        },
        scheduleDetails:function(jsonObject){
            this.goIndex("pages/schedule/scheduleDetails","", "", jsonObject);
        }
        /*by shn --end*/
    })
})
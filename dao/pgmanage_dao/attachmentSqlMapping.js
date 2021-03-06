/*
 2017年5月10日 10:23:58
 byx
 评估管理-附件模块的dao层,sql语句
 * */

var $util = require('../../util/util');
var Attachment = {
    /*附件列表,展现时以父指标id为组展现*/
    getAttachmentList: "SELECT 	attachment_id, attachment_name,stand_type_name,stand_type, submit_num,stand_id,score_type  FROM attachment where use_role=?  order by stand_type;",
   /*根据attachment_id获取附件机构信息*/
    getAttachmentByID:"SELECT * from attachment where attachment_id=?",
    /*附件表单填写结果保存*/
    insertAttachMent: function (item) {
        var sql = "INSERT INTO attachment_result (attachment_id,attachment_name,attachment_term_resultjson,score,score_type,user_id,user_name,school_id,school_name,stand_id,state) "
            + "VALUES ('"
                + item.attachment_id + "', '"
                + item.attachment_name + "', '"
                + item.attachment_term_resultjson + "', '"
                + item.score + "', '"
                + item.score_type + "', '"
                + item.user_id + "', '"
                + item.user_name + "', '"
                + item.school_id + "', '"
                + item.school_name + "', '"
                + item.stand_id + "', '"
                + item.state + "') "
        return sql;
    },
    /*附件表单填写结果修改*/
    updateAttachMent: function (item) {
        var sql= " update attachment_result set "
                +"attachment_id='"+ item.attachment_id + "',"
                + "attachment_name='"+item.attachment_name + "',"
                + "attachment_term_resultjson='"+item.attachment_term_resultjson + "',"
                + "score="+item.score + ","
                + "score_type="+item.score_type + ","
                + "user_id='"+item.user_id + "',"
                + "user_name='"+item.user_name + "',"
                + "school_id='"+item.school_id + "',"
                + "school_name='"+item.school_name + "',"
                + "stand_id='"+item.stand_id + "',"
                + "state="+item.state + "  where id='"+item.id+"';";
        return sql;
    },
    /*附件表单填写结果获取*/
    getAttachmentResultByID:" select * from   attachment_result where id=?",
    /*附件表单填写结果列表获取*/
    getAttachmentResultList: function (type,stand_id,school_id,pagesize,pagenum) {
        var sql = "select * from attachment_result ";
        /*type 1为资源管理员上传,2校长,3公示列表*/
        if (type== "1") {
            /*不取删除状态*/
            sql += " where state!=-1 ";
        }else if(type== "2"){
            /*已提交和审批通过的状态*/
            sql += " where (state=2 or state=1) ";
        }else{
            /*3公示列表只取审批通过的*/
            sql += " where state =2 ";
        }
        if(stand_id!="-1"){
            sql += " and stand_id = '" + stand_id+ "'";
        }
        if(school_id!="-1"){
            sql += " and school_id = '" + school_id+ "'";
        }
        if (type== "1") {
            sql += "ORDER BY create_time DESC  LIMIT " + pagenum + ", " + pagesize ;
        }else if(type== "2"){
            sql += "ORDER BY state asc  LIMIT " + pagenum + ", " + pagesize ;
        }else {
            sql += "ORDER BY examine_time DESC  LIMIT " + pagenum + ", " + pagesize ;
        }
        return sql;
    },
    /*附件表单填写结果列表条数*/
    getAttachmentResultListRows:function (type,stand_id,school_id) {
        var sql = "select count(0) as rows from attachment_result ";
        /*type 1为资源管理员上传,2校长,3公示列表*/
        if (type== "1") {
            /*不取删除状态*/
            sql += " where state!=-1 ";
        }else if(type== "2"){
            /*已提交和审批通过的状态*/
            sql += " where (state=2 or state=1)  ";
        }else{
            /*3公示列表只取审批通过的*/
            sql += " where state =2 ";
        }
        if(stand_id!="-1"){
            sql += " and stand_id = '" + stand_id+ "'";
        }
        if(school_id!="-1"){
            sql += " and school_id = '" + school_id+ "'";
        }
        return sql;
    },
    /*附件表单填写结果状态修改,包括删除,删除状态置为1*/
    updateAttachmentState:"update  attachment_result set examine_time='"+$util.getDateTime()+"', state=? where id=?",
    /*指标得分结果插入*/
    insertScoreResult:"insert into score_result (stand_id,school_id,school_name,score,score_source) values (?,?,?,?,?)",
    /*对于每年只能上传一次的数据做验证*/
    getAttachResultNums:"select count(0) as num from attachment_result where state!=-1 and attachment_id=? and school_id=? and YEAR(create_time)='"+$util.getYear()+"' "
};

module.exports = Attachment;
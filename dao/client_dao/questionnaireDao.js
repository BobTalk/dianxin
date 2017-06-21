/**
 * Created by byx on 17/5/16.
 * 问卷填报模块
 */

var $sql = require('./questionnaireSqlMapping');
var $mysqlUtil = require('../../util/mysqlUtil');

module.exports = {
    /* 问卷填报--客户端 保存用户填报答案
     * byx 2017年5月16日 14:10:57
     * params
     * @user_id
     * @server_id
     * @user_role
     * @project_id
     * @questionnaire_id
     * @content
     * @page_num
     *
     * return answer_id;
     * */
    saveAnswer: function (answerInfo, callback) {
        var sql = $sql.saveAnswer(answerInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    /* 获取问卷答案--客户端
     * byx 2017年5月16日 14:10:57
     * params
     * @user_id
     * @server_id
     * @user_role
     * @project_id
     * @questionnaire_id
     * @content
     * @page_num
     *
     * return answer_id;
     * */
    getQuestionnaireAnswer: function (answerInfo, callback) {
        var sql = $sql.getQuestionnaireAnswer(answerInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    /* //提交问卷--客户端,同时提交问卷各个指标的得分
     * hyq 2017年5月16日 14:10:57
     * params
     * @user_id
     * @server_id
     * @project_id
     * @task_id
     * @questionnaire_id
     *
     * return sub_id;
     * */
    submitQuestionnaire: function (answerInfo, callback) {
        var sqlArr = $sql.submitQuestionnaire(answerInfo);
        $mysqlUtil.queryArrSql(sqlArr, callback);
    },

    /* //学生家长获取问卷列表
     * hyq 2017年5月16日 14:10:57
     * params
     * @user_id
     *
     * return list;
     * */
    getQuestoinnaireList_noLeader: function (userInfo, callback) {
        var sql = $sql.getQuestoinnaireList_noLeader(userInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    },

    /* //校长获取问卷列表
     * hyq 2017年5月16日 14:10:57
     * params
     * @user_id
     *
     * return list;
     * */
    getQuestoinnaireList_schoolLeader: function (userInfo, callback) {
        var sql = $sql.getQuestoinnaireList_schoolLeader(userInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    },

    /* //教育局、教管中心获取问卷列表
     * hyq 2017年5月16日 14:10:57
     * params
     * @user_id
     *
     * return list;
     * */
    getQuestoinnaireList_Leader: function (userInfo, callback) {
        var sql = $sql.getQuestoinnaireList_Leader(userInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    }
};
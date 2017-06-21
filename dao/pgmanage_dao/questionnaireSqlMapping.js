/*
 2017年5月4日 16:40:50
 byx
 评估管理-问卷模块的dao层,sql语句
 * */

var Questionnaire = {
    //获取问卷列表-创建项目
    getQuestionnaireList: function (use_role, use_xueduan_items, pagesize, pagenum) {
        var sql = "SELECT DISTINCT questionnaire_id, questionnaire_name, descript, load_user_id, create_time, use_role ";
        sql += "FROM questionnaire ";
        if (use_xueduan_items != "-1") {
            sql += "  LEFT  JOIN questionnaire_xueduan ON questionnaire.questionnaire_id = questionnaire_xueduan.q_id " +
                "where questionnaire_xueduan.xd_name IN (" + use_xueduan_items + ")";
            if (use_role != '-1') {
                sql += " and questionnaire.use_role = '" + use_role + "'";
            }
        } else if (use_role != '-1') {
            sql += " where use_role = '" + use_role + "'";
        }
        sql += " LIMIT " + pagenum + ", " + pagesize;
        return sql;
    },
    //获取问卷列表-创建项目-行数
    getQuestionnaireListRows: function (use_role, use_xueduan_items) {
        var sql = "SELECT DISTINCT questionnaire_id, count(questionnaire_id) as rows  ";
        sql += "FROM questionnaire ";
        if (use_xueduan_items != "-1") {
            sql += "  LEFT  JOIN questionnaire_xueduan ON questionnaire.questionnaire_id = questionnaire_xueduan.q_id " +
                "where questionnaire_xueduan.xd_name IN (" + use_xueduan_items + ")";
            if (use_role != '-1') {
                sql += " and questionnaire.use_role = '" + use_role + "'";
            }
        } else if (use_role != '-1') {
            sql += " where use_role = '" + use_role + "'";
        }
        return sql;
    },
    //获取问卷列表-问卷管理 by hyq
    getQuestionnaireList2: function (questionnaire_name, use_role, use_xueduan_items, pagesize, pagenum) {
        var q_sql = "SELECT DISTINCT questionnaire.questionnaire_id, questionnaire_name, descript, load_user_id, create_time, use_role,IF(ISNULL(tq.tqnum),0,1) AS is_use  ";
        q_sql += "FROM questionnaire LEFT JOIN (SELECT COUNT(id) tqnum,task_questionnaire.questionnaire_id FROM task_questionnaire GROUP BY task_questionnaire.questionnaire_id) AS tq ON questionnaire.questionnaire_id = tq.questionnaire_id ";
        if (use_xueduan_items != "-1") {
            q_sql += "  LEFT  JOIN questionnaire_xueduan ON questionnaire.questionnaire_id = questionnaire_xueduan.q_id " +
                "where questionnaire_xueduan.xd_name IN (" + use_xueduan_items + ")";
            if (use_role != '-1') {
                q_sql += " and questionnaire.use_role = '" + use_role + "'";
            }
            if (questionnaire_name != "-1") {
                q_sql += " and questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
            }
        } else if (use_role != '-1') {
            q_sql += " where use_role = '" + use_role + "'";
            if (questionnaire_name != "-1") {
                q_sql += " and questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
            }
        } else if (questionnaire_name != "-1") {
            q_sql += " where  questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
        }
        q_sql += " LIMIT " + pagenum + ", " + pagesize;
        return q_sql;
    },
    //获取问卷列表-问卷管理 by byx
    getQuestionnaireXueduan: function (questionnaireItem) {
        var q_sql = "SELECT xd_name FROM questionnaire_xueduan WHERE q_id = '" + questionnaireItem.questionnaire_id + "'";
        return q_sql;
    },
    //获取问卷列表-问卷管理-行数 by hyq
    getQuestionnaireListRows2: function (questionnaire_name, use_role, use_xueduan_items) {
        var sql = "SELECT  count(DISTINCT(questionnaire_id)) as rows  ";
        sql += "FROM questionnaire ";
        if (use_xueduan_items != "-1") {
            sql += "  LEFT  JOIN questionnaire_xueduan ON questionnaire.questionnaire_id = questionnaire_xueduan.q_id " +
                "where questionnaire_xueduan.xd_name IN (" + use_xueduan_items + ")";
            if (use_role != '-1') {
                sql += " and questionnaire.use_role = '" + use_role + "'";
            }
            if (questionnaire_name != "-1") {
                sql += " and questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
            }
        } else if (use_role != '-1') {
            sql += " where use_role = '" + use_role + "'";
            if (questionnaire_name != "-1") {
                sql += " and questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
            }
        } else if (questionnaire_name != "-1") {
            sql += " where  questionnaire.questionnaire_name like '%" + questionnaire_name + "%'";
        }
        return sql;
    },


    //保存问卷信息
    saveQuestionnaire: function (questionnaireInfo) {
        var sqls = [];
        //问卷sql
        var questionnaireSql = "INSERT INTO questionnaire (questionnaire_id, questionnaire_name, descript, load_user_id,  use_role)   ";
        questionnaireSql += "values ('" + questionnaireInfo.questionnaire_id + "', '"
            + questionnaireInfo.questionnaire_name + "', '"
            + questionnaireInfo.descript + "', '"
            + questionnaireInfo.load_user_id + "',  '"
            + questionnaireInfo.use_role + "') ";
        sqls.push(questionnaireSql);
        //问卷参与学段sql
        var arrLength = questionnaireInfo.xueduan_items.length;
        var sqlXueduan = "INSERT INTO questionnaire_xueduan (q_id, xd_name) "
            + "VALUES ";
        questionnaireInfo.xueduan_items.forEach(function (item, index) {
            sqlXueduan += "('"
                + questionnaireInfo.questionnaire_id + "', '"
                + item + "') ";
            if ((index + 1) < arrLength) {
                sqlXueduan += ",";
            }
        })
        sqls.push(sqlXueduan);
        return sqls;
    },

    //保存问卷问题信息
    saveQuestion: function (questionInfo) {
        //问卷sql
        var questionSql = "INSERT INTO questionnaire_question (question_id, questionnaire_id, q_order, q_type, content, stand_id, rule, option_direction, option_order)   ";
        questionSql += "values ('" + questionInfo.question_id + "', '"
            + questionInfo.questionnaire_id + "', '"
            + questionInfo.q_order + "', '"
            + questionInfo.q_type + "',  '"
            + questionInfo.content + "',  '"
            + questionInfo.stand_id + "',  '"
            + questionInfo.rule + "',  '"
            + questionInfo.option_direction + "',  '"
            + questionInfo.option_order + "') ";

        return questionSql;
    },

    //保存问卷选项信息
    saveOption: function (optionInfo) {
        //选项sql
        var optionSql = "INSERT INTO question_options ( option_id, option_content, option_order, option_score, questionnaire_id, question_id)   ";
        optionSql += "values ('" + optionInfo.option_id + "', '"
            + optionInfo.option_content + "', '"
            + optionInfo.option_order + "', '"
            + optionInfo.option_score + "', '"
            + optionInfo.questionnaire_id + "', '"
            + optionInfo.question_id + "') ";

        return optionSql;
    },
    //删除问卷 by hyq
    removeQuestionnaire: function (questionnaire_id) {
        var sqlArr = [];
        var sql = "DELETE from questionnaire where questionnaire_id = '" + questionnaire_id + "';";
        sqlArr.push(sql);
        var sql = "DELETE from questionnaire_xueduan where q_id = '" + questionnaire_id + "';";
        sqlArr.push(sql);
        var sql = "DELETE from questionnaire_question where questionnaire_id = '" + questionnaire_id + "';";
        sqlArr.push(sql);
        return sqlArr;
    },
    //更新问卷 by hyq
    updateQuestionnaire: function (param) {
        var sqlAry = [];
        var sql = "UPDATE questionnaire SET ";
        for (var key in param) {
            if (key != "xueduan_items") {
                if (key != "questionnaire_id") {
                    sql += " " + key + " = " + "'" + param[key] + "',"
                }
            }
        }
        sql = sql.substring(0, sql.lastIndexOf(","));
        sql += " WHERE questionnaire_id=" + "'" + param.questionnaire_id + "';";
        sqlAry.push(sql);
        sql = "DELETE FROM questionnaire_xueduan WHERE q_id= " + "'" + param.questionnaire_id + "';";
        sqlAry.push(sql);
        for (var i = 0; i < param.xueduan_items.length; i++) {
            sql = "INSERT INTO questionnaire_xueduan (q_id,xd_name) VALUE (";
            sql += "'" + param.questionnaire_id + "'," + "'" + param.xueduan_items[i] + "'"
            sql += ");"
            sqlAry.push(sql);
        }
        return sqlAry;
    },
    //获取问卷详情 by  hyq
    getQuestionnaire: function (getQuestionnaireId) {
        var sql = "SELECT * FROM questionnaire  where questionnaire_id=" + "'" + getQuestionnaireId + "';";
        return sql;
    }
};

module.exports = Questionnaire;
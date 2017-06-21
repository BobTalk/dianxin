/**
 * Created by sanghuina on 17/5/9.
 * 举报模块
 */
var $util = require('../../util/util');

var tiooffDao = require('../../dao/client_dao/tipoffDao');

module.exports = {
    //获取举报列表
    getTipoffList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var statev = param.tip_state;//使用对象，无此条件时传空,举报状态
            statev = $util.isNull(statev) ? "-1" : statev;
            var use_role=param.use_role;
            var user_id=param.user_id;
            var service_id=param.service_id;
            var type=param.tip_type;//举报所属分类
            type = $util.isNull(type) ? "-1" : type;
            service_id = $util.isNull(service_id) ? "-1" : service_id;
            // 分页
            var pagesize = param.page_size;
            var pagenum = param.page_num;
            pagenum = (pagenum - 1) * pagesize;
        }
        catch (error) {
            $util.resJSONError(error, res);
            return;
        }

        tiooffDao.getTipoffList(use_role, user_id,service_id,statev,type, pagesize, pagenum, function (err, result) {
            try {
                if (err != null) {
                    $util.resJSONError(err, res);
                    return;
                }
                tiooffDao.getTipoffListRows(use_role, user_id,service_id,statev,type, function (errRows, resultRows) {
                    if (errRows != null) {
                        $util.resJSONError(errRows, res);
                        return;
                    }
                    $util.resJSON.resultnum = $util.resConfig.ok;
                    $util.resJSON.resultdata = result;
                    $util.resJSON.rows = resultRows[0].rows;
                    res.json($util.resJSON);
                });
            }
            catch (error) {
                $util.resJSONError(error, res);
            }
        });
    },
    saveTipoff:function(req, res, next){
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var tipoff_type=param.tipoff_type,stand_id=param.stand_id,iphone=param.iphone,tip_school_name=param.tip_school_name,
                tip_time=param.tip_time,user_id=param.user_id,user_name=param.user_name
                ,school_id=param.school_id,school_name=param.school_name,tip_content=param.tip_content,state=param.state,tipoff_id=param.tipoff_id,score=param.score,tipoff_type_name=param.tipoff_type_name;
            if(tipoff_id==""||tipoff_id=="undefined"||tipoff_id==null){
                //如果是空则走保存,否则走修改
                //连接Dao层,操作数据库
                tiooffDao.addTipoff(tipoff_type,stand_id,iphone,tip_school_name,tip_time,user_id,user_name,school_id,school_name,tip_content,state, score,tipoff_type_name,function (result) {
                    if (result.affectedRows > 0) {
                        res.json({
                            resultnum: $util.resConfig.ok,
                            msg: "举报成功",
                            resultdata: {
                                //返回主键
                                pk: result.insertId
                            }
                        });
                    }
                    else {
                        res.json({
                            resultnum: $util.resConfig.fail,
                            msg: "举报失败",
                            resultdata: {}
                        });
                    }

                });
            }else{
                tiooffDao.updateTipoff(tipoff_type,stand_id,iphone,tip_school_name,tip_time,user_id,user_name,school_id,school_name,tip_content,state,score,tipoff_type_name,tipoff_id, function (result) {
                    if (result.affectedRows > 0) {
                        res.json({
                            resultnum: $util.resConfig.ok,
                            msg: "举报修改成功",
                            resultdata: {}
                        });
                    }
                    else {
                        res.json({
                            resultnum: $util.resConfig.fail,
                            msg: "举报修改失败",
                            resultdata: {}
                        });
                    }

                });
            }
        }
        catch (error) {
            $util.resJSONError(error, res);
            return;
        }

    },
    deleteTipoff:function(req, res, next){
        var param = req.query || req.params;
        param = JSON.parse(param.JSONPARAM);
        var parId = param.tipoff_id;
        //连接Dao层,操作数据库
        tiooffDao.deleteTipoff(parId, function (result) {
            if (result.affectedRows > 0) {
                res.json({
                    resultnum: $util.resConfig.ok,
                    msg: "删除举报成功",
                    resultdata: {}
                });
            }
            else {
                res.json({
                    resultnum: $util.resConfig.fail,
                    msg: "删除举报失败",
                    resultdata: {}
                });
            }

        });
    },
    getTipoffInfo:function(req, res, next){
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var parId = param.tipoff_id;
        }
        catch (error) {
            $util.resJSONError(error, res);
            return;
        }
        //连接Dao层,操作数据库
        tiooffDao.getTipoffInfo(parId, function (err,result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });
    },
    updatetipState:function(req, res, next){
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var state = param.state;
            var tipoff_id=param.tipoff_id;
        }
        catch (error) {
            $util.resJSONError(error, res);
            return;
        }
        //连接Dao层,操作数据库
        tiooffDao.updatetipState(state,tipoff_id, function (err,result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });
    },
    examinetipoff:function(req, res, next){
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var state = param.state;
            var tipoff_id=param.tipoff_id;
            var stand_id=param.stand_id;
            var school_id=param.school_id;
            var school_name=param.school_name;
            var score=param.score;
            var score_source=param.score_source;
        }
        catch (error) {
            $util.resJSONError(error, res);
            return;
        }
        //连接Dao层,操作数据库
        tiooffDao.examinetipoff(state,tipoff_id,stand_id,school_id,school_name,score,score_source, function (err,result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });
    }

};

/*
 2017年5月17日
 hyq
 用户管理模块的service层
 * */
var $util = require('../../util/util');
var teacherDao = require('../../dao/bdmanage_dao/teacherDao');
module.exports = {
    //添加用户
    saveTeacherInfo: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            param.map(function (item) {
                if (item.user_id == "undefined") {
                    $util.resJSONError(error, res);
                    return;
                }
            });
        } catch (e) {
            $util.resJSONError(error, res);
            return;
        }
        teacherDao.saveInfo(param, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = {affectedRows: result.affectedRows};
            res.json($util.resJSON);
        });

    },
    //删除用户
    removeTeacherInfo: function (req, res, next) {

        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
        } catch (e) {
            $util.resJSONError(error, res);
            return;
        }
        teacherDao.removeInfo(param, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = {affectedRows: result.affectedRows};
            res.json($util.resJSON);
        });
    },
    //修改用户
    updataTeacherInfo: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
        } catch (e) {
            $util.resJSONError(error, res);
            return;
        }
        teacherDao.updataInfo(param, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = {affectedRows: result.length};
            res.json($util.resJSON);
        });
    }
};

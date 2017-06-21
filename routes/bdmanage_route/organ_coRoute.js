/*
 2017年5月18日
 hyq
 用户管理模块route层
 * */
var express = require('express');
var router = express.Router();
var organ_coService = require('../../service/bdmanage_service/organ_coService');
//添加用户
router.get("/addBDTaskInfo", function (req, res, next) {
    organ_coService.saveUserInfo(req, res, next);
});
//删除用户
router.get("/removeBDTaskInfo", function (req, res, next) {
    organ_coService.removeUserInfo(req, res, next);
});
//修改用户
router.get("/updataBDTaskInfo", function (req, res, next) {
    organ_coService.updataUserInfo(req, res, next);
});
module.exports = router;
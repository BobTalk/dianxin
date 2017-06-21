/*
 2017年5月10日 10:20:12
 byx
 评估管理-附件模块route层
 * */

var express = require('express');
var router = express.Router();

var attachmentService = require('../../service/pgmanage_service/attachmentService');

 /*获取附件列表*/
router.get('/getAttachmentList', function (req, res, next) {
    attachmentService.getAttachmentList(req, res, next);
});
/*获取附件表单机构*/
router.get('/getAttachmentByID', function (req, res, next) {
    attachmentService.getAttachmentByID(req, res, next);
});
/*附件表单上传结果保存*/
router.get('/saveAttachment', function (req, res, next) {
    attachmentService.saveAttachment(req, res, next);
});

/*附件表单数据回显*/
router.get('/getAttachmentResultByID', function (req, res, next) {
    attachmentService.getAttachmentResultByID(req, res, next);
});
/*获取附件上传数据列表*/
router.get('/getAttachmentResultList', function (req, res, next) {
    attachmentService.getAttachmentResultList(req, res, next);
});
/*修改附件结果数据状态*/
router.get('/updateAttachmentState', function (req, res, next) {
    attachmentService.updateAttachmentState(req, res, next);
});
/*附件结果数据审批*/
router.get('/submitAttachmentResult', function (req, res, next) {
    attachmentService.submitAttachmentResult(req, res, next);
});
/*对于每年只能上传一次的数据做验证*/
router.get('/getAttachResultNums', function (req, res, next) {
    attachmentService.getAttachResultNums(req, res, next);
});
module.exports = router;


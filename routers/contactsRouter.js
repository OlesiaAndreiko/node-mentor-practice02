const express = require("express");

const router = express.Router();

const {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
} = require("../controllers/contactsControllers");

const asyncWrapper = require("../helpers/asyncWrapper");
const validateAddContact = require("../middlewares/postContactMdl");

router.get("/", asyncWrapper(getAllCtrl));

router.post("/", validateAddContact, asyncWrapper(addContactCtrl));

router.delete("/:contactId", asyncWrapper(deleteContactCtrl));

router.put("/:contactId", asyncWrapper(updateContactCtrl));

module.exports = router;

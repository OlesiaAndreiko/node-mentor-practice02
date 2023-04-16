const {
  getAll,
  addContact,
//   deleteContact,
//   updateContact,
} = require("../services/contactsServices");

const getAllCtrl = async (req, res) => {
    const contacts = await getAll();
    res.json(contacts);
};

const addContactCtrl = async (req, res) => {
    const contact =  await addContact(req.body);
    res.status(201).json(contact);
};

const deleteContactCtrl = async (req, res) => {};

const updateContactCtrl = async (req, res) => {};

module.exports = {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
};

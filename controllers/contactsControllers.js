const {
  getAll,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contactsServices");

const getAllCtrl = async (req, res) => {
    const contacts = await getAll();
    res.json(contacts);
};

const addContactCtrl = async (req, res) => {
    const contact =  await addContact(req.body);
    res.status(201).json(contact);
};

const deleteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  await deleteContact(contactId);
  res.status(204).json({
    message: `Contact deleted`,
  });
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { name, number } = req.body;
  const user = await updateContact(contactId, { name, number });
  await res.status(200).json(user);
};

module.exports = {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
};

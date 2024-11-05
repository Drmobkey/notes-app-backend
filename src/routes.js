const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes', // 'path' harus dalam huruf kecil
    handler: addNoteHandler, // Fungsi langsung, bukan objek
  },
  {
    method: 'GET',
    path:'/notes',
    handler: getAllNotesHandler,

  },
  {
    method: 'GET',
    path:'/notes/{id}',
    handler:getNoteByIdHandler,

  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler:editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler:deleteNoteByIdHandler,
  },
];

module.exports = routes;
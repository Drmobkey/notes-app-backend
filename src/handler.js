const { nanoid } = require("nanoid");
const notes = require("./notes");

// Menambahkan catatan baru
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    
    notes.push(newNote);
    
    // Cek apakah catatan berhasil ditambahkan
    const isSuccess = notes.some((note) => note.id === id);
    
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                note: newNote,
            },
        });
        response.code(201); // Mengembalikan status 201 Created
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500); // Mengembalikan status 500 Internal Server Error
    return response;
};

// Mendapatkan semua catatan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// Mendapatkan catatan berdasarkan ID
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.find((n) => n.id === id);

    if (note) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404); // Mengembalikan status 404 Not Found
    return response;
};

// Memperbarui catatan berdasarkan ID
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200); // Mengembalikan status 200 OK
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
    });
    response.code(404); // Mengembalikan status 404 Not Found
    return response;
};

// Menghapus catatan berdasarkan ID
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1); // Menghapus catatan
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200); // Mengembalikan status 200 OK
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan',
    });
    response.code(404); // Mengembalikan status 404 Not Found
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};

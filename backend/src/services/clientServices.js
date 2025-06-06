import { query } from "../db.js";


export const getClients = async () => {
    try {
        const { rows } = await query('SELECT * FROM clientes');
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const createClient = async (client) => {
    const { name, email, job, rate, isactive } = client;

    try {

       const {rows} = await query('INSERT INTO clientes (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, job, rate, isactive]);
       return rows[0];

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateClient = async (client, id) => {
    const { name, email, job, rate, isactive } = client;

    try {

       const {rows} = await query('UPDATE clientes SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *', [name, email, job, rate, isactive, id]);
       return rows[0];

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteClient = async (id) => {
    try {

       const {rows} = await query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
       return rows[0];

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const searchClient = async (searchTerm) => {
    try {
        const {rows} = await query('SELECT * FROM clientes WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1', [`%${searchTerm}%`])
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
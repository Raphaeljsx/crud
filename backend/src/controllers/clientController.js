import * as clientServices from "../services/clientServices.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientServices.getClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching clients' });
    }
};

export const createClient = async (req, res) => {
    try {
        const clients = await clientServices.createClient(req.body);
        res.status(201).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating client' });
    }
};

export const updateClient = async (req, res) => {
    try {
        const clients = await clientServices.updateClient(req.body, req.params.id);
        if(!clients) return res.status(404).json({ error: 'Client not found' });
        res.status(201).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating client' });
    }
};

export const deleteClient = async (req, res) => { 
    try {
        const clients = await clientServices.deleteClient(req.params.id);
        if(!clients) return res.status(404).json({ error: 'Client not found' });
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting client' });
    }
}

export const searchClient = async (req, res) => {
    try {
        const client = await clientServices.searchClient(req.query.q);
        if(!client) return res.status(404).json({ error: 'Client not found' });
        res.status(201).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching client' });
    }
}
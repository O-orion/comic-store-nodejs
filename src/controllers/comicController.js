const comicRepository = require('../repositories/comicRepository');

class ComicController {

    async getAll(req, res) {
        try {
            const comics = await comicRepository.findAll();
            res.status(200).json(comics);
        } catch (error) {
            res.sttaus(400).json({ message: 'Error fetching comics', error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const comic = await comicRepository.findById(id);

            if (!comic) return res.status(404).json({ message: 'Comic not found' });

            res.status(200).json(comic);

        } catch (error) {
            res.status(500).json({ message: 'Error fetching comic', error: error.message });
        }
    }

    async create(req, res) {
        try {
            const comic = await comicRepository.create(req.body);
            resizeTo.status(201).json({ message: 'Comic created successfully', comic })
        } catch (error) {
            res.status(500).json({ message: 'Error creating comic', error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const comic = await comicRepository.update(id, req.body);
            res.status(200).json({ message: 'Comic updated successfully', comic });

        } catch (error) {
            res.status(500).json({ message: 'Error updating comic', error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await comicRepository.delete(id);
            res.status(200).json({ message: 'Comic deleted sucessfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comic', error: error.message });
        }
    }
}

module.exports = new ComicController();

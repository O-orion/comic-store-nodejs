const { Comic } = require('../models');

class ComicRepository {
    async create(comicData) {
        return await Comic.create(comicData);
    }

    async findAll() {
        return await Comic.findAll();
    }

    async findById(id) {
        return await Comic.findByPk(id);
    }

    async update(id, comicData) {
        const comic = await Comic.findByPk(id);

        if (!comic) throw new Error('Comic not found');
        return await comic.update(comicData);

    }

    async delete(id) {
        const comic = await Comic.findByPk(id);
        if(!comic) throw new Error('Comic not found');
        return await comic.destroy();
    }
}

module.exports = new ComicRepository();

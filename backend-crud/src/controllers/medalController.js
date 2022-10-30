const Medal = require('../models/medalModel')
const Category = require('../models/categoryModel')

module.exports = {
    async all(request, response) {
        try {
            const pageAsNumber = Number.parseInt(request.query.page);
            const sizeAsNumber = Number.parseInt(request.query.size);

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let size = 100;
            if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 100) && !(sizeAsNumber < 1)) {
                size = sizeAsNumber;
            }

            const medal = await Medal.findAndCountAll({
                limit: size,
                offset: page * size,
                include: [{
                    model: Category,
                }]

            })
            response.send({
                content: medal.rows,
                totalPages: Math.ceil(medal.count / Number.parseInt(size))
            });
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async oneMedal(request, response) {
        try {
            const id = request.params.id;
            const medal = await Medal.findOne({ where: { id } });

            if (!medal) {
                return response.status(400).json("Medalha não existe... 👾")
            }

            response.status(200).json(medal);
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async create(request, response) {
        try {
            await Medal.create(request.body);
            response.status(200).json("Medalha inserida com sucesso ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async update(request, response) {
        try {
            const { titulo, subtitulo, category_id, descricao, imagem_1, imagem_2 } = request.body;
            const id = request.params.id;

            const medal = await Medal.findOne({ where: { id } });

            if (!medal) {
                return response.status(400).json("Medalha não existe... 👾")
            }

            medal.titulo = titulo;
            medal.subtitulo = subtitulo;
            medal.category_id = category_id;
            medal.descricao = descricao;
            medal.imagem_1 = imagem_1;
            medal.imagem_2 = imagem_2;

            await medal.save();
            response.status(201).json("A Medalha foi atualizada com sucesso... ✅");

        } catch (error) {

        }
    },

    async delete(request, response) {
        try {
            const id = request.params.id;
            const medal = await Medal.destroy({ where: { id } });

            if (!medal) {
                return response.status(400).json("Medalha não existe... 👾")
            }

            response.status(201).json("A Medalha foi excluida com sucesso... ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    }

}
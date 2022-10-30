const Rules = require('../models/rulesModel');
const Medal = require('../models/medalModel');

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

            const rule = await Rules.findAndCountAll({
                limit: size,
                offset: page * size,
                include: [{
                    model: Medal,
                }]

            })
            response.send({
                content: rule.rows,
                totalPages: Math.ceil(rule.count / Number.parseInt(size))
            });
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async oneRules(request, response) {
        try {
            const id = request.params.id;
            const rule = await Rules.findOne({ where: { id } });

            if (!rule) {
                return response.status(400).json("Regra não existe... 👾")
            }

            response.status(200).json(rule);
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async create(request, response) {
        try {
            await Rules.create(request.body);
            response.status(200).json("Regra inserida com sucesso ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async update(request, response) {
        try {
            const { titulo, descricao, medal_id, qtyd } = request.body;
            const id = request.params.id;

            const rule = await Rules.findOne({ where: { id } });

            if (!rule) {
                return response.status(400).json("Regra não existe... 👾")
            }

            rule.titulo = titulo;
            rule.medal_id = medal_id;
            rule.descricao = descricao;
            rule.qtyd = qtyd;
            
            await rule.save();
            response.status(201).json("A Regra foi atualizada com sucesso... ✅");

        } catch (error) {

        }
    },

    async delete(request, response) {
        try {
            const id = request.params.id;
            const rule = await Rules.destroy({ where: { id } });

            if (!rule) {
                return response.status(400).json("Regra não existe... 👾")
            }

            response.status(201).json("A Regra foi excluida com sucesso... ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    }
}
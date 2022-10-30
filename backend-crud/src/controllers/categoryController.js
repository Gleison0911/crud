const { where } = require('sequelize');
const Category = require('../models/categoryModel');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

            const category = await Category.findAndCountAll({
                limit: size,
                offset: page * size,
            })
            response.send({
                content: category.rows,
                totalPages: Math.ceil(category.count / Number.parseInt(size))
            });
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async oneCategory(request, response) {
        try {
            const id = request.params.id;
            const category = await Category.findOne({ where: { id } });

            if (!category) {
                return response.status(400).json("Categoria não existe... 👾")
            }

            response.status(200).json(category);
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async create(request, response) {
        try {
            await Category.create(request.body);
            response.status(200).json("Categoria inserida com sucesso ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async update(request, response) {
        try {
            const { titulo, subtitulo, descricao, imagem } = request.body;
            const id = request.params.id;

            const category = await Category.findOne({ where: { id } });

            if (!category) {
                return response.status(400).json("Categoria não existe... 👾")
            }

            category.titulo = titulo;
            category.subtitulo = subtitulo;
            category.descricao = descricao;
            category.imagem = imagem;

            await category.save();
            response.status(201).json("A Categoria foi atualizada com sucesso... ✅");

        } catch (error) {

        }
    },

    async delete(request, response) {
        try {
            const id = request.params.id;
            const category = await Category.destroy({ where: { id } });

            if (!category) {
                return response.status(400).json("Categoria não existe... 👾")
            }

            response.status(201).json("A Categoria foi excluida com sucesso... ✅");
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async filter(request, response) {
        const { titulo } = request.query;
        
        let data = await Category.findAll({
            where: { titulo: { [Op.like]: '%' + titulo + '%' } }
        })
            .then(category => response.render('category', { category }))
            .catch(error => console.log(error));
        response.send(data)
    }
}
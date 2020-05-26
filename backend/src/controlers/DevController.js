const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

/* Controller tem normalmente as funções 
    index - Mostrar uma lista registros
    show - Mostrar um único registro
    store - Inserir
    update - Atualizar
    destroy - Deletar
*/

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async destroy(request, response) {
        const github_username = request.params.name;

        const user = await Dev.findOne({ github_username });
        if (user) {
            await Dev.deleteOne({ github_username });
            return response.json({ status: true, message: `Usuário ${github_username} excluído com sucesso` });
        } else {
            return response.json({ status: false, message: `Usuário ${github_username} não encontrado` });
        }
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });    
        }
        
        return response.json({dev});
    }
};
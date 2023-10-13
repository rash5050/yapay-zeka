const { MessageActionRow, MessageSelectMenu, EmbedBuilder, IntegrationApplication } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Hercai } = require('hercai');
const herc = new Hercai();


module.exports = {
    data: new SlashCommandBuilder()
        .setName("yapayzeka")
        .setDescription("Yapay zeka ile sohbet edersin")
        .addStringOption(option =>
            option
                .setName("soru")
                .setDescription("Yapay zekaya sorulacak soru.")
                .setRequired(true)

        ),

    run: async (client, interaction) => {
        const soru = interaction.options.getString('soru');
        interaction.deferReply();
        herc.question({ model: "v2", content: soru }).then(response => {

            const replacements = {
                "@User": interaction.user.tag,
                "Herc.ai": "Rash hiper zeka",
				"Hercai": "Rash hiper zeka"
            };

            let modifiedReply = response.reply;
            for (const [search, replace] of Object.entries(replacements)) {
                modifiedReply = modifiedReply.replace(search, replace);
            }

            const embed = new EmbedBuilder()
                .setTitle(`${client.user.username} | Yapay Zeka Sistemi !`)
                .setDescription(`${modifiedReply}`);

            interaction.editReply({ embeds: [embed] });
        })
    },
};

$(() => {
    $.getJSON('//kitsune.fuechschen.org/api/v1.1/stats', d => {
        $('#stats_users').html(d.data.users);
        $('#stats_guilds').html(d.data.guilds);
        $('#stats_channels').html(d.data.channels);
        $('#stats_mpm').html(d.data.messages);
    });
});
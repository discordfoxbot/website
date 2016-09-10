$(function () {
    $.getJSON('//foxbot.fuechschen.org/api/v1/stats', function (d) {
        $('#stats_users').html(d.data.u);
        $('#stats_guilds').html(d.data.g);
        $('#stats_channels').html(d.data.c);
        $('#stats_mpm').html(d.data.m);
    });
});
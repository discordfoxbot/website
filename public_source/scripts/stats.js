$(() => {
    $.getJSON('/cors-proxy/datadog/mpm', d => {
        $('#stats_mpm').html(Math.round(d.value));
    });
    $.getJSON('/cors-proxy/datadog/guilds',d=>{
        $('#stats_guilds').html(Math.round(d.value));
    });
    $.getJSON('/cors-proxy/datadog/users',d=>{
        $('#stats_users').html(Math.round(d.value));
    });
});
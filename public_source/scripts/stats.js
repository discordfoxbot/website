$(() => {
    $.getJSON('https://app.datadoghq.com/series/query_value_embed?q=per_minute(avg%3Akitsune.bot.messages%7B*%7D)&from=1491223436646&to=1491227036646&aggregator=avg&token=266b0e64c28222f29547ce10d3cc7c166ce3b6938e2831096390b5e83d1d5d32', d => {
        $('#stats_mpm').html(Math.round(d.value));
    });
    $.getJSON('https://app.datadoghq.com/series/query_value_embed?q=avg%3Akitsune.bot.guilds%7B*%7D&from=1491223721915&to=1491227321915&aggregator=avg&token=01e21fd6c8c69b1c40fa64ae66a701a7039cf80096d9aeb99a3448ba6beb7044',d=>{
        $('#stats_guilds').html(d.value);
    });
    $.getJSON('ttps://app.datadoghq.com/series/query_value_embed?q=avg%3Akitsune.bot.users%7B*%7D&from=1491223820359&to=1491227420359&aggregator=avg&token=18016733827d73a796a0dced1f9aa7aa39e48489f05bba616f5425be17958935',d=>{
        $('#stats_users').html(d.value);
    });
    $.getJSON('\/\/todo',d=>{
        $('#stats_channels').html(d.value);
    });
});
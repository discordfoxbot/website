$(()=> {
    var id = $($('meta').toArray().filter((element)=> {
        return $(element).attr('name') === 'log_id'
    })).attr('content');
    if (id) {
        $.ajax({
            dataType: 'json',
            url: `/api/v1/chatlogs/${id}`,
            success: (req, status, xhr)=> {
                if (xhr.status === 200) {
                    $('#guild_name').html(req.data.guild.name);
                    $('#channel_name').html(req.data.channel.name);
                    $('#user_name').html(req.data.user.username);
                    $('#time').html(req.data.time);
                    $('#log_content').html(req.data.messages.map(message=>`<tr><td>${message.user.username}</td><td>${message.content}</td><td>${message.timestamp}</td></tr>`));
                } else {
                    alert('The requested chatlog could not be found!');
                }
            },
            statusCode: {
                404: ()=> {
                    $('#guild_name').html('Not found...');
                    $('#channel_name').html('Not found...');
                    $('#user_name').html('Not found...');
                    $('#time').html('Not found...');
                    $('#chatlog_table').remove();
                    setTimeout(()=>{if (window.confirm('The requested chatlog wasn\'t found.'))location = '/chatlogs';},1000)
                }
            }
        })
    }
});
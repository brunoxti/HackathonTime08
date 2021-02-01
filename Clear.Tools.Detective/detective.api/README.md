$(".bt_menu_left li a").map((i, v) => {
     const line = `
{
    description: '${$(".bt_menu_top.active").text()} - ${$(v).text()}',
    texts: ['Clear Intranet', '${$(".bt_menu_top.active").text()} - ${$(v).text()}', 'Passou'],
    commands: [{ url: "http://hml.clear.com.br${$(v).attr('href')}", isCode: false }]
},`;
    return line;
}).toArray().reduce((a,c) => a + '\n' + c, '\n\n')
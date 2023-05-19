$('#btn').click(function () {
    $.ajax({
        url: "js/data.json",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            createDOM(data.data)
        }
    })
})

function createDOM(data) {
    let str = '';
    data.forEach((i, index) => {
        str += `
        <tr>
            <td>${i.sNo}</td>
            <td>${i.name}</td>
            <td>${i.sex===1?'男':'女'}</td>
            <td>${i.email}</td>
            <td>${i.birth}</td>
            <td>${i.phone}</td>
            <td>${i.address}</td>
            <td>
            <button>编辑</button>
            <button>删除</button>
            </td>
        </tr>
        `
        $('#table-body').html(str);
    });
}
// 拦截ajax请求，拦截后返回的数据
Mock.mock('js/data.json', {
    "status": "success",
    "msg": "查询成功",
    "data|6-10":[
        {
            "id|+1": 1,
            "name": "@cname",
            "birth": "@date",
            "sex|0-1": 1,
            "sNo|+1": 11000,
            "email": "@EMAIL",
            "phone": "@NATURAL(13000000000,19900000000)",
            "address": "@county(true) @ctitle(5,8)",
            "appkey": "@string(4,6)_@date(T)",
            "ctime": '@date(T)',
            "utime": '@date(T)'
        }
    ]

})

Mock.setup({
    timeout:1500
})
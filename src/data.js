export default {
    users: {
        manager: {
            "admin": {
                password: "admin",
            }
        },
        commonUsers: {
            "jbx": {
                password: "jbx123",
                auth: []
            }
        }
    },
    nav: [
        {
            title: '权限服务',
            path: '/auth',
            children: []
        },
        {
            title: '数据服务',
            children: [
                { title: '上传数据', path: '/data-upload'},
                { title: '数据列表', path: '/data-list' }
            ]
        }
    ],
    spaceData: [
        {
            spaceName: "通道一",
        },
        {
            spaceName: "通道二",
        }
    ]
}
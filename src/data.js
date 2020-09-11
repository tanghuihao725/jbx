import auth from '@/data/auth.js'
import dataList from '@/data/dataList.js'

export default {
    users: {
        manager: {
            "admin": {
                password: "admin",
            }
        },
        commonUsers: {
            "jbx": {
                password: "jbx",
                auth: [[1,2,3], [11]],
                applyingAuth: [[9,8], [12]],
            },
            "13301683633": {
                password: "mipiacenon",
                auth: [[4,6,7], [12]],
                applyingAuth: [[3,2], [11]],
            },
        }
    },
    nav: [
        {
            title: '权限服务',
            path: '/system/auth',
            showType: 'common',
            children: []
        },
        {
            title: '数据服务',
            showType: 'common',
            children: [
                { title: '上传数据', path: '/system/data-upload'},
                { title: '数据列表', path: '/system/data-list' }
            ]
        },
        {
            title: '权限管理',
            path: '/system/auth-manager',
            showType: 'manager',
            children: []
        },
    ],
    spaceData: [
        {
            spaceName: "通道一",
            auth: auth[0],
            dataList: dataList[0],
        },
        {
            spaceName: "通道二",
            auth: auth[1],
            dataList: dataList[1],
        }
    ]
}
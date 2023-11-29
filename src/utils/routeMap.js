const routes = [{
        path: '/',
        redirect: '/home'
    },
    // {
    //     path: "*",
    //     redirect: "/404",
    //     hidden: true
    // },
]
const routesName = []
const viewsContext = require.context('@/views', true, /\.vue$/)
console.log(viewsContext, 'viewsContext');

viewsContext.keys().forEach(view => {
    // console.log(view, 'view')
    const viewName = view.replace(/^.+\/([^/]+)\.vue$/, '$1')
    // console.log(viewName, 'viewName')
    const route = {
        path: `/${viewName.toLowerCase()}`,
        name: viewName,
        hidden: false,
        component: () => import(`@/views/${viewName}.vue`)
    }
    if (viewName === 'Notfound') {
        route.hidden = true
    }

    routesName.push(viewName)
    routes.push(route)
})

export {
    routes,
    routesName
}
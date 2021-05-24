import { Button,Layout,Col,Row,Avatar,Dropdown,Menu,Form,Input,Spin } from 'ant-design-vue';
//  按需加载 ant-design-vue 组件
const components=[
    Button,Layout,Col,Row,Avatar,Dropdown,Menu,Form,Input,Spin
]
export  function setupAntd (app){
    components.forEach(component=>{
        app.use(component)
    })
}

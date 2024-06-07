/*
     Archivo de barril - Contiene los componentes del layout principal y recibe los datos de otros componentes 
     creados para renderizarlos en nuestro content sin necesidad de repetir código

*/
import {useNavigate } from 'react-router-dom';
import React, {useState}from 'react';
import {Layout, Menu, Row, Col,Button} from 'antd'
import './App.css';
import Movies from "./Movies"


import {UserOutlined} from '@ant-design/icons';






const { Footer, Sider,Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
 
  getItem('User', '1', <UserOutlined />),

];

const App = () => {

  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login', {
        replace: true
    });
  }


  return (
    <>
   
    
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
     
      <Content
          style={{
            margin: '0 16px',
            width: "auto"
          }}
        >
 <br></br>
       <div  className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
         
                      <Button  
                      size="large" 
                      key="1" 
                      type="primary" 
                      style={{ boxShadow: "0px 0px 15px  gray", padding:"25px"}}
                      className="nav-item nav-link btn"
                      onClick={ onLogout }>

                        Log Out

                      </Button>
             
        </div>

      <Movies/>

      </Content>


      <Layout>
        
      
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Mayra G Arias López
        </Footer>
      </Layout>
    </Layout>

    </>
  );
};
export default App;
import {useNavigate } from 'react-router-dom';
import React from 'react';
import { Form, Input, Layout, Row, Col, Divider} from "antd";
import { UserOutlined, LockOutlined} from "@ant-design/icons";
import './Login.css'

const { Content } = Layout;

const Login = () => {

  const navigate = useNavigate();

  const onLogIn = () => {
    navigate('/movies', {
        replace: true
    });
  }

  return (
    <>
    <Layout
      style={{
        minHeight: '100vh',
        overflow: "hidden"
      }}
    >
      <div className="background">
      </div>
      <br /><br /><br /><br />
      <Row>
        <Col span={12} offset={4}>
          <Content
            style={{
              maxWidth: "360px",
            }}
          >
          
            <Divider />
            <div className="site-layout-content">
              {" "}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <b><font size="20" style={{ color: 'black' }}>Login</font></b>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="user@example.com"
                    autoComplete="off"
                   
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <b><font size="5" style={{ color: 'rgb(39, 54, 71)', }}>Password</font></b>
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    //type="password"
                    placeholder="123456"
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item>
                  <center>
                    <button className="button button1"  onClick={ onLogIn }>
                     Login
                    </button>
                  </center>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Col>
      </Row>
    </Layout>
  </>
  )
}

export default Login
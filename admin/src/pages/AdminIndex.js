import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  PieChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddArticle from "./AddArticle";

const { Header, Content, Footer, Sider } = Layout;

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    {
      label: "工作台",
      key: 1,
      icon: <PieChartOutlined />,
    },
    {
      label: "添加文章",
      key: 2,
      icon: <DesktopOutlined />,
    },
    {
      label: "文章管理",
      key: 3,
      icon: <UserOutlined />,
      children: [
        {
          label: "添加文章",
          key: 3.1,
        },
        {
          label: "文章列表",
          key: 3.2,
        },
      ],
    },
    {
      label: "留言管理",
      key: 4,
      icon: <FileTextOutlined />,
    },
  ];
  const breadCrumbItems = [{ title: "后台管理" }, { title: "工作台" }];
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadCrumbItems} />
          <div
            style={{ padding: 24, background: "#fff", minHeight: 360 }}
          ></div>
        </Content>
        <Footer style={{ textAlign: "center" }}>www.baidu.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;

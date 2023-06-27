import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  PieChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import {
  BrowserRouter as Router1,
  Route,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Login from "./Login";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

const { Header, Content, Footer, Sider } = Layout;

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {
      label: "工作台",
      key: 1,
      icon: <PieChartOutlined />,
    },
    {
      label: "文章管理",
      key: 3,
      icon: <UserOutlined />,
      children: [
        {
          label: "添加文章",
          value: "addArticle",
          key: "addArticle",
        },
        {
          label: "文章列表",
          value: "list",
          key: "listArticle",
        },
      ],
    },
  ];
  const breadCrumbItems = [{ title: "后台管理" }, { title: "工作台" }];
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleClickArticle = (e) => {
    if (e.key === "addArticle") {
      navigate("add");
    }
    if (e.key === "listArticle") {
      navigate("/index/list");
    }
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
          onClick={handleClickArticle}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadCrumbItems} />
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>www.baidu.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;

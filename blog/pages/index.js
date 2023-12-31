import React, { useState } from "react";
import Head from "next/head";
import { Row, Col, List, Icon, Breadcrumb } from "antd";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import axios from "axios";
import Link from "next/link";
import "../static/style/pages/index.css";
import servicePath from "./api/apiUrl";
import "highlight.js/styles/monokai-sublime.css";
import { formatMarkDown } from "../utils/formatMarkDown";

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item>
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" />
                      {item.addTime}
                    </span>
                    <span>
                      <Icon type="folder" /> {item.typeName}
                    </span>
                    <span>
                      <Icon type="fire" /> {item.view_count}
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkDown(item.introduce),
                    }}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  );
};
Home.getInitialProps = async () => {
  try {
    const res = await axios(servicePath.getArticleList);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default Home;

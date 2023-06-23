import React from "react";
import Head from "next/head";
import { Row, Col, Affix, Icon, Breadcrumb } from "antd";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavList from "../components/NavList";
import servicePath from "./api/apiUrl";
import "highlight.js/styles/monokai-sublime.css";
import "../static/style/pages/detailed.css";
import { formatMarkDown } from "../utils/formatMarkDown";

const Detailed = (props) => {
  const { title, article_content, addTime, view_count, typeName } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
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

                <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{title}</div>
              <div className="list-icon center">
                <span>
                  <Icon type="calendar" /> {addTime}
                </span>
                <span>
                  <Icon type="folder" /> {typeName}
                </span>
                <span>
                  <Icon type="fire" /> {view_count}
                </span>
              </div>
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkDown(article_content),
                }}
              ></div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="toc-title">文章目录</div>
              <NavList content={article_content} />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

Detailed.getInitialProps = async (context) => {
  const { id } = context.query;
  try {
    const res = await axios(servicePath.getArticleById + id);
    return res.data.data[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default Detailed;

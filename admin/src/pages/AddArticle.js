import React, { useState, useEffect } from "react";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import marked from "marked";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import hljs from "highlight.js";

const { Option } = Select;
const { TextArea } = Input;
dayjs.extend(weekday);
dayjs.extend(localeData);

function AddArticle() {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑..."); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [publicDate, setPublicDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("请选择类型"); //选择的文章类别

  const navigate = useNavigate();
  //获得文章ID
  const { id } = useParams();

  useEffect(() => {
    getTypeInfo();
    if (id) {
      setArticleId(id);
      getArticleById(id);
    }
  }, []);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    const html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    const html = marked(e.target.value);
    setIntroducehtml(html);
  };
  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      const { data, code } = res.data;
      if (code === 403) {
        localStorage.removeItem("openId");
        navigate.push("/");
      } else {
        setTypeInfo(data);
      }
    });
  };
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
      //setPublicDate(res.data.data[0].addTime);
    });
  };

  const selectTypeHandler = (value) => {
    setSelectType(value);
  };

  //保存文章的方法
  const saveArticle = () => {
    //markedContent(); //先进行转换

    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    let dataProps = {}; //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success("文章发表成功");
          navigate("/index/list");
        } else {
          message.error("文章发表失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isScuccess) {
          message.success("文章修改成功");
          navigate("/index/list");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                size="large"
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                value={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={36}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>

            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              &nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                {articleId ? "修改文章" : "发布文章"}
              </Button>
              <br />
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  defaultValue={dayjs(showDate)}
                  onChange={(date, dateString) => {
                    return setShowDate(dateString);
                  }}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={12}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml,
                }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;

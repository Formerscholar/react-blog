import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from './components/Header'
import Author from './components/Author'
import Advert from './components/Advert'
import Footer from './components/Footer'
import axios from 'axios'
import servivePath from '../network/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import {
  CalendarOutlined,
  FolderAddOutlined,
  FireOutlined,
} from '@ant-design/icons'

const list = (lists) => {
  const [myList, setMylist] = useState(lists.data)
  useEffect(() => {
    setMylist(lists.data)
  })
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
  })
  return (
    <div>
      <Head>
        <title>首页</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>视频教程</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: '/detailed', query: { id: item.id } }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined />
                    {item.addTime}
                  </span>
                  <span>
                    <FolderAddOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FireOutlined />
                    {item.view_count}人
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

list.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servivePath.getListById + id).then((res) => {
      console.log(res.data)
      resolve(res.data)
    })
  })
  return await promise
}

export default list

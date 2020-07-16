import React, { useState, useEffect } from 'react'
import '../style/components/header.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../../network/apiUrl'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        console.log(res.data.data)
        return res.data.data
      })
      setNavArray(result)
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">理查德</span>
          <span className="header-txt">专注前端开发,向往美好生活世界。</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined twoToneColor="#1e90ff" />
              首页
            </Menu.Item>
            {navArray.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  <HomeOutlined twoToneColor="#1e90ff" />
                  {item.typeName}
                </Menu.Item>
              )
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header

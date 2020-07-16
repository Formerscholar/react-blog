import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../style/components/author.css'
export default function Author() {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar
          size={100}
          src="http://blogimages.jspang.com/blogtouxiang1.jpg"
        />
      </div>
      <div className="author-introduction">
        专注于WEB和移动前端开发
        <Divider>社交账号</Divider>
        <Avatar size={28} className="account" icon={<GithubOutlined />} />
        <Avatar size={28} className="account" icon={<QqOutlined />} />
        <Avatar size={28} className="account" icon={<WechatOutlined />} />
      </div>
    </div>
  )
}

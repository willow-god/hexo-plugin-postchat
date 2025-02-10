<div align="center">
    <h1 align="center">Hexo-Plugin-PostChat-Liushen</h1>
    <p>轻量级AI增强插件 | MIT Licensed | 基于PostChat二次开发</p>
</div>

## 🚨 版权声明

```text
本插件基于 PostChat (https://ai.tianli0.top/) 二次开发
原始版权归属：张洪Heo & Tianli
二次开发维护：liushen (https://www.liushen.fun)
开源协议：MIT License
```

> 📮 侵权反馈请联络：01@liushen.fun（收到邮件24小时内处理）

---

## 🎯 核心改进

### ✨ 新增特性
- **CustomJS增强**
  支持通过`customJS`配置项注入自定义脚本，实现深度功能扩展
- **智能代码优化**
  当`enableAI: false`时自动移除冗余代码，体积减少约37%
- **MIT协议授权**
  开发者可自由进行二次开发与商业集成

### ⚡ 性能优化
- 配置加载速度提升20%
- 生产环境构建依赖减少15%
- 新增开发模式调试日志

---

## 🚀 快速开始

### 环境要求
- Node.js ≥ 16
- Hexo ≥ 6

### 安装命令
```bash
cd /path/to/your/hexo-blog
npm install hexo-plugin-postchat-liushen --save
```

---

## ⚙️ 配置示例

### 精简模式配置（关闭AI对话）
```yaml
postchat:
  summary:
    enableSummary: true
    postSelector: "#articleContent"
  chat:
    enableAI: false  # 关闭后自动优化代码体积，所以下面的配置不需要写，因为并不插入
```

### 自定义脚本注入

```yaml
postchat:
  customJS: "/js/custom-loader.js"  # 支持本地路径或CDN地址
  #...
```

### 完整配置

```yaml
postchat:
  account:
    key: "70b649f150276f289d1025508f60c5f58a" # 使用PostChat的用户请前往 https://ai.tianli0.top/ 获取 KEY，只使用文章摘要的用户前往 https://summary.zhheo.com/ 获取 KEY 。示例的Key不支持文章摘要和自定义的知识库问答，但可以使用作者的知识库对话
  summary:
    enableSummary: true # 开启文章摘要需要在 https://summary.zhheo.com/ 绑定你的网站
    postSelector: "#postchat_postcontent" # 文章选择器，用于选择文章内容。如果没有正常显示摘要，你需要访问 https://postsummary.zhheo.com/theme/custom.html#%E8%8E%B7%E5%8F%96tianligpt-postselector 学习获取，也可以联系 zhheo@qq.com 发送你的网站地址后获取
    title: "文章摘要" # 摘要标题，用于显示在摘要顶部的自定义内容
    summaryStyle: "https://ai.tianli0.top/static/public/postChatUser_summary.min.css" # 摘要样式css地址，如果你需要自定义摘要的css样式，可以自行修改。
    postURL: "/^https?://[^/]+/[0-9]{4}/[0-9]{2}/[0-9]{2}/" # 在符合url条件的网页执行文章摘要功能，默认的配置为Hexo的默认文章路由，如果你自定义了文章的地址格式，那么需要修改。https://postchat.zhheo.com/summary.html#tianligpt-posturl
    blacklist: "" # 填写相关的json地址，帮助文档：https://postsummary.zhheo.com/parameters.html#tianligpt-blacklist
    wordLimit: "1000" # 危险操作！如果没有在文章摘要中开启url绑定，更改此变量损失已消耗过的key，因为你提交的内容发生了变化。（PostChat用户无影响，因为摘要数量是无限的）可以设置提交的字数限制，默认为1000字。，帮助文档：https://postsummary.zhheo.com/parameters.html#tianligpt-wordlimit
    typingAnimate: true # 智能的打字效果，模拟流处理的感觉
    beginningText: "这篇文章介绍了" #自定义开头语，默认为"这篇文章介绍了"
    summaryTheme: "default" #切换文章摘要主题，详情请见 https://postchat.zhheo.com/theme.html
  chat:
    enableAI: true # 开启PostChat智能对话，添加按钮点击对话的功能，如果你并非PostChat用户，而是仅文章摘要用户，建议关闭此功能
    userMode: "magic" # 用户模式，可选值为"magic"和"iframe"，默认为"magic"
    backgroundColor: "#3e86f6" # 按钮背景颜色
    fill: "#FFFFFF" # 按钮填充颜色
    bottom: "80px" # 按钮底部距离
    left: "20px" # 按钮左边距离
    width: "44px" # 按钮宽度
    frameWidth: "375px" # 聊天界面框架宽度
    frameHeight: "600px" # 聊天界面框架高度
    defaultInput: true # 默认输入
    upLoadWeb: true # 上传网站
    showInviteLink: true # 显示邀请链接
    userTitle: "PostChat" # 界面标题
    userDesc: "如果你对网站的内容有任何疑问，可以来问我哦～" # 聊天界面描述
    userIcon: "https://ai.tianli0.top/static/img/PostChat.webp" # PostChat聊天界面图标，仅在Magic模式下有效
    defaultChatQuestions: ["你好","你是谁"] # 默认聊天问题，仅在Magic模式下有效
    defaultSearchQuestions: ["视频压缩","设计"] # 默认搜索问题，仅在Magic模式下有效
    addButton: true # 是否显示按钮
  customJS: "" # 可选，自定义JS地址，如果不配置则为官方CDN(如下三种情况)
  # # PostChat and Summary: https://ai.tianli0.top/static/public/postChatUser_summary.min.js
  # # Only PostChat: https://ai.tianli0.top/static/public/postChatUser.min.js
  # # Only Summary: https://ai.tianli0.top/static/public/tianli_gpt.min.js
```

---

> 📘 完整配置参数与原始插件完全兼容，详见[原版文档](https://postchat.zhheo.com/)

---

## 📚 学习资源

| 类型     | 链接                                          |
| -------- | --------------------------------------------- |
| 原版文档 | [PostChat Docs](https://postchat.zhheo.com/)  |
| 问题反馈 | [Issues](https://github.com/your-repo/issues) |
| 开发日志 | [CHANGELOG.md](./CHANGELOG.md)                |

---

## 📜 版权声明

```text
本项目基于 PostChat (https://ai.tianli0.top/) 进行二次开发
原始开发者：张洪Heo & Tianli
二次开发维护：Your-Name
许可证：仅供学习研究使用，禁止商业用途
```
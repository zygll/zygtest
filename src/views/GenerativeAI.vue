<template>
  <div id="my-markdown" class="markdown-body">
    <div class="chat-container">
      <div class="message-list">
        <div v-for="(item, index) in messageList" :key="index">
          <div class="message" :class="item.avatar == 'ai' ? 'other' : 'self'">
            <div
              class="avatar"
              v-show="item.avatar == 'ai'"
              style="background-color: #bbb"
            ></div>
            <div class="text">
              <vue-markdown
                :source="item.text"
                highlight
                linkify
              ></vue-markdown>
            </div>
          </div>
        </div>
      </div>
      <div class="input-area">
        <input type="text" placeholder="Type a message..." v-model="text" />
        <button type="button" @click="run(text)" :disabled="vLoading">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import "github-markdown-css/github-markdown.css";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-table-of-contents";
import markdownItEmoji from "markdown-it-emoji";
import markdownItKatex from "markdown-it-katex";
import { GoogleGenerativeAI } from "@google/generative-ai";
export default {
  name: "Ai",
  components: {
    "vue-markdown": VueMarkdown,
  },
  data() {
    return {
      messageList: [
        // {
        //   avatar: "ai",
        //   text: "你好！很高兴为你服务。请问有什么可以帮助你的吗？",
        // },
        // {
        //   avatar: "person",
        //   text: "你好，我想买一件衣服。",
        // },
      ],
      plugins: [
        markdownItAnchor,
        [markdownItToc, { includeLevel: [2, 3] }],
        markdownItEmoji,
        markdownItKatex,
      ],
      API_KEY: "AIzaSyChnFdUf3jQUmxzTCCaiz3XgFvM8PW1sNo",
      genAI: null,
      model: null,
      vLoading: false,
      text: "",
      html: "",
    };
  },
  computed: {},
  created() {
    this.initAi();
  },
  methods: {
    scrollTop(){
        this.$nextTick(() => {
        const container = this.$el.querySelector(".message-list");
        container.scrollTop = container.scrollHeight;
      });
    },
    initAi() {
      this.genAI = new GoogleGenerativeAI(this.API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      this.run("你好", 1);
    },
    async run(prompt, type) {
      if (!type) {
        if (!prompt) {
          this.$message({
            message: "请输入内容",
            type: "warning",
          });
          return;
        }
        this.messageList.push({
          avatar: "person",
          text: prompt,
        });
        this.scrollTop()

      }

      this.vLoading = true;
      // For text-only input, use the gemini-pro model
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      console.log(response);
      this.html = response.text();
      console.log(this.html);
      this.messageList.push({
        avatar: "ai",
        text: this.html,
      });

      //滚动条平滑的滚动到底部
      this.scrollTop()

      this.vLoading = false;
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  background: #f5f5f5;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 70vh;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  overflow: hidden;
}
.message-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
  //平滑滚动条
  scroll-behavior: smooth;
}
.message {
  margin-bottom: 15px;
}
.message.other .text {
  background-color: #e0e0e0;
}
.message.self {
  text-align: right;
}
.message.self .text {
  background-color: #0084ff;
  color: white;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}
.text {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 18px;
  max-width: 70%;
}
.input-area {
  display: flex;
  padding: 10px;
  background-color: #fff;
}
.input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 18px;
  margin-right: 10px;
}
.input-area button {
  padding: 8px 20px;
  border: none;
  border-radius: 18px;
  background-color: #0084ff;
  color: white;
  cursor: pointer;
}
</style>

import { createSSRApp } from "vue";//这个函数是用来创建一个SSR应用的工厂函数
import App from "./App.vue";//这是个组件,它将是我们应用的根组件
export function createApp() {//创建一个SSR应用的实例。当我们调用这个函数时，它将返回一个包含了创建的Vue实例的对象。我们可以将这个实例传递给一个SSR的渲染器，以渲染我们的应用到服务器上
  const app = createSSRApp(App);
  return {
    app,
  };
}

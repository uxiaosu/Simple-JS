// Simple官网主布局

import { element, signal } from 'simplejs';
import { router } from '../../router/index.js';
import { NavBar } from '../ui/NavBar.sjs';
import { Footer } from '../ui/Footer.sjs';

export const MainLayout = {
  // 数据层
  data: {
    navItems: [
      { label: '首页', path: '/' },
      { label: '特性', path: '/features' },
      { label: '文档', path: '/docs' },
      { label: '社区', path: '/community' },
      { label: '联系我们', path: '/contact' }
    ],
    currentRoute: signal(router.currentRoute)
  },
  
  // 视图结构层
  node: {
    container: element('div', { class: 'main-layout' }),
    header: element('header', { class: 'header' }),
    main: element('main', { class: 'main' }),
    footer: element('footer', { class: 'footer' })
  },
  
  // 行为连接层
  action: {
    onCreate() {
      // 监听路由变化
      router.onChange((route) => {
        this.data.currentRoute.set(route);
      });
      
      // 设置导航栏
      const navbar = element(NavBar, {
        items: this.data.navItems,
        currentRoute: this.data.currentRoute
      });
      
      // 设置页脚
      const footer = element(Footer, {
        companyName: 'Simple',
        year: new Date().getFullYear()
      });
      
      // 组装布局
      this.node.header.append(navbar);
      this.node.footer.append(footer);
      
      this.node.container.append(
        this.node.header,
        this.node.main,
        this.node.footer
      );
    },
    
    // 接收子元素并渲染到主内容区
    onProps(props) {
      if (props.children) {
        this.node.main.innerHTML = '';
        this.node.main.append(...props.children);
      }
    }
  },
  
  // 渲染方法
  render() {
    return this.node.container;
  }
}; 
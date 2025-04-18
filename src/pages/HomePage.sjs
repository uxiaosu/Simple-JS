// Simple官网首页

import { element, signal, compute } from 'simplejs';
import { Button } from '../components/ui/Button.sjs';
import { Hero } from '../components/sections/Hero.sjs';
import { FeatureGrid } from '../components/sections/FeatureGrid.sjs';
import { Testimonials } from '../components/sections/Testimonials.sjs';
import { CodeDemo } from '../components/sections/CodeDemo.sjs';
import { CTASection } from '../components/sections/CTASection.sjs';

export const HomePage = {
  // 数据层
  data: {
    heroTitle: 'Simple官网',
    heroSubtitle: '为开发者打造的高效、简洁的前端框架',
    features: signal([
      {
        title: '流式编程范式',
        description: '直观的数据流处理方式，简化状态管理和组件通信',
        icon: 'flow'
      },
      {
        title: '信号驱动架构',
        description: '精确的依赖追踪和高效更新机制，提供卓越的性能表现',
        icon: 'signal'
      },
      {
        title: 'DNA组件系统',
        description: '关注点分离的组件架构，提高代码可维护性和复用性',
        icon: 'dna'
      },
      {
        title: '微内核设计',
        description: '轻量核心(仅5KB)，按需扩展功能，减少应用体积',
        icon: 'kernel'
      }
    ]),
    testimonials: signal([
      {
        quote: 'Simple框架让我们的开发效率提升了200%，比我们之前使用的任何框架都要好。',
        author: '张三',
        role: '资深前端开发者',
        company: 'TechCorp',
        avatar: '/images/avatars/user1.jpg'
      },
      {
        quote: 'Simple的信号系统解决了我们长期以来的状态管理问题，代码更简洁，性能更好。',
        author: '李四',
        role: 'CTO',
        company: 'StartupX',
        avatar: '/images/avatars/user2.jpg'
      }
    ])
  },
  
  // 视图结构层
  node: {
    container: element('div', { class: 'home-page' })
  },
  
  // 行为连接层
  action: {
    onCreate() {
      // 构建页面结构
      this.node.container.append(
        element(Hero, {
          title: this.data.heroTitle,
          subtitle: this.data.heroSubtitle,
          buttons: [
            {
              text: '快速开始',
              variant: 'primary',
              href: '/docs/getting-started'
            },
            {
              text: '查看演示',
              variant: 'secondary',
              href: '/demo'
            }
          ]
        }),
        element(FeatureGrid, {
          title: '核心特性',
          subtitle: '为什么选择Simple框架',
          features: this.data.features.value
        }),
        element(CodeDemo, {
          title: '简单直观的API',
          code: `
// 使用Simple创建一个计数器组件
const Counter = {
  // 定义状态
  data: {
    count: signal(0)
  },
  
  // 视图结构
  node: {
    container: element('div', { class: 'counter' }),
    display: element('p', { class: 'display' }),
    button: element('button', { class: 'btn' }, '点击增加')
  },
  
  // 行为连接
  action: {
    onCreate() {
      // 显示计数
      this.watch(this.data.count, (value) => {
        this.node.display.textContent = \`计数: \${value}\`;
      });
      
      // 绑定点击事件
      this.node.button.addEventListener('click', () => {
        this.data.count.update(c => c + 1);
      });
      
      // 构建DOM结构
      this.node.container.append(
        this.node.display,
        this.node.button
      );
    }
  }
};
          `
        }),
        element(Testimonials, {
          title: '用户反馈',
          testimonials: this.data.testimonials.value
        }),
        element(CTASection, {
          title: '准备好开始了吗？',
          description: '加入成千上万的开发者，使用Simple构建现代Web应用',
          buttons: [
            {
              text: '立即开始',
              variant: 'primary',
              href: '/docs/installation'
            }
          ]
        })
      );
    }
  },
  
  // 渲染方法
  render() {
    return this.node.container;
  }
}; 
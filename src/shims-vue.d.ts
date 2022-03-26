/*
 * @Author: shanzhilin
 * @Date: 2022-03-25 16:15:00
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-26 15:40:04
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
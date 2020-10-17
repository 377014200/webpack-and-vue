<template>
  <div>
    <h1>CSS中calc, support, media各自的含义及用法？</h1>
    <h2> 一 support</h2>
    <p>
      了解到了@support的这个属性，记录下：<br />
      CSS中的@support主要是用于检测浏览器是否支持CSS的某个属性，其实就是条件判断，如果支持某个属性，你可以写一套样式，如果不支持某个属性，你也可以提供另外一套样式作为替补。但是这里有一点需要注意的是：@support对于浏览器的版本也是有要求的，不是说所有的浏览器以及其所有的版本都是支持@support的。<br />
      下面就来说一下@support的用法：<br />
      1.基本语法是这样的：
    </p>
    <pre v-highlightjs><code class="css">@support(prop:value){ /*自己的样式*/ } @supports (display: flex) { div { display: flex; }}</code></pre>
    <p>注释：如果浏览器支持display:flex属性的话，那么div的样式就是display:flex</p>
    <p>2.逻辑操作符：“not” 的用法</p>
    <pre v-highlightjs><code class="css">@supports not (display: flex) { div { float: right; }}</code></pre>
    <p>注释：如果浏览器不支持display:flex属性的话，那么div的样式就是display:right</p>
    <p>3.逻辑操作符：“and”的用法</p>
    <pre v-highlightjs><code class="css"> @supports (display: flex) and ( box-shadow: 2px 2px 2px black ) { /*自己的样式*/ }</code></pre>
    <p>注释：如果浏览器支持display:flex和box-shadow的属性，就执行里面自己的样式</p>
    <p>4.逻辑操作符：“or” 的用法</p>
    <pre v-highlightjs><code class="css">@supports (display: -webkit-flex) or (display: -moz-flex) or(display: flex) { /*自己的样式 */ }</code></pre>
    <p>注释：如果浏览器支持其中一个就可以执行里面自己的样式</p>
    <p>5.混用的例子</p>
    <pre v-highlightjs><code class="css">@supports ((transition-property: color) or (animation-name: foo)) and (transform: rotate(10deg)) { /*自己的样式 */ }
@supports (transition-property: color) or ((animation-name: foo) and (transform: rotate(10deg))) { /*自己的样式 */ }
@supports (display: grid) and (not (transition-property: color) or (animation-name: foo)){ /*自己的样式 */ }</code></pre>
    <h2>二 calc</h2>
    <h3><strong>定义与用法</strong></h3>
    <p>calc() 函数用于动态计算长度值。</p>
    <p>&nbsp; &nbsp; &nbsp;● 需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；</p>
    <p>&nbsp; &nbsp; &nbsp;●&nbsp;任何长度值都可以使用calc()函数进行计算；</p>
    <p>&nbsp; &nbsp; &nbsp;●&nbsp;calc()函数支持 "+", "-", "*", "/" 运算；</p>
    <p>&nbsp; &nbsp; &nbsp;●&nbsp;calc()函数使用标准的数学运算优先级规则；</p>
    <h3>CSS 语法</h3>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr>
          <td>
            <p>1</p>
          </td>
          <td>
            <p><code>calc(expression)</code></p>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td style="vertical-align:top;">
            值&nbsp;
          </td>
          <td style="vertical-align:top;">
            描述
          </td>
        </tr><tr>
          <td style="vertical-align:top;">
            expression&nbsp;
          </td>
          <td style="vertical-align:top;">
            必须，一个数学表达式，结果将采用运算后的返回值
          </td>
        </tr>
      </tbody>
    </table>

    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>

    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
    <pre v-highlightjs><code class="css">@supports (display: flex) { div { display: flex; }}</code></pre>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () {

  },
  activated () {
  },
  mounted () {
  },
  methods: {},
};
</script>

<style scoped>

</style>
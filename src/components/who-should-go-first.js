import Vue from '../vendor/vue.js'
import './who-should-go-first.css'

const template = `
  <div class="who-should-go-first">
    <h1> Who should go first? </h1>

    <div class="row">
      <div class="col-xs">
        <button class="button" v-on:click="$emit('select', false)">Their AI</button>
      </div>
      <div class="col-xs">
        <button class="button" v-on:click="$emit('select', true)">Our AI</button>
      </div>
    </div>
  </div>
`

Vue.component('who-should-go-first', {
  template: template
})

import Vue from '../vendor/vue.js'
import './who-should-go-first.css'

const template = `
  <div class="who-should-go-first">
    <h1> What color would you like to be? </h1>

    <div class="row">
      <div class="col-xs">
        <button class="button" v-on:click="$emit('select', false)">White</button>
      </div>
      <div class="col-xs">
        <button class="button" v-on:click="$emit('select', true)">Black</button>
      </div>
    </div>
  </div>
`

Vue.component('who-should-go-first', {
  template: template
})

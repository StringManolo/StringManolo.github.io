// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files;



/* Pages: */
const About = { 
  template: `
<div>
<developer-name></developer-name>                                     <developer-description></developer-description>                       <developer-info></developer-info>
</div>
`
}

const Home = { 
  template: `
<i>Home Template Here</i>
`
}

const Projects = { 
  template: `
<div>
<section id="projects">
  <article id="diariosm">
  <h3>DIARIOSM</h3>
  <iframe src="./projects/diariosm/diariosm.html"></iframe>
  <p class="description">Newspaper</p>
  </article>
  <br />
  <article id="jex">
  <h3>JEX</h3>
  <iframe src="./projects/jex/jex.html"></iframe>
  <p class="description">Hexadecimal Editor.</p>
  </article>
  <br />
  <article id="passwordValidator">
  <h3>PASSWORDVALIDATOR</h3>
  <iframe src="./projects/passwordValidator/passwordValidator.html"></iframe>
  <p class="description">A valid password is the one that conforms to the following rules:<br />
  - Minimum length is 8.<br />
  - Maximum length is 32.<br />
  - Should contain at least one number.<br />
  - Should contain at least one special character (such as &, +, @, $, #, %, etc.).<br />
  - Should not contain spaces.</p>
  </article>
  <br />
  <article id="htmlEntities">
  <h3>HTMLENTITIES</h3>
  <iframe src="./projects/htmlEntities/htmlEntities.html"></iframe>
  <p class="description">Encode your source code using rfc html entities to help prevent Cross Site Scripting atacks in your application.</p>
  </article>
  <br />
  <article id="RXSSGEN">
  <h3>RXSSGEN</h3>
  <iframe src="./projects/rxssgen/rxssgen.html"></iframe>
  <p class="description">Modal Assistent to generate a full working custom payload to exploit Reflected Cross Site Scriping via POST http method.</p>
  </article>
  </section>
</div>
`
}

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: routes
})

// 4. Create and mount the root instance.	
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router,
  watch: {
    '$route' (to, from) {
      
    }
  }
}).$mount("#app");
// Now the app has started!

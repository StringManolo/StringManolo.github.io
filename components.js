/* Components: */
Vue.component('web-header', {
  template: '<header><h1>{{ title }}</h1></header>',
  data: function () {
    return {
      title: 'Manolo\'s Portfolio'
    }
  }
});

Vue.component('web-footer', {
  template: '<footer><h6>Copyrigth &copy; {{currentYear}}</h6></footer>',
  computed: {
    currentYear: function() {
      return new Date().getFullYear();
    }
  }
})

Vue.component('developer-name', {
  template: '<div><h2>{{ name }} ({{ alias }})</h2></div>',
  data: function () {
    return {
      name: 'Manuel',
      alias: 'StringManolo'
    }                                                                   }
})


Vue.component('developer-description', {
  template: `
<section id="developerDescription">
<article id="developerShortDescription">
<p>{{developerShortDescription}}</p>
</article>
</section>
`,
  data: function() {
    return {
      developerShortDescription: "Web Developer and Security Enthusiast."
    }
  }
})


Vue.component('developer-info', {
  template: `
<section id="developerProfile">
<article id="name">
Name: {{name}}
</article>

<article id="surname">
Surname: {{surname}}
</article>

<article id="alias">
Alias: {{alias}}
</article>

<article id="birthdate">
Birthdate: {{birthdate}}
</article>

<article id="country">
Country: {{country}}
</article>
</section>
`,
  data: function() {
    return {
      name: "Manuel Ángel",
      surname: "Varela Caldas",
      alias: "StringManolo",
      birthdate: "22/10/1993",
      country: "Spain"
    }
  }
})





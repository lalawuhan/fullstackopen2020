describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })

  it('login form works', function () {
    cy.contains('login').click()
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('trial')
      cy.get('#password').type('trial')
      cy.get('#login-button').click()

      cy.contains('trial logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('trial')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')

      cy.get('html').should('not.contain', 'trial logged-in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('trial')
      cy.get('#password').type('trial')
      cy.get('#login-button').click()
    })

    it('a new post can be created', function () {
      cy.contains('new post').click()
      cy.get('#title').type('a title created by cypress')
      cy.get('#author').type('a author created by cypress')
      cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing')
      cy.contains('save').click()
      cy.contains('a title created by cypress')
    })

  })

})
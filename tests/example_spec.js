//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point


// **** Test Structure ****
//
// Cypress has adopted Mocha's bdd syntax.
// https://on.cypress.io/guides/bundled-tools#section-mocha
//

describe('Kitchen Sink [000]', function(){

  beforeEach(function(){

    // **** Resetting State Before Each Test ****
    //
    // Visiting our app before each test
    // removes any state build up from
    // previous tests. Visiting acts as if
    // we closed a tab and opened a fresh one
    //
    // By default Cypress also automatically
    // clears the Local Storage and Cookies
    // before each test.

    // http://on.cypress.io/visit
    // cy.visit('http://cypress-io.github.io/examples-kitchen-sink/')
    cy.visit('http://localhost:8080')

  })

  it('cy.should - assert that <title> is correct [001]', function(){

    // **** Making Assertions ****
    //
    // Here we've made our first assertion using a 'cy.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.
    // Chainers are available from Chai, Chai-jQuery, and Chai-Sinon.
    // https://on.cypress.io/guides/making-assertions
    //
    // http://on.cypress.io/should
    // http://on.cypress.io/and

    // http://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink')
    //   ↲               ↲            ↲
    // subject        chainer      value

  })

  context('Querying [002]', function(){

    // **** Querying DOM Elements ****
    //
    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQueury

    it('cy.get() - query DOM elements [007]', function(){

      // http://on.cypress.io/get
      // We can get DOM elements by id
      cy.get('#query-btn').should('contain', 'Button')

      // We can get DOM elements by class
      cy.get('.query-btn').should('contain', 'Button')


      cy.get('#querying .well>button:first').should('contain', 'Button')
      //              ↲
      // we can CSS selectors just like jQuery

    })

    it('cy.contains() - query DOM elements with matching content [008]', function(){

      // http://on.cypress.io/contains
      cy.get('.query-list').contains('bananas').should('have.class', 'third')

    })

    it('cy.within() - query DOM elements within a specific element [007]', function(){

      // http://on.cypress.io/within
      cy.get('.query-form').within(function(){
        cy.get('input:first').should('have.attr', 'placeholder', 'Email')
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')

      })

    })

    it('cy.root() - query the root DOM element [007]', function(){

      // http://on.cypress.io/root

      // By default, root is the document
      cy.root().should('match', 'html')

      cy.get('.query-ul').within(function(){

        // In this within, the root is now the ul DOM element
        cy.root().should('have.class', 'query-ul')

      })

    })

  })

  context('DOM Traversal [009]', function(){

    // **** Traversing DOM Elements ****
    //
    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQueury

    it('cy.children() - get child DOM elements [00a]', function(){

      // http://on.cypress.io/children
      cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data')

    })

    it('cy.closest() - get closest ancestor DOM element [00c]', function(){

      // http://on.cypress.io/closest
      cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')

    })

    it('cy.eq() - get a DOM element at a specific index [00d]', function(){

      // http://on.cypress.io/eq
      cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')

    })

    it('cy.filter() - get DOM elements that match the selector [00b]', function(){

      // http://on.cypress.io/filter
      cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')

    })

    it('cy.find() - get descendant DOM elements of the selector [00e]', function(){

      // http://on.cypress.io/find
      cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)

    })

    it('cy.first() - get first DOM element [00f]', function(){

      // http://on.cypress.io/first
      cy.get('.traversal-table td').first().should('contain', '1')

    })

    it('cy.last() - get last DOM element [00g]', function(){

      // http://on.cypress.io/last
      cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')

    })

    it('cy.next() - get next sibling DOM element [00g]', function(){

      // http://on.cypress.io/next
      cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')

    })

    it('cy.not() - remove DOM elements from set of DOM elements [00g]', function(){

      // http://on.cypress.io/not
      cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled')

    })

    it('cy.parents() - get parents DOM element from set of DOM elements [00g]', function(){

      // http://on.cypress.io/parents
      cy.get('.traversal-cite').parents().should('match', 'blockquote')

    })

    it('cy.siblings() - get all sibling DOM elements from set of DOM elements [00g]', function(){

      // http://on.cypress.io/siblings
      cy.get('.traversal-pills .active').siblings().should('have.length', 2)

    })


  })

  context('Actions [00h]', function(){

    // **** Actions ****
    //
    // Let's perform some actions on DOM elements
    // Move of these involve filling in form elements
    // But some actions, like click, will often be
    // used throughout an application

    it('cy.type() - type into a DOM element [00a]', function(){

      // http://on.cypress.io/type
      cy.get('.action-email')
        .type('fake@email.com').should('have.value', 'fake@email.com')

        // cy.type() may include special character sequences
        .type('{leftarrow}{leftarrow}{del}{del}{selectall}{backspace}')

        // **** Type Options ****
        //
        // cy.type() accepts options that control typing
        //
        // Delay each keypress by 0.1 sec
        // You may want to set the delay which
        // causes the keystrokes to happen much slower
        // in some situations if the application under
        // test is not able to handle rapid firing events.
        // (generally due to the app not properly throttling events)
        .type('slow.typing@email.com', {delay: 100}).should('have.value', 'slow.typing@email.com')

        .get('.action-disabled')

        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking', {force: true}).should('have.value', 'disabled error checking')

    })

    it('cy.focus() - focus on a DOM element [00a]', function(){

      // http://on.cypress.io/focus
      cy.get('.action-focus').focus()
        .should('have.class', 'focus')
          .prev().should('have.attr', 'style', 'color: orange;')

    })

    it('cy.click() - click on a DOM element [00a]', function(){

      // http://on.cypress.io/click
      cy.get('.action-btn').click()

      // **** Click Position ****
      //
      // cy.click() accepts a position argument
      // that controls where the click occurs
      //
      // clicking in the center of the element is the default
      cy.get('#action-canvas').click()

      // click the top left corner of the element
      cy.get('#action-canvas').click('topLeft')

      // click the top right corner of the element
      cy.get('#action-canvas').click('topRight')

      // click the bottom left corner of the element
      // cy.get('#action-canvas').click('bottomLeft')

      // click the bottom right corner of the element
      // cy.get('#action-canvas').click('bottomRight')


      // **** Click Coordinate ****
      //
      // cy.click() accepts a an x and y coordinate
      // that controls where the click occurs

      // click the top left corner of the element
      cy.get('#action-canvas').click(20, 50)

      // click the top right corner of the element
      cy.get('#action-canvas').click(160, 75)


      // **** Click Options ****
      //
      // cy.click() accepts options that control clicking
      //
      // click multiple elements by passing multiple: true
      // otherwise an error will be thrown if multiple
      // elements are the subject of cy.click
      cy.get('.action-labels>.label').click({multiple: true})

      // Ignore error checking prior to clicking
      // like whether the element is visible, clickable or disabled
      // this button below is covered by another element.
      cy.get('.action-opacity>.btn').click({force: true})

    })

    it('cy.dblclick() - double click on a DOM element', function(){

      // We have a listener on 'dblclick' event in our 'scripts.js'
      // that hides the div and shows an input on double click

      // http://on.cypress.io/dblclick
      cy.get('.action-div').dblclick().should('not.be.visible')
      cy.get('.action-input-hidden').should('be.visible')

    })

    it('cy.check() - check a checkbox or radio element', function(){

      // By default, cy.check() will check all
      // matching checkbox or radio elements in succession, one after another

      // http://on.cypress.io/check
      // cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')
      // cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked')

      // // **** Check Value ****
      // //
      // // cy.check() accepts a value argument
      // // that checks only checkboxes or radios
      // // with matching values
      // //
      // cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked')

      // **** Check Options ****
      //
      // cy.check() accepts options that control checking
      //
      // Ignore error checking prior to checking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-checkboxes [disabled]').check({force: true}).should('be.checked')
      // cy.get('.action-radios [type="radio"]').check('radio3', {force: true}).should('be.checked')

    })


    it('cy.uncheck() - uncheck a checkbox or radio element', function(){

      // By default, cy.uncheck() will uncheck all matching
      // checkbox elements in succession, one after another

      // http://on.cypress.io/check
      cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked')

      // **** Check Value ****
      //
      // cy.uncheck() accepts a value argument
      // that unchecks only checkboxes or radios
      // with matching values
      //
      // cy.get('.action-check [type="checkbox"]').check('checkbox1').uncheck('checkbox1').should('not.be.checked')

      // **** Uncheck Options ****
      //
      // cy.uncheck() accepts options that control unchecking
      //
      // Ignore error checking prior to unchecking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-check [disabled]').uncheck({force: true}).should('not.be.checked')

    })

    it('cy.select() - select an option in a <select> element', function(){

      // http://on.cypress.io/select

      // Select the option with matching text content
      cy.get('.action-select').select('apples')

      // Select the option with matching value
      cy.get('.action-select').select('fr-bananas')

      // **** Select Options ****
      //
      // cy.select() accepts options that control selecting
      //
      // Ignore error checking prior to select
      // like whether the select or options is disabled
      //
      // this select below is disabled.
      // cy.get('.action-select-disabled').select('option2', {force: true})

      // this option in the select below is disabled.
      // cy.get('.action-option-disabled').select('fr-oranges', {force: true})

    })


  })

})

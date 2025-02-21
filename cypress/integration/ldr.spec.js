describe('LDR Full User Flow', () => {
    const username = 'testuser';
    const password = 'password123';
  
    beforeEach(() => {
      // Reset test data and visit the login page
      cy.visit('/login');
    });
  
    it('should log in successfully and display the dashboard', () => {
      // Fill in login form
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      // Verify dashboard loads
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });
  
    it('should allow a user to log a milestone', () => {
      // Log in first
      cy.login(username, password); // Custom Cypress command (see note below)
      
      // Navigate to milestone page
      cy.visit('/milestones');
      
      // Fill in the milestone form
      cy.get('input[name="activityType"]').select('eventAttendance');
      cy.get('textarea[name="description"]').type('Attended leadership event');
      cy.get('input[name="proof"]').attachFile('sample-proof.jpg'); // Requires cypress-file-upload plugin
      
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify the milestone appears in the list
      cy.contains('Attended leadership event').should('be.visible');
    });
  
    it('should simulate a payment process and verify success', () => {
      // Log in first
      cy.login(username, password);
      
      // Navigate to the subscription page
      cy.visit('/subscribe');
      
      // Stub payment API call (simulate successful payment response)
      cy.intercept('POST', '/api/payments/create-session', {
        statusCode: 200,
        body: { sessionId: 'test_session_id' },
      }).as('createSession');
  
      // Trigger subscription creation
      cy.get('select[name="plan"]').select('monthly');
      cy.get('button#createSubscription').click();
  
      // Wait for and verify API call
      cy.wait('@createSession').its('response.statusCode').should('eq', 200);
  
      // Verify that a success message or redirection occurs
      cy.contains('Subscription Successful').should('be.visible');
    });
  });
  
Feature: Registration

Scenario: Registration was successful
  Given both fields of the form have been completed
  When the user enter a userName that is not already in the database
  Then the user is added to the database and he can log in to access the homepage


Senario: Registration error
  Given both fields of the form have been completed
  When the user enter a userName that is already in the database
  Then the error message "cet identifiant existe déjà" is displaye
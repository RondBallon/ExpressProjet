Feature: settings management

Scenario: when you click on the button "parametres", it opens the settings page
  Given the user have previously create a account 
  When click on the button "parametres" 
  Then The user access to the settings page


Scenario: when we modify the image of the avatar, it's indeed modified
  Given the user is Logged
  When the user choose an image 
  And the user click on the button "Valider" to validate the modification
  Then the modification is up-to-date and the message "Votre modification a bien été prise en compte" is displayed



Scenario: the user modify his description, but it's indeed modified
  Given the user is Logged
  When the user modifies his description
  And the user click on the button "Valider" to validate the modification
  Then the modification is up-to-date and the message "Votre modification a bien été prise en compte" is displayed


Scenario: the user modifies his avatar image but the modification is not applied
  Given the user is Logged
  When the user choose an image
  And the user click on the button "Valider" to validate the modification
  Then the avatar image wasn't updated and the error message "votre aatar n'a pas été mis à jour" is displayed


Scenario: the user modifies his description but the modification is not applied
  Given the user is Logged
  When the user modifies his description
  And the user click on the button "Valider" to validate the modification
  Then the description wasn't updated and the error message "votre description n'a pas été mise à jour" is displayed
BE Domain Color
===============

Key: qc_be_domain_color
Author: Marc Munos, Québec.ca

**[Documentation en français plus bas](#documentation-française)**

### Screenshot
If the domain fits in the user preferences and the TYPO3 instance being used, the color is applied in the Modules frame:  

![alt text](Documentation/Images/module-be-fr.jpg "Saise d'écran")


## Description

This extension inject CSS in the BE interface to modify the color of the left/Modules frame. The color is associated to one or many domains. It can be useful when you get many TYPO3 instances, local DDEV/Docker installations or development servers and you want to really make the production server stand out. 

The storage method for settings has been updated to be more robust, using a dedicated database column.

## Installation

### Composer installation
composer req qc/qc-be-domain-color

### Upgrading to v2.1.0 (or later)
**Important:** After updating the extension to version 2.1.0 or later, you **must run the Upgrade Wizard** named "Migrate Domain Color Settings". This wizard is available in the TYPO3 Install Tool (Admin Tools > Maintenance > Upgrade Wizard).

This step is crucial to:
1. Migrate your existing domain color preferences from the old storage (`be_users.uc`) to the new, dedicated database column (`tx_qc_be_domain_color_values`).
2. Ensure your settings appear and are manageable in the new backend module.
Failure to run the wizard may result in your previous settings not being visible or manageable.

## Usage

1. Go to the new backend module: **"Web" > "Domain Color Settings"**.
2. Use the interface to add, modify, or remove domain-to-color mappings.
3. The settings are saved automatically.

*(The previous method of configuring settings via the User Setup (top right menu) is no longer applicable.)*

## Features

- You can add as many domains as you want
- Partial domain works (ie: just "example" or "example.com" are ok even if full url is "www.example.com")
- Color picker for easy color selection
- Support for regular expressions, wildcards
- Use Vue.js (dependcy on https://extensions.typo3.org/extension/vuejs)

### Examples 

Suppose you got many servers with domains like: web.example.com, web2.example.com, testing.example.com and ddev.site

All those variations are valid entries for the domain field in the module:

- web
- web[2-4]
- web.*
- dev[\.45] (means "dev" followed with a dot or followed by 4 or 5)
- ddev

If you ever got two domains that compared to the same, the last color will "win". 

If the domain doesn't exist in the TYPO3 instance you're on, the default color is applied.


Documentation française
=======================

### Description

Cette extension permet de personnaliser la couleur de fond de la barre des modules du panneau  d'administration de TYPO3 (le « backend ») en fonction du domaine web. Elle s'adresse donc aux personnes qui travaillent sur plusieurs environnements (production, acceptation, formation, développement, etc.). Elle leur permet d'identifier visuellement l'environnement sur lequel ils se trouvent.

La méthode de stockage des configurations a été améliorée pour plus de robustesse, utilisant une colonne dédiée dans la base de données.
 

![alt text](Documentation/Images/module-be-fr.jpg "Saise d'écran")

### Installation Composer
composer req qc/qc-be-domain-color

### Mise à niveau vers v2.1.0 (ou ultérieure)
**Important :** Après avoir mis à jour l'extension vers la version 2.1.0 ou une version ultérieure, vous **devez exécuter l'assistant de mise à niveau** nommé "Migrate Domain Color Settings". Cet assistant est disponible dans l'outil d'installation de TYPO3 (Admin Tools > Maintenance > Upgrade Wizard).

Cette étape est cruciale pour :
1. Migrer vos préférences de couleurs de domaine existantes de l'ancien système de stockage (`be_users.uc`) vers la nouvelle colonne dédiée dans la base de données (`tx_qc_be_domain_color_values`).
2. Assurer que vos configurations apparaissent et sont gérables dans le nouveau module d'administration.
Si vous n'exécutez pas cet assistant, vos configurations précédentes pourraient ne pas être visibles ou gérables.

### Utilisation

Suivez les étapes suivantes pour appliquer une couleur à un environnement.

1. Accédez au nouveau module d'administration : **"Web" > "Domain Color Settings"**.
2. Utilisez l'interface pour ajouter, modifier ou supprimer les correspondances entre domaine et couleur.
3. Les configurations sont sauvegardées automatiquement.

*(L'ancienne méthode de configuration via les paramètres utilisateur (menu utilisateur en haut à droite) n'est plus applicable.)*

![img.png](img.png)

### Fonctionnalités**

L'identification du domaine se fait par expression régulière. Toutes les correspondances domaine/couleur sont testées. La dernière qui correspond au domaine de l'adresse web en cours donne la couleur de fond de la barre de gauche.

### Exemples
Voici quelques exemples d'expressions régulières pour identifier le domaine courant :
- dev
- dev[2-4] 
- staging-?.* 
- ddev

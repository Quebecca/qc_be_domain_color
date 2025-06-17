<?php

if (!defined('TYPO3')) {
    die ('Access denied.');
}

$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ext/install']['update']['qc_be_domain_color_migrate_uc_to_dedicated_column'] = \Qc\QcBeDomainColor\Updates\MigrateDomainColorSettingsUpdate::class;

// Register Backend Module
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerModule(
    'QcBeDomainColor',
    'web', // Main module (e.g., 'web', 'tools', 'user')
    'QcBeDomainColorSettings', // Sub-module key
    '', // Position
    [
        \Qc\QcBeDomainColor\Controller\SettingsController::class => 'show',
    ],
    [
        'access' => 'user,group',
        'icon'   => 'EXT:qc_be_domain_color/Resources/Public/Icons/Extension.svg',
        'labels' => 'LLL:EXT:qc_be_domain_color/Resources/Private/Language/locallang_db.xlf:module.settings.title',
    ]
);
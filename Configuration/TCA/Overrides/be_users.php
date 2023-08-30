<?php

defined('TYPO3') or die();

$lll = 'LLL:EXT:qc_be_domain_color/Resources/Private/Language/locallang_db.xlf:';

$tempColumns = [
    'tx_qc_be_domain_color_values' => [
        'label' => $lll.'be_users.fields.beDomainColorValues',
        'config' => [
            'type' => 'passthrough',
        ],
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'be_users',
    $tempColumns
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'be_users',
    'tx_qc_be_domain_color_values'
);

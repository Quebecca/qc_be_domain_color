<?php


call_user_func(
    function ($extKey) {
        $lll = 'LLL:EXT:qc_be_domain_color/Resources/Private/Language/locallang_db.xlf:';

        $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_qc_be_domain_color'] = ['label' => $lll.'be_users.fields.beDomainColor', 'type' => 'select', 'csh' => 'beDomainColor', 'itemsProcFunc' => \Qc\QcBeDomainColor\Hooks\ItemsProcFunc::class . '->DomainColorsFields'];
        $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_qc_be_domain_color_values'] = ['type' => 'text', 'table' => 'be_users'];

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;'.$lll.'be_users.tabs.beDomainColor,tx_qc_be_domain_color_values,tx_qc_be_domain_color'
        );

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
            '_MOD_user_setup',
            'EXT:qc_be_domain_color/Resources/Private/Language/locallang_csh_mod.xlf'
        );
    },
    'QcBeDomainColor'
);


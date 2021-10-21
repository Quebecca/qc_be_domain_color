<?php


call_user_func(
    function ($extKey) {
        $lll = 'LLL:EXT:pgu_be_domaincolor/Resources/Private/Language/locallang_db.xlf:';

        $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_pgu_be_domain_color'] = array(
            'label' => $lll.'be_users.fields.beDomainColor',
            'type' => 'select',
            'csh' => 'beDomainColor',
            'itemsProcFunc' => \Pgu\PguBeDomaincolor\Hooks\ItemsProcFunc::class . '->domainColorsFields',
        );
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;'.$lll.'be_users.tabs.beDomainColor,tx_pgu_be_domain_color'
        );

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
            '_MOD_user_setup',
            'EXT:pgu_be_domaincolor/Resources/Private/Language/locallang_csh_mod.xlf'
        );
    },
    'PguBeDomaincolor'
);


<?php


call_user_func(
    function ($extKey) {
        $lll = 'LLL:EXT:qc_be_domain_color/Resources/Private/Language/locallang_db.xlf:';

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
            '_MOD_user_setup',
            'EXT:qc_be_domain_color/Resources/Private/Language/locallang_csh_mod.xlf'
        );
    },
    'QcBeDomainColor'
);


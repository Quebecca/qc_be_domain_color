<?php

use Qc\QcBeDomainColor\Events\ItemsProcFunc;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

if (!defined('TYPO3')) {
    die('Access denied.');
}

call_user_func(
    function ($extKey) {
        $lll = 'LLL:EXT:qc_be_domain_color/Resources/Private/Language/locallang_db.xlf:';

        $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_qc_be_domain_color'] = [
            'label' => $lll.'be_users.fields.beDomainColor',
            'type' => 'select',
            'csh' => 'beDomainColor',
            'itemsProcFunc' => ItemsProcFunc::class . '->DomainColorsFields'];

        ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;'.$lll.'be_users.tabs.beDomainColor,tx_qc_be_domain_color'
        );
    },
    'QcBeDomainColor'
);

<?php

if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPreProcess']['qc_be_domain_color'] = \Qc\QcBeDomainColor\Hooks\ItemsProcFunc::class.'->injectDomainColor';




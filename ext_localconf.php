<?php

if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPreProcess']['pgu_be_domain_color'] = \Pgu\PguBeDomaincolor\Hooks\ItemsProcFunc::class.'->injectDomainColor';




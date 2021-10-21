<?php
$EM_CONF[$_EXTKEY] = array(
    'title' => 'PGU BE Domain color',
    'description' => 'Allows to set custom bg color by domain',
    'category' => 'be',
    'author' => 'Techno - Québec.ca',
    'author_email' => 'techno@quebec.ca',
    'state' => 'stable',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.2',
    'constraints' => array(
        'depends' => array(
            'typo3' => '10.4.0-11.4.99',
        ),
        'conflicts' => array(
        ),
        'suggests' => array(
        ),
    ),
    'autoload' => [
        'psr-4' => [
            'Pgu\\PguBeDomainColor\\' => 'Classes'
        ],
    ],
);

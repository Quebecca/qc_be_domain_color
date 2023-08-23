<?php
$EM_CONF[$_EXTKEY] = array(
    'title' => 'Qc Be Domain Color',
    'description' => 'Allows to set custom bg color by domain',
    'category' => 'be',
    'author' => 'Quebec.ca',
    'author_email' => 'techno@quebec.ca',
    'state' => 'stable',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.2',
    'constraints' => array(
        'depends' => array(
            'php' => '7.4-8.2',
            'typo3' => '10.4.0-11.5.99',
        ),
        'conflicts' => array(
        ),
        'suggests' => array(
        ),
    ),
    'autoload' => [
        'psr-4' => [
            'QC\\QcBeDomainColor\\' => 'Classes'
        ],
    ],
);

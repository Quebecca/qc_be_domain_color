<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'QC BE Domain color',
    'description' => 'This extension inject CSS in the BE interface to modify the color of the left/Modules frame. The color is associated to one or many domains. It can be useful when you get many TYPO3 instances, local DDEV/Docker installations or development servers and you want to really make the production server stand out.',
    'category' => 'be',
    'author' => 'Quebec.ca',
    'author_company' => 'Québec',
    'state' => 'stable',
    'version' => '3.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-13.9.99',
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Qc\\QcBeDomainColor\\' => 'Classes/',
        ],
    ],
];

<?php
$EM_CONF[$_EXTKEY] = ['title' => 'Qc Be Domain Color', 'description' => 'Allows to set custom bg color by domain', 'category' => 'be', 'author' => 'Quebec.ca', 'author_email' => 'techno@quebec.ca', 'state' => 'stable', 'version' => '1.0.2', 'constraints' => ['depends' => ['php' => '7.4-8.2', 'typo3' => '10.4.0-11.5.99'], 'conflicts' => [], 'suggests' => []], 'autoload' => [
    'psr-4' => [
        'QC\\QcBeDomainColor\\' => 'Classes'
    ],
]];

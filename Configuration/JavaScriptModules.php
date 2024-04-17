<?php

return [
    // required import configurations of other extensions,
    // in case a module imports from another package
    'dependencies' => ['backend'],
    'imports' => [
        '@qc/qc-be-domain-color/' => 'EXT:qc_be_domain_color/Resources/Public/WebComponents/DomainColorPickers/',
    ],
];

<?php
declare(strict_types=1);

/**
 */
return [
    'save_colors' => [
        'path' => '/save_colors',
        'target' => Qc\QcBeDomainColor\Events\ItemsProcFunc::class . '::saveAction'
    ],
];

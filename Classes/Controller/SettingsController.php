<?php

declare(strict_types=1);

namespace Qc\QcBeDomainColor\Controller;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use Qc\QcBeDomainColor\Events\ItemsProcFunc;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;

class SettingsController extends ActionController
{
    protected ItemsProcFunc $itemsProcFunc;

    // Dependency injection for ItemsProcFunc.
    // In TYPO3 v11+ autowiring should handle this if Services.yaml is permissive
    // or if ItemsProcFunc is registered as a service.
    // For older versions or explicit configuration, a constructor might be needed
    // or ensure it's a globally available service.
    // Given ItemsProcFunc was instantiated via makeInstance before,
    // direct instantiation or explicit service definition might be needed if autowiring fails.
    // However, ActionController often gets dependencies injected.
    public function __construct(ItemsProcFunc $itemsProcFunc)
    {
        $this->itemsProcFunc = $itemsProcFunc;
    }

    public function showAction(): ResponseInterface
    {
        // The ItemsProcFunc->domainColorsFields() generates the HTML for the settings.
        // This HTML component includes the necessary JavaScript logic for handling interactions
        // and making AJAX calls to its own saveAction.
        $settingsHtml = $this->itemsProcFunc->domainColorsFields();
        $this->view->assign('settingsHtml', $settingsHtml);

        // Set up a default view path if not automatically resolved by Extbase for backend modules
        // This might not be strictly necessary if default paths are hit, but good for clarity.
        // $this->view->setTemplateRootPaths(['EXT:qc_be_domain_color/Resources/Private/Templates/']);
        // $this->view->setPartialRootPaths(['EXT:qc_be_domain_color/Resources/Private/Partials/']);
        // $this->view->setLayoutRootPaths(['EXT:qc_be_domain_color/Resources/Private/Layouts/']);
        // The view object in ActionController is preconfigured.
        // Assigning variables to $this->view and returning $this->htmlResponse() is standard.

        return $this->htmlResponse();
    }
}

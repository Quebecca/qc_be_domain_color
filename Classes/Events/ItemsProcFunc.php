<?php

namespace Qc\QcBeDomainColor\Events;

/**
 * This file is part of the "QcBeDomainColor" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */
use TYPO3\CMS\Backend\Controller\Event\AfterBackendPageRenderEvent;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;

/**
 * Userfunc to render a js component
 */
class ItemsProcFunc
{

    /**
     * Generate a view component to associate domain's regexp to colors
     * @return string - the view component
     */
    public function domainColorsFields()
    {
        $view = $this->getStandaloneView();

        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $file = ($GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] ?? false)
                    ? 'vue.js'
                    : 'vue.min.js'
                    ;
        $pageRenderer->addJsFile("EXT:vuejs/Resources/Public/JavaScript/Contrib/Vue/$file"); // development version with hints
        $pageRenderer->loadJavaScriptModule('TYPO3/CMS/QcBeDomainColor/DomainColorsPicker');

        $view->assign(
                'qcDomainColors',
                html_entity_decode((string) (($GLOBALS['BE_USER']->uc['tx_qc_be_domain_color'] ?? '[]') ?: '[]')));
        return  $view->render();
    }

    protected function getStandaloneView()
    {
        $templatePath = GeneralUtility::getFileAbsFileName('EXT:qc_be_domain_color/Resources/Private/Templates');
        $standaloneView = GeneralUtility::makeInstance(StandaloneView::class);
        $standaloneView->setFormat('html');
        $standaloneView->setTemplateRootPaths((array)$templatePath);
        $standaloneView->setTemplate('DomainColorFields.html');
        return $standaloneView;

    }

    /**
     * @param AfterBackendPageRenderEvent $event
     * @throws \JsonException
     */
    public function __invoke(AfterBackendPageRenderEvent $event): void
    {
        $domainColors =
            json_decode(
                html_entity_decode($GLOBALS['BE_USER']->uc['tx_qc_be_domain_color'] ?? '[]'),
                true,
                512,
                JSON_THROW_ON_ERROR
        );
        foreach ($domainColors ?? [] as $domainColor) {
            $pattern = "/$domainColor[domain]/";
            if (@preg_match($pattern, (string) $_SERVER['HTTP_HOST'])) {
                $content = "<style>#modulemenu {background: $domainColor[color];}</style>" . $event->getContent();
                $event->setContent($content);
            }
        }
    }

}

<?php

namespace Qc\QcBeDomainColor\Hooks;

/**
 * This file is part of the "QcBeDomainColor" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */
use TYPO3\CMS\Backend\Controller\BackendController;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Object\ObjectManager;
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

        if (isset($GLOBALS['TYPO3_CONF_VARS']['BE']['debug']) && $GLOBALS['TYPO3_CONF_VARS']['BE']['debug']) {
            $pageRenderer->addJsFile('EXT:vuejs/Resources/Public/JavaScript/Contrib/Vue/vue.js'); // development version with hints
        } else {
            $pageRenderer->addJsFile('EXT:vuejs/Resources/Public/JavaScript/Contrib/Vue/vue.min.js'); // silent production version
        }
        $pageRenderer->loadRequireJsModule('TYPO3/CMS/QcBeDomainColor/DomainColorsPicker');
        $view->assign('qcDomainColors', html_entity_decode((string) (($GLOBALS['BE_USER']->user['tx_qc_be_domain_color_values'] ?? '[]') ?: '[]')));

        return  $view->render();
    }

    protected function getStandaloneView()
    {
        $templatePath = GeneralUtility::getFileAbsFileName('EXT:qc_be_domain_color/Resources/Private/Templates');
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $standaloneView = $objectManager->get(StandaloneView::class);
        $standaloneView->setFormat('html');
        $standaloneView->setTemplateRootPaths((array)$templatePath);
        $standaloneView->setTemplate('DomainColorFields.html');
        return $standaloneView;

    }

    public function injectDomainColor($conf = [], BackendController $controller)
    {

        $domainColors = json_decode(html_entity_decode((string) $GLOBALS['BE_USER']->user['tx_qc_be_domain_color_values']),true, 512, JSON_THROW_ON_ERROR);
        foreach ($domainColors ?? [] as $domainColor) {
            $pattern = "/$domainColor[domain]/";
            if (@preg_match($pattern, (string) $_SERVER['HTTP_HOST'])) {
                $controller->addCss("#modulemenu {background: $domainColor[color];}");
            }
        }

    }

}

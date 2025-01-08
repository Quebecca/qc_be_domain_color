<?php

namespace Qc\QcBeDomainColor\Events;

/**
 * This file is part of the "QcBeDomainColor" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */

use Qc\QcBeDomainColor\Domain\BackendUserRepository;
use TYPO3\CMS\Backend\Controller\Event\AfterBackendPageRenderEvent;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;
use TYPO3\CMS\Extbase\Utility\LocalizationUtility as LocalizationUtilityExtbase;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Core\Http\Response;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Userfunc to render a js component
 */
#[AsEventListener(
    identifier: 'qc-be-domain-color/backend/after-backend-page-render'
)]
class ItemsProcFunc
{

    private string $colors = '';
    private BackendUserRepository $backendUserRepository;
    public function __construct(BackendUserRepository $backendUserRepository)
    {
        $this->backendUserRepository = $backendUserRepository;
        $this->colors = $this->backendUserRepository->getBeUserColors() ?? '[]';
    }

    /**
     * Generate a view component to associate domain's regexp to colors
     * @return string - the view component
     */
    public function domainColorsFields()
    {
        $view = $this->getStandaloneView();
        $labels = [
            "buttonLabel" => $this->translate("new"),
            "description" => $this->translate("description"),
            "description_2" => $this->translate("description_2"),
            "placeholder" => $this->translate("new.placeholder"),
            "regexpError" => $this->translate("regexp-error"),
            "ignoredItem" => $this->translate("ignoredItem"),
        ];
        $view->assignMultiple([
            'qcDomainColors' =>
                html_entity_decode((($this->colors) ?: '[]')),
            "labels" => html_entity_decode(json_encode($labels))
        ]);
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
        // Code for migration from other old versions
        $beUserColors = htmlspecialchars_decode($GLOBALS['BE_USER']->uc['tx_qc_be_domain_color'] ?? '');
        if(!empty($beUserColors) && $beUserColors !== $this->colors){
            $this->backendUserRepository->updateBeUserColors($beUserColors);
            $this->colors = $beUserColors;
        }

        $domainColors =
            json_decode(
                html_entity_decode( !empty($this->colors) ? $this->colors : '[]'),
                true,
                512,
                JSON_THROW_ON_ERROR
        );

        foreach ($domainColors ?? [] as $domainColor) {
            $pattern = "/".$domainColor['domain']."/";
            if (@preg_match($pattern, (string) $_SERVER['HTTP_HOST'])) {
                $content = "<style>#modulemenu {background:". $domainColor['color'].";}</style>" . $event->getContent();
                $event->setContent($content);
            }
        }
    }

    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     */
    public function saveAction(ServerRequestInterface $request) : ResponseInterface {
        $colors = $request->getQueryParams()['colors'];
        $this->backendUserRepository->updateBeUserColors($colors);
        return new Response('php://output', 200,
            ['Content-Type' => 'text/csv; charset=utf-8',
                'Content-Description' => '',
            ]
        );

    }
    protected function translate($key):string
    {
        return LocalizationUtilityExtbase::translate(
            $key, "qc_be_domain_color") ?? '';
    }


}

<?php

namespace Qc\QcBeDomainColor\Domain;

use TYPO3\CMS\Core\Context\Context;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class BackendUserRepository
{
    private readonly Context $context;
    private $backendUserId;
    public function __construct(Context $context)
    {
        $this->context = $context;
        $this->backendUserId = $this->context->getPropertyFromAspect('backend.user', 'id');

    }

    /**
     * @param string $colors
     * @return void
     */
    public function  updateBeUserColors(string $colors) : void{

        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getQueryBuilderForTable('be_users');
        $queryBuilder
            ->update('be_users')
            ->where(
                $queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($this->backendUserId, Connection::PARAM_INT))
            )
            ->set('tx_qc_be_domain_color_values', $colors)
            ->executeStatement();
    }

    /**
     * @return mixed
     */
    public function getBeUserColors(){
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        $queryBuilder = $connectionPool->getQueryBuilderForTable('be_users');
        return $queryBuilder
            ->select('tx_qc_be_domain_color_values')
            ->from('be_users')
            ->where(
                $queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($this->backendUserId))
            )
            ->execute()
            ->fetchAssociative()['tx_qc_be_domain_color_values'];
    }

}
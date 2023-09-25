<?php

namespace Qc\QcBeDomainColor\Traits;

use Doctrine\DBAL\Statement;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;

/**
 * Class DbUtilityHelper
 *
 * @package \Qc\QcBeDomainColor\Traits
 *
 *
 * @test Wizard pour le transfert de valeurs vers le nouveau champ
 * @todo faire des tests php units
 *
 */
trait DbUtilityHelper{

    /**
     * This function will allow you to initialize a new QueryBuilder Object
     *
     * @return QueryBuilder
     */
    public function generateQueryBuilder(string $table): QueryBuilder
    {
        /**
         * @var ConnectionPool $connectionPool
         */
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        return $connectionPool->getQueryBuilderForTable($table);
    }

    /**
     * This function will allow you to initialize a new Connection Object (Using Doctrine)
     *
     * @return Connection
     */
    public function generateConnectionDoctrine(string $table): Connection
    {
        /**
         * @var ConnectionPool $connectionPool
         */
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        return $connectionPool->getConnectionForTable($table);
    }

    /**
     * @param        $connection
     * @return Statement
     */
    public function generateStatementRequest(string $sql, $connection): Statement
    {
       return GeneralUtility::makeInstance(Statement::class, $sql, $connection);
    }
}

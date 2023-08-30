<?php

declare(strict_types=1);

namespace Qc\QcBeDomainColor\Updates;

use TYPO3\CMS\Install\Attribute\UpgradeWizard;
use TYPO3\CMS\Install\Updates\UpgradeWizardInterface;
use Scg\GabaritPgu\Traits\DbUtilityHelper;

final class DomainColorValuesFieldAdd implements UpgradeWizardInterface
{
    use DbUtilityHelper;

    /**
    * Return the speaking name of this wizard
    */
    public function getTitle(): string
    {
        return 'Transfert domain color values';
    }

    /**
     * Return the description for this wizard
     */
    public function getDescription(): string
    {
        return 'Transfert domain color values from UC field to tx_qc_be_domain_color_values field (Table : be_users)';
    }

    /**
     * Return the identifier for this wizard
     * This should be the same string as used in the ext_localconf class registration
     *
     * @return string
     */
    public function getIdentifier(): string {
        return 'qcBeDomainColor_domainColorValuesFieldAdd';
    }

    /**
     * Execute the update
     *
     * Called when a wizard reports that an update is necessary
     */
    public function executeUpdate(): bool
    {
        // Update tx_qc_be_domain_color_values
        $pattern = 'tx_qc_be_domain_color.+\\\[';
        $queryBuilder = $this->generateQueryBuilder("be_users");
        $updateTable = $queryBuilder
            ->update("be_users")
            ->where(
                $queryBuilder->expr()->eq('deleted',0),
                $queryBuilder->expr()->like('uc',
                    $queryBuilder->createNamedParameter(
                        '%' . $queryBuilder->escapeLikeWildcards('tx_qc_be_domain_color') . '%'
                    )
                )
            )
            ->set('tx_qc_be_domain_color_values',
                sprintf("(
                        SUBSTRING(
                            SUBSTRING(uc, REGEXP_INSTR(uc, '$pattern') , LENGTH(uc)),
                            POSITION('[' IN SUBSTRING(uc, REGEXP_INSTR(uc, '$pattern') , LENGTH(uc))),
                            (POSITION(']' IN SUBSTRING(uc, REGEXP_INSTR(uc, '$pattern') , LENGTH(uc))) - POSITION('[' IN SUBSTRING(uc, REGEXP_INSTR(uc, '$pattern') , LENGTH(uc)))) +1
                        )
                      )"),
                false)
            ->executeStatement();

        // NULL or incomplete Value
        $queryBuilderRepair = $this->generateQueryBuilder("be_users");
        $updateTableRepair = $queryBuilderRepair
            ->update("be_users")
            ->orWhere(
                $queryBuilder->expr()->isNull('tx_qc_be_domain_color_values'),
                $queryBuilder->expr()->eq('tx_qc_be_domain_color_values', '""'),
                $queryBuilder->expr()->eq('tx_qc_be_domain_color_values', '"{}"')
            )
            ->set('tx_qc_be_domain_color_values','"[]"',false)
            ->executeStatement();
        return true;
    }

    /**
     * Is an update necessary?
     *
     * Is used to determine whether a wizard needs to be run.
     * Check if data for migration exists.
     *
     * @return bool Whether an update is required (TRUE) or not (FALSE)
     */
    public function updateNecessary(): bool
    {
        // Add your logic here
        return true;
    }

    /**
     * Returns an array of class names of prerequisite classes
     *
     * This way a wizard can define dependencies like "database up-to-date" or
     * "reference index updated"
     *
     * @return string[]
     */
    public function getPrerequisites(): array
    {
        // Add your logic here
        return [];
    }
}
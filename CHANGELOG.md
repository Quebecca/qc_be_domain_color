# QC BE Domain color

## Change log v2.1.0 (Upcoming)

- **Fixed**: Resolved an issue where domain color settings could be cleared by TYPO3's "Reset Configuration and Clear Temporary Data" functionality.
- **Changed**: Domain color settings are now stored in a dedicated database column (`tx_qc_be_domain_color_values`) instead of the general user configuration field (`be_users.uc`). This provides a more robust and isolated storage solution.
- **Added**: A new backend module "Domain Color Settings" (found under "Web" -> "Domain Color Settings") is now used to manage these settings.
- **Removed**: The domain color settings are no longer available in the User Setup / User Settings area (top right user menu).
- **Important**: A TYPO3 Upgrade Wizard ("Migrate Domain Color Settings") is provided and **must be run** from the TYPO3 Install Tool after this update. This wizard migrates existing settings from the old `be_users.uc` storage to the new `tx_qc_be_domain_color_values` column, ensuring they appear in the new backend module and are preserved.

## Change log v2.0.0
- 2025-01-08 [FEATURE] Add Support for Typo3 V12.

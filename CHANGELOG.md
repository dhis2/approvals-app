## [1.10.1](https://github.com/dhis2/approval-app/compare/v1.10.0...v1.10.1) (2021-08-11)


### Bug Fixes

* **data-workspace:** add period and org unit display name to 'no data for period' message ([b2bc34f](https://github.com/dhis2/approval-app/commit/b2bc34f73e047f088b901e1840ad8f949ac23093))

# [1.10.0](https://github.com/dhis2/approval-app/compare/v1.9.2...v1.10.0) (2021-08-11)


### Features

* **approve-button:** show workflow and period in confirmation modal ([#41](https://github.com/dhis2/approval-app/issues/41)) ([19df5bb](https://github.com/dhis2/approval-app/commit/19df5bb6d4337a682d222db62f63c61edac4f9f3))

## [1.9.2](https://github.com/dhis2/approval-app/compare/v1.9.1...v1.9.2) (2021-08-11)


### Bug Fixes

* **workflow-select:** allow selected workflow to be null ([#40](https://github.com/dhis2/approval-app/issues/40)) ([68fd920](https://github.com/dhis2/approval-app/commit/68fd920c7f5659b6a2257de3009331f208d00d81))

## [1.9.1](https://github.com/dhis2/approval-app/compare/v1.9.0...v1.9.1) (2021-08-10)


### Bug Fixes

* bottom bar actions ([#37](https://github.com/dhis2/approval-app/issues/37)) ([b6dcde7](https://github.com/dhis2/approval-app/commit/b6dcde72c80bc7e309b8d67e767ed2cebd1c8756))
* **status-tag:** remove unused status tag states and add APPROVED_ABOVE ([e175523](https://github.com/dhis2/approval-app/commit/e1755238302928121c9ab2f0e427c5fb354344d8))

# [1.9.0](https://github.com/dhis2/approval-app/compare/v1.8.1...v1.9.0) (2021-07-27)


### Features

* handle different period types of workflow and data sets (DHIS2-11288) ([#30](https://github.com/dhis2/approval-app/issues/30)) ([ae990e1](https://github.com/dhis2/approval-app/commit/ae990e1006251778f909b0772a3f895438813533))

## [1.8.1](https://github.com/dhis2/approval-app/compare/v1.8.0...v1.8.1) (2021-07-20)


### Bug Fixes

* use '-:-' instead of null as i18n namespace separator ([d2db355](https://github.com/dhis2/approval-app/commit/d2db35524173e8293fe0467bbc88439be2f1b939))

# [1.8.0](https://github.com/dhis2/approval-app/compare/v1.7.1...v1.8.0) (2021-07-20)


### Features

* add bottom bar functionality (DHIS2-11287) ([#21](https://github.com/dhis2/approval-app/issues/21)) ([1f5a77e](https://github.com/dhis2/approval-app/commit/1f5a77ee125bf4fb26bbd92418cc34db42dd8114))

## [1.7.1](https://github.com/dhis2/approval-app/compare/v1.7.0...v1.7.1) (2021-07-14)


### Bug Fixes

* deselect the period only if the new workflow has a different period type ([6be75d5](https://github.com/dhis2/approval-app/commit/6be75d54faf6b577543da53632807bd6297e04b8))
* keep the same orgUnit selection even when the workflow and/or period change ([f26584c](https://github.com/dhis2/approval-app/commit/f26584ceb7c6466f9439d39a94cb2738fc72e787))
* show context select value even if disabled ([bcae48e](https://github.com/dhis2/approval-app/commit/bcae48efffe3b816cd7d2aa25f79faa8d1bc4099))

# [1.7.0](https://github.com/dhis2/approval-app/compare/v1.6.1...v1.7.0) (2021-07-14)


### Bug Fixes

* add helper for period conversion ([a45ce5d](https://github.com/dhis2/approval-app/commit/a45ce5d0cbee08b3f9edf1cd13d96f1b16bb6c26))
* add period type to datasets ([f44a661](https://github.com/dhis2/approval-app/commit/f44a66190d6323d5dda2471e446745fc9527996c))
* improve period conversion logic ([7fb6cac](https://github.com/dhis2/approval-app/commit/7fb6cac05fca0980682e1ec285c1d9ef51cd62ff))


### Features

* add utils to compare greater period end dates with shoter periods ([d9421ab](https://github.com/dhis2/approval-app/commit/d9421abe996224bd877ca3f87d2694887c6f9742))
* **fixed periods:** add getLastSubPeriodForTypeAndPeriod & helpers ([b7a351c](https://github.com/dhis2/approval-app/commit/b7a351cd7f618f8ae3b35011a0dcf3a00f689474))

## [1.6.1](https://github.com/dhis2/approval-app/compare/v1.6.0...v1.6.1) (2021-07-08)


### Bug Fixes

* **workflow-context:** attach additional properties and tests ([#22](https://github.com/dhis2/approval-app/issues/22)) ([407ebf8](https://github.com/dhis2/approval-app/commit/407ebf88b7db732682936aad48d5d79a1fb4eaf8))

# [1.6.0](https://github.com/dhis2/approval-app/compare/v1.5.0...v1.6.0) (2021-07-07)


### Bug Fixes

* code review changes ([376438e](https://github.com/dhis2/approval-app/commit/376438e826cca7868ef4b468feeebbf735442de7))
* tweak lack of data message ([afafe41](https://github.com/dhis2/approval-app/commit/afafe41d24674315ea9e0eebe1e21e8559930af7))
* use theme var for display box shadow ([741b17e](https://github.com/dhis2/approval-app/commit/741b17ef8c13da320b60cf79938d9310988c2b8e))


### Features

* implement non-data states for data workspace display ([27c3940](https://github.com/dhis2/approval-app/commit/27c3940e4dc0b7e501effe8a274770e4d7100f99))
* render data set reports tables ([40cf81e](https://github.com/dhis2/approval-app/commit/40cf81e136094abc4b62cac4b5c37f1277c85082))
* show message if no data set selected ([949eab8](https://github.com/dhis2/approval-app/commit/949eab8bbf7e7181e14e65b1e5eac1860413e9a3))
* start work on display ([466daa5](https://github.com/dhis2/approval-app/commit/466daa56ac25ce8464f633fc22b6ae9cf20ae8bb))

# [1.5.0](https://github.com/dhis2/approval-app/compare/v1.4.1...v1.5.0) (2021-07-07)


### Bug Fixes

* add scrollable prop to TabBar ([d6d290e](https://github.com/dhis2/approval-app/commit/d6d290e6da51a83991bc297c8f540d8c83b59e71))


### Features

* add datasets navigation ([264cb7c](https://github.com/dhis2/approval-app/commit/264cb7c82e9f4c52048b8e97fe2b7c76d2d78b58))

## [1.4.1](https://github.com/dhis2/approval-app/compare/v1.4.0...v1.4.1) (2021-07-07)


### Bug Fixes

* generate translations before linting ([cbf4feb](https://github.com/dhis2/approval-app/commit/cbf4feb9deb1beb2fab3dbc8c322b48f83ff621c))
* handle UNAPPROVED_ABOVE status ([114e1f5](https://github.com/dhis2/approval-app/commit/114e1f5f6469efcc29dd3eaba8e95f0a95aac2b4))
* import src/locales/index.js ([b87eb7d](https://github.com/dhis2/approval-app/commit/b87eb7d6dd51dcbcfa1ddbcb9e156e0b78b72ed3))
* throw on unknown approval state ([ac2f2c7](https://github.com/dhis2/approval-app/commit/ac2f2c712ceb951332ccd323580770937c38446f))
* update @dhis2/ui in order to render status tag icon correctly ([fbf6396](https://github.com/dhis2/approval-app/commit/fbf63966d29033379e9728e6d630c7549af17cbe))

# [1.4.0](https://github.com/dhis2/approval-app/compare/v1.3.0...v1.4.0) (2021-07-06)


### Features

* add status tag and workflow-context ([#13](https://github.com/dhis2/approval-app/issues/13)) ([500628d](https://github.com/dhis2/approval-app/commit/500628d70d1ceceede4209334ad71ad9e92d31d9))

# [1.3.0](https://github.com/dhis2/approval-app/compare/v1.2.0...v1.3.0) (2021-07-05)


### Features

* **context-selector:** add OrgUnitSelect ([#8](https://github.com/dhis2/approval-app/issues/8)) ([0fd36d7](https://github.com/dhis2/approval-app/commit/0fd36d7d329ef9dd800cd014076691acbbc71a44))

# [1.2.0](https://github.com/dhis2/approval-app/compare/v1.1.0...v1.2.0) (2021-07-01)


### Features

* **context-selector:** add period select ([#6](https://github.com/dhis2/approval-app/issues/6)) ([3047b67](https://github.com/dhis2/approval-app/commit/3047b67bd87e0796091e3836fb8157bbd4766997))

# [1.1.0](https://github.com/dhis2/approval-app/compare/v1.0.0...v1.1.0) (2021-06-29)


### Features

* add context selector and workflow select ([#5](https://github.com/dhis2/approval-app/issues/5)) ([37593ff](https://github.com/dhis2/approval-app/commit/37593ffb609cb9b20ed345d97b2b46c853df5e7f))

# 1.0.0 (2021-06-16)


### Features

* general configuration, application layout and directory structure ([#1](https://github.com/dhis2/approval-app/issues/1)) ([80b808d](https://github.com/dhis2/approval-app/commit/80b808d922ef1bc7b812debc3969331afe00820b))

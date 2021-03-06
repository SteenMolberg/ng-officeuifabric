'use strict';

import * as ng from 'angular';

/**
 * @ngdoc enum
 * @name MenuItemTypes
 * @module officeuifabric.components.contextualmenu
 * 
 * @description 
 * Determines which menu template to use, default is `link`
 */
enum MenuItemTypes {
    link = 0,
    divider = 1,
    header = 2,
    subMenu = 3
}

export var contextualMenuItemDirectiveName: string = 'uifContextualMenuItem';

/**
 * @ngdoc interface
 * @name IContextualMenuItemAttributes
 * @module officeuifabric.components.contextualmenu
 * 
 * @description 
 * Attributs for the `<uif-contextual-menu-item>` directive.
 * 
 * @property {string} uifType    - The type of the menu item, based on `MenuItemTypes` enum
 */
interface IContextualMenuItemAttributes extends ng.IAttributes {
    uifType: string;
}

/**
 * @ngdoc directive
 * @name uifContextualMenuItem
 * @module officeuifabric.components.contextualmenu
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-contextual-menu-item>` is a contextual menu item directive.
 * 
 * @see {link http://dev.office.com/fabric/components/contextualmenu}
 * 
 * @usage
 * 
 * <uif-contextual-menu-item uif-text="'Item1'" uif-on-click="menuOnClick()"></uif-contextual-menu-item>
 */
export class ContextualMenuItemDirective implements ng.IDirective {
    public restrict: string = 'E';
    public require: string = '^uifContextualMenu';
    public transclude: boolean = true;
    public controller: any = ContextualMenuItemController;

    public template: ng.IComponentTemplateFn = ($element: ng.IAugmentedJQuery, $attrs: IContextualMenuItemAttributes) => {
        let type: string = $attrs.uifType;

        if (ng.isUndefined(type)) {
            return this.templateTypes[MenuItemTypes.link];
        }

        return this.templateTypes[MenuItemTypes[type]];
    };

    public replace: boolean = true;
    public scope: {} = {
        isDisabled: '=uifIsDisabled',
        isSelected: '=uifIsSelected',
        onClick: '&uifClick',
        text: '=uifText',
        type: '@uifType'
    };

    private templateTypes: { [menuType: number]: string } = {};

    constructor() {
        this.templateTypes[MenuItemTypes.subMenu] =
            `<li class="ms-ContextualMenu-item">
                <a class="ms-ContextualMenu-link ms-ContextualMenu-link--hasMenu" 
                ng-class="{\'is-selected\': isSelected, \'is-disabled\': isDisabled}" ng-click="selectItem()" href>{{text}}</a>
                <i class="ms-ContextualMenu-subMenuIcon ms-Icon ms-Icon--chevronRight"></i>
                <div class="content"></div>
            </li>`;

        this.templateTypes[MenuItemTypes.link] =
            `<li class="ms-ContextualMenu-item">
                <a class="ms-ContextualMenu-link" ng-class="{\'is-selected\': isSelected, \'is-disabled\': isDisabled}" 
                ng-click="selectItem()" href>{{text}}</a>
            </li>`;
        this.templateTypes[MenuItemTypes.header] = `<li class="ms-ContextualMenu-item ms-ContextualMenu-item--header">{{text}}</li>`;
        this.templateTypes[MenuItemTypes.divider] = `<li class="ms-ContextualMenu-item ms-ContextualMenu-item--divider"></li>`;
    }

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ContextualMenuItemDirective();
        return directive;
    }

    public link(
        $scope: IContextualMenuItemScope,
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        contextualMenuController: ContextualMenuController,
        $transclude: ng.ITranscludeFunction): void {

        /*transclude function to follow exact html as in Office UI Fabric, because they are using css selectors like parent ~ child */
        $transclude((clone: JQuery) => {
            $element.find('div').replaceWith(clone);
        });

        $scope.selectItem = () => {
            if (!contextualMenuController.isMultiSelectionMenu()) {
                contextualMenuController.onDeselectItems();
            }

            if (ng.isUndefined($scope.isSelected) && !$scope.isDisabled) {
                $scope.isSelected = true;
            } else {
                $scope.isSelected = !$scope.isSelected;
            }

            /*close all menus if link is clicked, do not close if submenu clicked */
            if (contextualMenuController.isRootMenu()) {
                contextualMenuController.onCloseMenus($scope.$id);
            } else {
                if (!$scope.hasChildMenu) {
                    contextualMenuController.onCloseMenus(null, true);
                    contextualMenuController.onDeselectItems(true);
                } else {
                    contextualMenuController.onCloseMenus($scope.$id);
                }
            }

            if ($scope.hasChildMenu) {
                $scope.childMenuCtrl.openMenu();
            }

            if (!ng.isUndefined($scope.onClick)) {
                $scope.onClick();
            }
        };

        $scope.$on('uif-menu-deselect', () => {
            $scope.isSelected = false;
        });

        $scope.$on('uif-menu-close', (event: ng.IAngularEvent, menuItemId: number) => {
            if ($scope.hasChildMenu && $scope.$id !== menuItemId) {
                $scope.childMenuCtrl.closeMenu();
            }
        });
    }
}

/**
 * @ngdoc interface
 * @name IContextualMenuItemScope
 * @module officeuifabric.components.contextualmenu
 * 
 * @description 
 * This is the scope used by the `<uif-contextual-menu-item>` directive. 
 * 
 * @property {boolean} isSelected    - Indicates if particular item is selected
 * @property {boolean} isDisabled    - Indicates if particular item is disabled
 * @property {boolean} hasChildMenu  - Indicates if current menu item has child sub-menu
 * @property {function} selectItem   - Function which is called by clicking on menu item
 * @property {function} onClick      - On click callback for parent scope
 * @property {object} childMenuCtrl  - Reference to child controller (will be initialized only if `hasChildMenu` is true)
 */
export interface IContextualMenuItemScope extends ng.IScope {
    isSelected?: boolean;
    isDisabled?: boolean;
    hasChildMenu: boolean;

    selectItem: () => void;
    onClick: () => void;

    childMenuCtrl: ContextualMenuController;
}

/**
 * @ngdoc controller
 * @name ContextualMenuItemController
 * @module officeuifabric.components.contextualmenu
 * @description 
 * Controller used for the `<uif-contextual-menu-item>` directive.
 */
export class ContextualMenuItemController {

    public static $inject: string[] = ['$scope', '$element'];

    constructor(private $scope: IContextualMenuItemScope, private $element: ng.IAugmentedJQuery) {
    }

    public setChildMenu(childMenuCtrl: ContextualMenuController): void {
        this.$scope.hasChildMenu = true;
        this.$scope.childMenuCtrl = childMenuCtrl;
    }
}

export var contextualMenuDirectiveName: string = 'uifContextualMenu';

/**
 * @ngdoc directive
 * @name uifContextualMenu
 * @module officeuifabric.components.contextualmenu
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-contextual-menu>` is a contextual menu directive.
 * 
 * @see {link http://dev.office.com/fabric/components/contextualmenu}
 * 
 * @usage
 * 
 * <uif-contextual-menu uif-is-open="isOpen">
 *  <uif-contextual-menu-item uif-text="'Item1'" uif-on-click="menuOnClick()"></uif-contextual-menu-item>
 *  <uif-contextual-menu-item uif-text="'Item2'"></uif-contextual-menu-item>
 * </uif-contextual-menu>
 */
export class ContextualMenuDirective implements ng.IDirective {

    public restrict: string = 'E';
    public require: string = contextualMenuDirectiveName;
    public transclude: boolean = true;
    public template: string = `<ul class="ms-ContextualMenu" ng-transclude></ul>`;
    public replace: boolean = true;
    public controller: any = ContextualMenuController;
    public scope: {} = {
        isOpen: '=uifIsOpen',
        multiselect: '@uifMultiselect'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ContextualMenuDirective();
        return directive;
    }

    public link(
        $scope: IContextualMenuScope,
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        contextualMenuController: ContextualMenuController): void {

        let parentMenuItemCtrl: ContextualMenuItemController = $element.controller(contextualMenuItemDirectiveName);

        if (!ng.isUndefined(parentMenuItemCtrl)) {
            parentMenuItemCtrl.setChildMenu(contextualMenuController);
        }

        if (!ng.isUndefined($scope.multiselect) && $scope.multiselect.toLowerCase() === 'true') {
            $element.addClass('ms-ContextualMenu--multiselect');
        }
    }
}

/**
 * @ngdoc interface
 * @name IContextualMenuItemScope
 * @module officeuifabric.components.contextualmenu
 * 
 * @description
 * This is the scope used by the `<uif-contextual-menu-item>` directive.
 * 
 * @property {boolean} isOpen        - Indicates if menu is open
 * @property {boolean} isRootMenu    - Indicates if this is root menu and not child
 * @property {string} multiselect    - Indicates if current menu is multiselection menu
 */
export interface IContextualMenuScope extends ng.IScope {
    isOpen: boolean;
    isRootMenu: boolean;
    multiselect: string;
}

/**
 * @ngdoc controller
 * @name ContextualMenuController
 * @module officeuifabric.components.contextualmenu
 * @description
 * Controller used for the `<uif-contextual-menu>` directive.
 */
export class ContextualMenuController {

    public static $inject: string[] = ['$scope', '$animate', '$element'];
    private isOpenClassName: string = 'is-open';

    constructor(private $scope: IContextualMenuScope, private $animate: ng.animate.IAnimateService, private $element: ng.IAugmentedJQuery) {

        if (ng.isUndefined($element.controller(contextualMenuItemDirectiveName))) {
            $scope.isRootMenu = true;
        }

        $scope.$watch('isOpen', (newValue: boolean) => {
            $animate[newValue ? 'addClass' : 'removeClass']($element, this.isOpenClassName);
        });
    }

    public onDeselectItems(deselectParentMenus?: boolean): void {
        this.$scope.$broadcast('uif-menu-deselect');
        if (deselectParentMenus) {
            this.$scope.$emit('uif-menu-deselect');
        }
    }

    public onCloseMenus(menuItemToSkip?: number, closeRootMenu?: boolean): void {
        if (closeRootMenu) {
            this.$scope.$emit('uif-menu-close');
        } else {
            this.$scope.$broadcast('uif-menu-close', menuItemToSkip);
        }
    }

    public openMenu(): void {
        this.$scope.isOpen = true;
    }

    public closeMenu(): void {
        this.$scope.isOpen = false;
    }

    public isRootMenu(): boolean {
        return this.$scope.isRootMenu;
    }

    public isMultiSelectionMenu(): boolean {
        if (ng.isUndefined(this.$scope.multiselect)) {
            return false;
        }

        return this.$scope.multiselect.toLowerCase() === 'true';
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.contextualmenu
 * 
 * @description 
 * Contextual Menu Module
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.contextualmenu', [
    'officeuifabric.components'])
    .directive(contextualMenuDirectiveName, ContextualMenuDirective.factory())
    .directive(contextualMenuItemDirectiveName, ContextualMenuItemDirective.factory());

'use strict';

import * as ng from 'angular';
<<<<<<< HEAD
import {OrgChartPresenceEnum} from './orgChartPresenceEnum';
import {OrgChartSelectModeEnum} from './orgChartSelectModeEnum';

describe('orgChartDirective: <uif-org-chart />', () => {

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.orgchart');
  });


  describe('OrgChartGroupFilter', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: ng.ILogService;
    let sample: any;

    let html: string = `
      <uif-org-chart>
        <uif-org-chart-group ng-repeat="team in data | uifOrgChartGroupBy: \'team\'">
          <uif-org-chart-group-title>{{team}}</uif-org-chart-group-title>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data | filter: {'team': team}" >
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function, $log: ng.ILogService) => {
      scope = $rootScope;
      compile = $compile;
      log = $log;

      // sample data
      sample = [
        {
            country: 'Denmark',
            imageUrl: 'Persona.Person2.png',
            name: 'Kevin Magnussen',
            presence: 'available',
            selected: false,
            team: 'Renault'
        },
        {
            country: '	Germany',
            imageUrl: 'Persona.Person2.png',
            name: 'Sebastian Vettel',
            presence: 'busy',
            selected: false,
            team: 'Ferrari'
        },
        {
            country: '	United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Jolyon Palmer',
            presence: 'away',
            selected: false,
            team: 'Renault'
        },
        {
            country: 'United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Lewis Hamilton',
            presence: 'blocked',
            selected: false,
            team: '	Mercedes'
        }
      ];

    }));

    it('should render expected groups', () => {

      // expect 3 groups given the sample data

      scope.data = sample;

      element = ng.element(html);
      compile(element)(scope);
      scope.$digest();

      expect(element.children().length).toEqual(3);

    });




  });

  describe('orgchart <org-chart />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: ng.ILogService;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function, $log: ng.ILogService) => {
      scope = $rootScope;
      compile = $compile;
      log = $log;
    }));

    it('should render DIV with class \'ms-OrgChart\'', () => {

      element = ng.element('<uif-org-chart>TEST</uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart');
      expect(element).toHaveText('TEST');

    });

    it('should not log error on correct select-mode', () => {

      Object.keys(OrgChartSelectModeEnum)
        .filter((i: any) => ng.isNumber(i))
        .forEach((selectMode: any) => {

          element = ng.element(`<uif-org-chart uif-select-mode="` + selectMode + `"></uif-org-chart`);
          compile(element)(scope);
          scope.$digest();

        });

      expect(log.error.logs.length).toEqual(0);

    });

    it('should log error on invalid select-mode', () => {

        element = ng.element(`<uif-org-chart uif-select-mode="INVALID"></uif-org-chart`);
        compile(element)(scope);
        scope.$digest();

        expect(log.error.logs.length).toEqual(1);

    });

  });

  describe('orgchartgroup <org-chart-group />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-OrgChart-group\'', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {

      element = $compile('<uif-org-chart-group>TEST</uif-org-chart-group>')(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart-group');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgchartgrouptitle <org-chart-group-title />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-OrgChart-groupTitle\'', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {

      element = $compile('<uif-org-chart-group-title>TEST</uif-org-chart-group-title>')(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart-groupTitle');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgChartPersonaDirective <org-chart-persona />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: ng.ILogService;
    let sample: any;

    let htmlSingleSelect: string = `
      <uif-org-chart uif-select-mode="single" uif-selected-items="selectedItems">
        <uif-org-chart-group>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data"
                                  uif-item="person"
                                  uif-selected="person.selected">
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    let htmlMultipleSelect: string = `
      <uif-org-chart uif-select-mode="multiple" uif-selected-items="selectedItems">
        <uif-org-chart-group>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data"
                                  uif-item="person"
                                  uif-selected="person.selected">
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function, $log: ng.ILogService) => {

      scope = $rootScope;
      compile = $compile;
      log = $log;

      // sample data
      sample = [
        {
            country: 'Denmark',
            imageUrl: 'Persona.Person2.png',
            name: 'Kevin Magnussen',
            presence: 'available',
            selected: false,
            team: 'Renault'
        },
        {
            country: '	Germany',
            imageUrl: 'Persona.Person2.png',
            name: 'Sebastian Vettel',
            presence: 'busy',
            selected: false,
            team: 'Ferrari'
        },
        {
            country: '	United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Jolyon Palmer',
            presence: 'away',
            selected: false,
            team: 'Renault'
        },
        {
            country: 'United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Lewis Hamilton',
            presence: 'blocked',
            selected: false,
            team: '	Mercedes'
        }
      ];

    }));

    it('should render LI with class \'ms-Orgchart-listItem\' and nested DIV with class \'ms-Persona\'', () => {

      element = ng.element('<uif-org-chart><uif-org-chart-persona>TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);

      expect(liElement.prop('tagName')).toEqual('LI');
      expect(liElement).toHaveClass('ms-OrgChart-listItem');

      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement.prop('tagName')).toEqual('DIV');
      expect(divElement).toHaveClass('ms-Persona');

    });

    it('should render class \'ms-Persona--square\' when uif-style square', () => {

      element = ng.element('<uif-org-chart><uif-org-chart-persona uif-style="square" >TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).toHaveClass('ms-Persona--square');

    });

    it('should not render class \'ms-Persona--square\' when uif-style standard', () => {

      element = ng.element('<uif-org-chart><uif-org-chart-persona uif-style="standard" >TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).not.toHaveClass('ms-Persona--square');

    });

    it('should not render class \'ms-Persona--square\' when no uif-style', () => {

      element = ng.element(`<uif-org-chart>
                             <uif-org-chart-persona uif-style="standard" >TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).not.toHaveClass('ms-Persona--square');

    });

    it('should throw error when invalid uif-style', () => {

      element = ng.element(`<uif-org-chart >
                              <uif-org-chart-persona uif-style="INVALID" >TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      expect(log.error.logs.length).toEqual(1);

    });

    it('should not log error on correct presence-type', () => {

      Object.keys(OrgChartPresenceEnum)
        .filter((i: any) => ng.isNumber(i))
        .forEach((presenceType: any) => {

        element = ng.element(`<uif-org-chart>
                                <uif-org-chart-persona uif-presence="` + presenceType + `">TEST</uif-org-chart-persona>
                              </uif-org-chart>`);
        compile(element)(scope);
        scope.$digest();

        });

      expect(log.error.logs.length).toEqual(0);

    });

    it('should log error on invalid presence-type', () => {

      scope.person = {
        status: 'INVALID'
      };

      element = ng.element(`<uif-org-chart >
                                  <uif-org-chart-persona uif-presence="person.status">TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      expect(log.error.logs.length).toEqual(1);

    });

    it('should select only 1 item when in single-mode even if more items has uif-selected=true', () => {

      scope.data = sample.slice(0);
      scope.data[0].selected = true;
      scope.data[2].selected = true;
      scope.selectedItems = [];

      element = ng.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(1);

    });

    it('Should select expected items when in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.data[0].selected = true;
      scope.data[2].selected = true;
      scope.selectedItems = [];

      element = ng.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(2);

    });

    it('should toggle \'is-selected\' class when clicked', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = ng.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(personaElement).toHaveClass('is-selected');

      personaElement.triggerHandler('click');
      expect(personaElement).not.toHaveClass('is-selected');

    });

    it('should select/unselect item when clicked in single-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = ng.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(0);

    });

    it('should select/unselect item when clicked in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = ng.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(0);

    });

    it('should unselect item when another is clicked when in single-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = ng.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let firstPersonaElement: JQuery = listElement.children().eq(0).children().eq(0);
      let lastPersonaElement: JQuery = listElement.children().eq(3).children().eq(0);

      firstPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      lastPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

    });

    it('should not unselect item when another is clicked in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = ng.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let firstPersonaElement: JQuery = listElement.children().eq(0).children().eq(0);
      let lastPersonaElement: JQuery = listElement.children().eq(3).children().eq(0);

      firstPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      lastPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(2);

    });

  });

  describe('orgChartImageDirective <org-chart-image />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-imageArea\'', () => {

      element = ng.element('<uif-org-chart-image  ng-src="TEST"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-imageArea');

    });

    it('should contain I with classes \'ms-Persona-placeholder\' and \'ms-Icon\' and \'ms-Icon--person\'', () => {

      element = ng.element('<uif-org-chart-image ng-src="test.jpg"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.children().eq(0).prop('tagName')).toEqual('I');
      expect(element.children().eq(0)).toHaveClass('ms-Persona-placeholder');
      expect(element.children().eq(0)).toHaveClass('ms-Icon');
      expect(element.children().eq(0)).toHaveClass('ms-Icon--person');

    });

    it('should render IMG with class \'ms-Persona-image\'', () => {

      element = ng.element('<uif-org-chart-image ng-src="test.jpg"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.children().eq(1).prop('tagName')).toEqual('IMG');
      expect(element.children().eq(1)).toHaveClass('ms-Persona-image');

    });

    it('should render IMG with src set to image-url', () => {

      scope.person = {
        imageUrl: 'http://test/test.jpg'
      };

      element = ng.element('<uif-org-chart-image ng-src="person.imageUrl"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      let imgElement: JQuery = element.children().eq(1);

      expect(imgElement.prop('src')).toEqual('http://test/test.jpg');

    });

  });


  describe('orgchartpresence <uif-org-chart-presence />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-presence\'', () => {

      scope.person = {
        status: 'away'
      };

      element = ng.element(`
        <uif-org-chart>
            <uif-org-chart-persona uif-status="person.status">
              <uif-org-chart-presence></uif-org-chart-presence>
            </uif-org-chart-persona>
          </uif-org-chart>
      `);

      compile(element)(scope);
      scope.$digest();

      let listElement: JQuery = element.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0);
      let presenceElement: JQuery = personaElement.children().eq(0);

      expect(presenceElement.prop('tagName')).toEqual('DIV');
      expect(presenceElement).toHaveClass('ms-Persona-presence');

    });

    it('should not render if status is missing', () => {

      element = ng.element(`
        <uif-org-chart>
            <uif-org-chart-persona uif-status="person.status">
              <uif-org-chart-presence></uif-org-chart-presence>
            </uif-org-chart-persona>
          </uif-org-chart>
      `);

      compile(element)(scope);
      scope.$digest();

      let listElement: JQuery = element.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0);
      let presenceElement: JQuery = personaElement.children().eq(0);

      expect(presenceElement.prop('tagName')).toEqual('DIV');
      expect(presenceElement).toHaveClass('ms-Persona-presence');
      expect(presenceElement).toHaveCss({display: 'none'});

    });

  });

  describe('orgChartDetailsDirective <org-chart-details />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-Persona-details\'', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {

      element = ng.element('<uif-org-chart-details>TEST</uif-org-chart-details>');
      $compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-details');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgchartprimarytext <org-chart-primary-text />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-primaryText\' and transclude', () => {

      element = ng.element('<uif-org-chart-primary-text>TEST</uif-org-chart-primary-text>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-primaryText');
      expect(element).toHaveText('TEST');

    });

  });

  describe('orgchartsecondarytext <org-chart-secondary-text />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-secondaryText\' and transclude', () => {

      element = ng.element('<uif-org-chart-secondary-text>TEST</uif-org-chart-secondary-text>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-secondaryText');
      expect(element).toHaveText('TEST');

    });

  });
=======

describe('orgChartDirective: <uif-org-chart />', () => {
    let element: JQuery;
    let scope: any;

    // sample data

    let items: any = [
        {
            department: 'Good guys',
            firstname: 'Luke',
            imageUrl: 'Persona.Person2.png',
            name: 'Luke Skywalker',
            presence: 'available',
            title: 'Hero'
        },
        {
            department: 'Bad guys',
            firstname: 'Darth',
            imageUrl: 'Persona.Person2.png',
            name: 'Darth Vader',
            presence: 'busy',
            title: 'Right hand'
        },
        {
            department: 'Good guys',
            firstname: 'Han',
            imageUrl: 'Persona.Person2.png',
            name: 'Han Solo',
            presence: 'away',
            title: 'Hero'
        },
        {
            department: 'Bad guys',
            firstname: 'Emperor',
            imageUrl: 'Persona.Person2.png',
            name: 'Mr. Emperor',
            presence: 'blocked',
            title: 'Emperor Supreme'
        }
    ];

    let htmlMinimalTag: string = '<uif-org-chart></uif-org-chart>';
    let htmlMinimalWithData: string = '<uif-org-chart uif-items="items" ></uif-org-chart>';

    let htmlNotGroupedDefaultStyle: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" > </uif-org-chart>';
    let htmlGroupedSquareStyle: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-style="square" > </uif-org-chart>';

    let htmlSelectableSingle: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-select-mode="single" '
        + 'uif-selected-items="selected" > </uif-org-chart>';
    let htmlSelectableMulti: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-select-mode="multiple" '
        + 'uif-selected-items="selected" > </uif-org-chart>';

    let htmlErrorStyle: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" uif-style="notvalid" > </uif-org-chart>';
    let htmlErrorSelectMode: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" uif-select-mode="notvalid" > </uif-org-chart>';

    // setup

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.orgchart');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        scope = $rootScope;
        scope.items = items;
        scope.selected = [];
    }));


    // basic rendering tests

    it('should render orgchart DIV with correct class \'ms-OrgChart\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalTag);
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('DIV');
        expect(element).toHaveClass('ms-OrgChart');
    }));

    it('should render group DIV with correct class \'ms-OrgChart-group\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).prop('tagName')).toEqual('DIV');
        expect(element.children().eq(0)).toHaveClass('ms-OrgChart-group');
    }));

    it('should render group title DIV with correct class \'ms-OrgChart-groupTitle\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(0).prop('tagName')).toEqual('DIV');
        expect(element.children().eq(0).children().eq(0)).toHaveClass('ms-OrgChart-groupTitle');
    }));

    it('should render group UL with correct class \'ms-OrgChart-list\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(1).prop('tagName')).toEqual('UL');
        expect(element.children().eq(0).children().eq(1)).toHaveClass('ms-OrgChart-list');
    }));

    it('should render person LI with correct class \'ms-OrgChart-listItem\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        expect(listElement.prop('tagName')).toEqual('LI');
        expect(listElement).toHaveClass('ms-OrgChart-listItem');
    }));

    it('should render person div with correct class \'ms-Persona\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        expect(personElement.prop('tagName')).toEqual('DIV');
        expect(personElement).toHaveClass('ms-Persona');
    }));

    it('should render person imageArea div with correct class \'ms-Persona-imageArea\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageElement: JQuery = personElement.children().eq(0);
        expect(imageElement.prop('tagName')).toEqual('DIV');
        expect(imageElement).toHaveClass('ms-Persona-imageArea');
    }));

    it('should render person imageArea i with classes \'ms-Persona-placeHolder\' \'ms-Icon\' \'ms-Icon-person\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageElement: JQuery = personElement.children().eq(0);
        expect(imageElement.children().eq(0).prop('tagName')).toEqual('I');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Persona-placeholder');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Icon');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Icon--person');
    }));

    it('should render person imageArea img with class \'ms-Persona-image\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageAreaElement: JQuery = personElement.children().eq(0);
        expect(imageAreaElement.children().eq(1).prop('tagName')).toEqual('IMG');
        expect(imageAreaElement.children().eq(1)).toHaveClass('ms-Persona-image');
    }));

    it('should render person presence div with correct class \'ms-Persona-presence\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        expect(personElement.children().eq(1).prop('tagName')).toEqual('DIV');
        expect(personElement.children().eq(1)).toHaveClass('ms-Persona-presence');
    }));

    it('should render person details div with correct class \'ms-Persona-details\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.prop('tagName')).toEqual('DIV');
        expect(detailsElement).toHaveClass('ms-Persona-details');
    }));

    it('should render person details primarytext div with correct class \'ms-Persona-primaryText\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(0).prop('tagName')).toEqual('DIV');
        expect(detailsElement.children().eq(0)).toHaveClass('ms-Persona-primaryText');
    }));

    it('should render person details primarytext div with correct class \'ms-Persona-secondaryText\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(1).prop('tagName')).toEqual('DIV');
        expect(detailsElement.children().eq(1)).toHaveClass('ms-Persona-secondaryText');
    }));

    it('should render correct number of items',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let listElements: JQuery = ulElement.children();
        expect(listElements.length).toEqual(4);
    }));

    // group
    it('should render group title div when uif-group is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let groupElement: JQuery = element.children().eq(0);
        expect(groupElement.children().eq(0).html()).toEqual('Good guys');
    }));

    it('should render multiple groups when uif-group is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let groups: JQuery = element.children();
        expect(groups.length).toEqual(2);
    }));

    // primarytext
    it('should render primary text when uif-primary-text is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(0).text()).toEqual('Luke Skywalker');
    }));

    // secondary text
    it('should render secondary text when uif-secondary-text is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(1).text()).toEqual('Hero');
    }));

    // image
    it('should render image src with uif-image if supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageAreaElement: JQuery = personElement.children().eq(0);
        expect(imageAreaElement.children().eq(1)).toHaveAttr('SRC');
    }));

    // presence
    it('should render persona DIV with with uif-presence is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--available');
        expect(ulElement.children().eq(1).children().eq(0)).toHaveClass('ms-Persona--busy');
        expect(ulElement.children().eq(2).children().eq(0)).toHaveClass('ms-Persona--away');
        expect(ulElement.children().eq(3).children().eq(0)).toHaveClass('ms-Persona--blocked');
    }));

    // style
    it('should render persone DIV with \'ms-Persone--square is uif-style is \'square\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children();
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--square');
    }));

    // selectMode
    it('should render render person div with class \'ms-Persona--selectable\' when uif-select-mode=\'multi\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableMulti);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--selectable');
    }));

    it('should render render person div with class \'ms-Persona--selectable\' when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--selectable');
    }));

    it('should throw an error if invalid value is supplied for uif-select-mode',
       inject(($compile: Function, $rootScope: ng.IRootScopeService, $log: ng.ILogService) => {
        element = ng.element(htmlErrorSelectMode);
        $compile(element)(scope);
        scope.$digest();
        expect($log.error.logs.length).toEqual(1);
    }));

    it('should throw an error if invalid value is supplied for uif-select-mode',
       inject(($compile: Function, $rootScope: ng.IRootScopeService, $log: ng.ILogService) => {
        element = ng.element(htmlErrorStyle);
        $compile(element)(scope);
        scope.$digest();
        expect($log.error.logs.length).toEqual(1);
    }));

    it('should render class \'is-selected\' on person DIV if person is selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        expect(personElement).toHaveClass('is-selected');
    }));

    it('should remove class \'is-selected\' on person DIV if person is selected and unselected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        personElement.triggerHandler('click');
        expect(personElement).not.toHaveClass('is-selected');
    }));

    // selectable single
    it('should contain one item in collection supplied in uif-selected-items person is selected when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        expect(scope.selected.length).toEqual(1);
    }));

    it('should contain zero selected items when person is selected and unselected when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        personElement.triggerHandler('click');
        expect(scope.selected.length).toEqual(0);
    }));

    it('should contain one item in collection supplied in uif-selected-items if two different persons are selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let person1Element: JQuery = ulElement.children().eq(0).children().eq(0);
        let person2Element: JQuery = ulElement.children().eq(1).children().eq(0);
        person1Element.triggerHandler('click');
        person2Element.triggerHandler('click');
        expect(scope.selected.length).toEqual(1);
    }));

    // selectable multi
    it('should contain two items in collection supplied in uif-selected-items if two different persons are selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableMulti);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let person1Element: JQuery = ulElement.children().eq(0).children().eq(0);
        let person2Element: JQuery = ulElement.children().eq(1).children().eq(0);
        person1Element.triggerHandler('click');
        person2Element.triggerHandler('click');
        expect(scope.selected.length).toEqual(2);
    }));


>>>>>>> 6dbc40787cf4a31950fc7bc1e701b5deeb70fa13

});

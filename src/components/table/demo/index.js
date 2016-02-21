'use strict';

var demoApp = angular.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.table'
]);

demoApp.controller('demoController', [
    '$scope', demoController]);

function demoController($scope) {
    $scope.files = [
        {
            fileName: 'file1.txt',
            location: '~/file1.txt',
            modified: new Date(),
            type: 'TXT',
            size: 20,
            isSelected: false
        },
        {
            fileName: 'file2.docx',
            location: '~/file2.docx',
            modified: new Date(),
            type: 'DOCX',
            size: 5,
            isSelected: true
        },
        {
            fileName: 'file3.txt',
            location: '~/file3.txt',
            modified: new Date(),
            type: 'TXT',
            size: 10,
            isSelected: false
        }
    ];


            $scope.files2 = [
        {
            fileName: 'file1.txt',
            location: '~/file1.txt',
            modified: new Date(),
            type: 'TXT',
            size: 20,
            isSelected: false
        },
        {
            fileName: 'file2.docx',
            location: '~/file2.docx',
            modified: new Date(),
            type: 'DOCX',
            size: 5,
            isSelected: true
        },
        {
            fileName: 'file3.txt',
            location: '~/file3.txt',
            modified: new Date(),
            type: 'TXT',
            size: 10,
            isSelected: false
        }
    ];


    $scope.showSelected = function(){

      console.log($scope.table.selectedItems);

    }

    $scope.showFiles = function(){

      console.log($scope.files);

    }


}

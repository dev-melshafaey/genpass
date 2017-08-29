var app = angular.module('GenPass', ['angular-clipboard']);
app.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.passType = 'letters';
        $scope.bulktype = 'letters';
        $scope.genLetters = function (string_length, chars) {
            //console.log(string_length)
            var randomstring = '';
            var charCount = 0;
            var numCount = 0;
            //console.log(Math.floor(.75*string_length))
            for (var i = 0; i < string_length; i++) {
                if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= Math.floor(.75*string_length)) {
                    var rnum = Math.floor(Math.random() * 10);
                    randomstring += rnum;
                    numCount += 1;
                } else {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                    charCount += 1;
                }
            }          

            return randomstring;
        };
        $scope.genPass = function (passCase, passLength, passType) {
            var chars = "";
            if (passCase === 'upper') {
                chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            } else if (passCase === 'lower') {
                chars = "abcdefghijklmnopqrstuvwxyz";
            } else {
                chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            }

            var symbols = "!@#$%&";
            var string_length = passLength === "515" ? Math.floor(Math.random() * (20 - 5 + 1) + 5) : passLength;
            //console.log(string_length >= 5 && string_length <= 20);
            var randomstring = '';
            if (passType === 'letters') {
                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }
            }
            else if (passType === 'letnum') {
                randomstring = $scope.genLetters(string_length, chars);
            } else if (passType === 'letnumsym') {
                var str = symbols + chars + symbols;
                var shuffled = str.split('').sort(function () {
                    return 0.5 - Math.random();
                }).join('');
                randomstring = $scope.genLetters(string_length, shuffled);
                if (/^[a-zA-Z0-9- ]*$/.test(randomstring) === true) {
                    randomstring = randomstring.substr(0, 1) + '$' + randomstring.substr(1 + 1);
                }
            }
            return randomstring;
        };
        $scope.supported = false;
        $scope.success = function () {
            //console.log('Copied!');
        };
        $scope.fail = function (err) {
            //console.error('Error!', err);
        };

        $scope.generateSingle = function () {
            $scope.result = $scope.genPass($scope.passCase, $scope.passLength, $scope.passType);
            //console.log($scope.result.length)
            if ($scope.result) {
                $('#new_password').val($scope.result).keyup();
            }
        };

        $scope.generateBulk = function () {
            var result = [];
            for (var i = 0; i < $scope.noOfPasswords; i++) {
                result[i] = $scope.genPass($scope.bulkcase, $scope.bulklength, $scope.bulktype);
                //console.log(result[i].length);
            }
            $scope.bulkresult = result.join('\r\n');
        };

        $scope.saveFile = function () {
            var file = new File([$scope.bulkresult], "passwords.txt", {type: "text/plain;charset=utf-8"});
            saveAs(file);
        };
    }]);
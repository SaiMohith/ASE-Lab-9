'use strict';

// Declare app level module which depends on views, and components
angular.module('Mash', [])

//translate key trnsl.1.1.20170324T033031Z.ac046b73b5d23b7c.5ea5f242ad49ab05a4870354ee70f363a6e2f3aa
    .controller('View1Ctrl', function ($scope, $http) {
      $scope.result= " ";
        $scope.translate = function () {
            var words = document.getElementById("Text").value;

            if (words != null && words != "") {
                document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives you the text converted to different language.
                var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20170324T033031Z.ac046b73b5d23b7c." +
                "5ea5f242ad49ab05a4870354ee70f363a6e2f3aa&text=" + words +"&" +
                "lang=en-it&[format=plain]&[options=1]&[callback=set]");
                handler.success(function (data) {

                    if (data != null) {
                        $scope.result=data.text;
                        }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
        $scope.sentiment = function (text) {
            if (text != null) {
                //This is the API call being made to get the sentiment analysis for the selected text.
                var handler = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                    "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                    "&outputMode=json&text=" +text);
                handler.success(function (result) {
					console.log(result);
                    if (result != null&&result.docSentiment!==null) {
                        
                                $scope.ReviewWithSentiment = {
                                                            "sentiment":result.docSentiment.type,
                                                             "score":result.docSentiment.score  };
                                document.getElementById('div_ReviewList').style.display = 'block';
                    }
					else
					{

					}
                })
                handler.error(function (result) {
                    alert("Error processing your request. Please try after some time.")
            });

        }
      }

    });

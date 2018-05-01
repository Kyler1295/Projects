var apiTestKey = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Hopoffplease?api_key=RGAPI-f0ac69be-4081-4388-940b-aaf4cd3b3fd5'


var Summoner = fetch(apiTestKey).then(function(response){return response.json();}).then((jsonResponse) => console.log(jsonResponse));
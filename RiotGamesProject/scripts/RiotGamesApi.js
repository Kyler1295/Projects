    class Champion {
        constructor(champID, champKey, name, armor, armorpl, ad, adpl, attrng, attspdpl, hp, hppl, hpregen, hpregenpl, ms, mana, manapl, manareg, manaregpl, mr, mrpl, spells, passive,  show) {
            this.champID = champID;
            this.champKey = champKey;
            this.name = name;
            this.armor = armor;
            this.armorpl = armorpl;
            this.ad = ad;
            this.adpl = adpl;
            this.attrng = attrng;
            this.attspdpl = attspdpl;
            this.hp = hp;
            this.hppl = hppl;
            this.hpregen = hpregen;
            this.hpregenpl = hpregenpl;
            this.ms = ms;
            this.mana = mana;
            this.manapl = manapl;
            this.manareg = manareg;
            this.manaregpl = manaregpl;
            this.mr = mr;
            this.mrpl = mrpl;
            this.spells = spells;
            this.passive = [];
            this.show = false;
        }
    }

    const app = new Vue({
        el: '#app',
        data: {
            championSearch: '',
            champions: []
        },
        mounted() {
            fetch('RiotAPIResponse.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    return Object.entries(data)
                })
                .then((jsonResponse) => {
                    Object.entries(jsonResponse[2][1]).forEach(element => {
                        let newChampion = new Champion(
                            element[1].id,
                            element[1].key,
                            element[1].name,
                            element[1].stats.armor,
                            element[1].stats.armorperlevel,
                            element[1].stats.attackdamage,
                            element[1].stats.attackdamageperlevel,
                            element[1].stats.attackrange,
                            element[1].stats.attackspeedperlevel,
                            element[1].stats.hp,
                            element[1].stats.hpperlevel,
                            element[1].stats.hpregen,
                            element[1].stats.hpregenperlevel,
                            element[1].stats.movespeed,
                            element[1].stats.mp,
                            element[1].stats.mpperlevel,
                            element[1].stats.mpregen,
                            element[1].stats.mpregenperlevel,
                            element[1].stats.spellblock,
                            element[1].stats.spellblockperlevel,
                            element[1].spells
                        )

                        newChampion.passive = getChampionPassive(newChampion.champID);

                        function getChampionPassive(id) {
                            fetch('https://na1.api.riotgames.com/lol/static-data/v3/champions/' + id +'?locale=en_US&champData=passive&api_key=RGAPI-b060ac42-3470-4ed5-ae5b-fff6a0f9b1dc')
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (data) {
                                    return Object.entries(data)
                                })
                                .then((jsonResponse) => {
                                    console.log(jsonResponse);
                                });
                        }
                        

                        this.champions.push(newChampion);

                    });
                }).then(() => {
                    this.champions.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                })
        },
        methods: {
            closeAll(championName) {
                this.champions.forEach(champion => {
                    if(championName == champion.name && champion.show != true){
                        champion.show = true
                    } else {
                        champion.show = false
                    }
                });
            }
        },
        computed: {
            championSearchResults() {
                return this.champions.filter((champion) => {
                    return champion.name.toLowerCase().includes(this.championSearch.toLowerCase());
                });
            }
        }
    });
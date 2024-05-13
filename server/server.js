const axios= require('axios');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiKey = "RGAPI-ab9c6771-9f44-45f9-9438-6dfc91b17672"

app.use(express.json());
app.use(cors());
//aOSaXJGP55zBGcFcNPdnl3Msn1S_ujD39sz4QKGTispQfj0dKB1j7foVBoqejo5mv2tj90OiJ9yI0Q
const imagePath = path.join(__dirname, 'dragontail-14.8.1', '14.8.1', 'img', 'champion');
app.use('/images', express.static(imagePath));
app.post('/', async (req,res)=>{
    try{
        console.log("got a req")
        const formData = {
            name:req.body.Name,
            tag:req.body.Tag,
        }
        //aOSaXJGP55zBGcFcNPdnl3Msn1S_ujD39sz4QKGTispQfj0dKB1j7foVBoqejo5mv2tj90OiJ9yI0Q
        const championsList = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
        //get acc info
        const riotAccountIdResponse = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${formData.name}/${formData.tag}?api_key=${apiKey}`);
        const riotAccountIdData = riotAccountIdResponse.data;
        const puuid = riotAccountIdData.puuid;    
        
       //get top champions
        const championMasteriesResponse = await axios.get(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`);
        const championMasteriesData = championMasteriesResponse.data;
        const highestChamp = championMasteriesData[0].championId;
        const secondHighest = championMasteriesData[1].championId;
        const thirdHighest = championMasteriesData[2].championId;
        const champData = championsList.data.data;
        //get summonerData
        const summonerData= await axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`);
        const summonerID = summonerData.data.id;
        const ranks = await axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${apiKey}`);
        let flexData;
        let SoloDuoData;
        if(ranks.data[0].queueType=="RANKED_SOLO_5x5"){
            flexData = {
                tier:ranks.data[1].tier,
                rank: ranks.data[1].rank,
                points: ranks.data[1].leaguePoints
            }
             SoloDuoData = {
                tier:ranks.data[0].tier,
                rank: ranks.data[0].rank,
                points: ranks.data[0].leaguePoints
            }
        }else{
            flexData = {
                tier:ranks.data[0].tier,
                rank: ranks.data[0].rank,
                points: ranks.data[0].leaguePoints
            }
             SoloDuoData = {
                tier:ranks.data[1].tier,
                rank: ranks.data[1].rank,
                points: ranks.data[1].leaguePoints
            }
        }
        
        //get match history aOSaXJGP55zBGcFcNPdnl3Msn1S_ujD39sz4QKGTispQfj0dKB1j7foVBoqejo5mv2tj90OiJ9yI0Q
        const recentMatches = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`);
        const matchChamp = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${recentMatches.data[0]}?api_key=${apiKey}`)
        console.log(matchChamp)
        //group data
        const data = {
            first:Object.values(champData).find(champion => champion.key==highestChamp),
            second:Object.values(champData).find(champion => champion.key==secondHighest),
            third:Object.values(champData).find(champion => champion.key==thirdHighest),
            profileIconID:summonerData.data.profileIconId,
            summonerLevel:summonerData.data.summonerLevel,
            matchesData:recentMatches.data,
            flexData:flexData,
            SoloDuoData:SoloDuoData
        }


        res.send(data);
        console.log(puuid)
        console.log(summonerID)
    }catch(err){
        console.log(err)
    }
  

})
app.listen(5000, ()=>{console.log("Listening on port 5000")})
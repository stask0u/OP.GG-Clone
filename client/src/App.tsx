//C:\Users\stani\OneDrive\Desktop\asdgfdfg
import { useState } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Icons from "./components/Icons";
import MatchHistory from "./components/MatchHistory";

interface TopMasteries {
  name:string
  id:string
  path: string
}
interface Ranks{
  tier:string
  rank:string
  points:number
}
function App() {

  const [first,setFirst] = useState<TopMasteries>();
  const [second,setSecond] = useState<TopMasteries>();
  const [third, setThird] = useState<TopMasteries>();
  const [iconId, setIconId] = useState('');
  const [summonerLevel, setSummonerLevel] = useState(0);
  const [flexData, setFlexData] = useState<Ranks>({tier:"undefined",rank:"undefined",points:999});
  const [SoloDuoData, setSoloDuoData] = useState<Ranks>({tier:"undefined",rank:"undefined",points:999});
  const [matchesData,setMatchesData] = useState([]);
  const [name,setName] = useState('');
  

  const handleData = async (input:string) => {
    const [nameValue, tagValue] = input.split('#');
    setName(nameValue);
    try {
      const formData = {
        Name:nameValue,
        Tag:tagValue
      };
        const response = await axios.post("http://localhost:5000" , formData)
        setFirst(response.data.first)
        setSecond(response.data.second)
        setThird(response.data.third)
        setIconId(response.data.profileIconID)
        setSummonerLevel(response.data.summonerLevel)
        setMatchesData(response.data.matchesData)
        setSoloDuoData({tier:response.data.SoloDuoData.tier,rank:response.data.SoloDuoData.rank,points:response.data.SoloDuoData.points})
        setFlexData({tier:response.data.flexData.tier,rank:response.data.flexData.rank,points:response.data.flexData.points});
        console.log(SoloDuoData)
    }catch(error){
      console.error(error)
    }
  }
  return (
    <>
    <SearchBar onSubmit={handleData}/>
    <div className="infoBoard">
      <div className="Icons">
        <Icons topChamp={first} SecondChamp={second} ThirdChamp={third} summonerName={name} profileIconId={iconId} summonerLevel={summonerLevel} soloduo={SoloDuoData} flex={flexData} />
      </div>
      <div className="matchHistory">
        <MatchHistory matchHistory={matchesData}></MatchHistory>
      </div>
    </div>

    </>
  );
}

export default App;

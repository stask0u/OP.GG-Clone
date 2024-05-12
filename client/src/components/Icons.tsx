import { useState, useEffect } from "react";
import "./Icons.css";

interface TopMasteries {
    name:string
    id:string
    path:string
  }
  interface Ranks{
    tier:string
    rank:string
    points:number
  }

function Icons({ topChamp, SecondChamp, ThirdChamp, summonerName, profileIconId, summonerLevel, soloduo,flex }: { topChamp?: TopMasteries; SecondChamp?: TopMasteries; ThirdChamp?: TopMasteries;summonerName?:string;profileIconId:string;summonerLevel?:number;soloduo:Ranks;flex:Ranks}) {
    const [icon, setIcon] = useState(String);

    useEffect(()=>{
        if(profileIconId)
        setIcon(`https://cdn.communitydragon.org/14.1.9/profile-icon/${profileIconId}`);
    },[profileIconId]);

    useEffect(() => {
        const loadImages = (champion: TopMasteries) => {
          champion.path=`https://cdn.communitydragon.org/14.1.9/champion/${champion.name}/square`;
        };
        if (topChamp) loadImages(topChamp);
        if (SecondChamp) loadImages(SecondChamp);
        if (ThirdChamp) loadImages(ThirdChamp);
      }, [topChamp, SecondChamp, ThirdChamp]);
    return (
        <>
         <div className="imagesPlaceholder">
            <div className="accountIconPlaceholder">
                {summonerName && icon && <div>
                    <label htmlFor="icon">{summonerName}&#10;&#13;{summonerLevel}</label>
                <img src={icon} id="icon" alt="" />
                </div> }

            </div>
            {topChamp &&
            <div className="imageOne">
                <label htmlFor="1">{topChamp.name}</label>
                <div className="topChamp" id="1"> <img src={topChamp.path} alt={topChamp.id} /></div>
            </div> }
            
            <div className="otherImgs" >
                {SecondChamp &&
                    <div>
                        <label htmlFor="2">{SecondChamp.name}</label>
                        <div className="SecondChamp" id="2"> <img src={SecondChamp.path} alt={SecondChamp.id}/></div>
                    </div>
                }
                {ThirdChamp &&
                    <div>
                        <label htmlFor="3">{ThirdChamp.name}</label>
                        <div className="ThirdChamp" id="3"> <img src={ThirdChamp.path} alt={ThirdChamp.id} /></div>
                    </div>
                }
            </div>
            {
                summonerName&&<div className="summonerRanks">
                <h2>Ranked</h2>
                <div className="ranks">
                <div className="Ranked Solo/Duo">
                    <p>  Solo/Duo</p>
                    {soloduo && <label>{soloduo.tier} {soloduo.rank} --{soloduo.points}</label>}
                    <div id="soloduo"> <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${soloduo.tier.toString().toLowerCase()}.png`} alt="" /></div>
                </div>
                <div className=" Ranked Flex">
                    <p>Flex</p>
                    {flex && <label>{flex.tier} {flex.rank} --{flex.points}</label>}
                    <div id="flex"> <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${flex.tier.toString().toLowerCase()}.png`}  style={{backgroundSize:"cover"}} alt="" /></div>
                </div>
                </div>
                
            </div>
            }
            
        </div>
            
        </>
       
    );
}

export default Icons;

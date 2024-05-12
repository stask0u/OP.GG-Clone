function MatchHistory({ matchHistory }: { matchHistory: string[] }){

    return(
        <div className="matchHistoryPlaceholder">
            {matchHistory.map(item=><div key={item}>{item}</div>)}
        </div>
    );
}

export default MatchHistory;
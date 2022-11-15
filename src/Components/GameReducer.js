export const initialGameObject = {
    gameInprogress: false,
    playerQueue: [],
    roundStats: []
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case "START_GAME": 
            return {...state, gameInprogress: action.payload.gameInProgress};
        case "ADD_PLAYERS_TO_QUEUE":
            return {...state, playerQueue: action.payload.players};
        case "ADD_ROUND_STATS":
            return {...state, roundState: action.payload.roundStats};

        default:
            return state;
    }
}

/* 
roundStats Object example.
{
    question: 'Sample Question',
    reactions: [
            {
            userId: 12345
            funnyCount: 1,
            interestingCount: 1,
            woahCount: 1
        }
    ]
}


*/
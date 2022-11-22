export const initialGameObject = {
    gameInProgress: false,
    questions: [],
    currentQuestion: null,
    playerQueue: [],
    roundStats: [],
    selectedUser: null
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case "START_GAME": 
            return {...state, gameInProgress: action.payload.gameInProgress};
        case "SET_QUESTIONS":
            return {...state, questions: action.payload.questions}
        case "SET_QUESTION": 
            return {...state, currentQuestion: action.payload.currentQuestion, questions: action.payload.questions};
        case "SET_PLAYER_QUEUE":
            return {...state, playerQueue: action.payload.players};
        case "ADD_ROUND_STATS":
            return {...state, roundStats: action.payload.roundStats};
        case "SET_SELECTED_USER":
            return {...state, selectedUser: action.payload.user};

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
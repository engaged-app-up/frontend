export const gameState = {
    gameInProgress: false,
    questions: [],
    currentQuestion: null,
    playerQueue: [],
    roundStats: [],
    selectedPlayer: null
  }

  export const roundStats = {
    question: null,
    reactions: []
  }

  export const reactions = {
    userId: null,
    funnyCount: 0,
    interestingCount: 0,
    woahCount: 0,
    total: 0
  }


export const startGame = async (uuid, socket) => {
    await socket.emit('start_game', { room: uuid });
}

export const filterPlayersForQueue = async (roomUsers, activeSockets) => {
    let filteredUsers;
    filteredUsers = roomUsers.filter(user => {
        let activeUserIds = activeSockets.map(socket => socket.userId)
        return activeUserIds.includes(user.id);
    })
    console.log('filtered', filteredUsers);
    return filteredUsers;
}

export const getQuestions = async (auth) => {
    let questions;
    let token = await auth.currentUser.getIdToken(true);
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/game/questions`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    if (response.ok) {
        response = await response.json();
        questions = response.questions;
    }

    return questions;
}
export const selectUser = (user) => {
    console.log("you clicked on: ", user.first);
    return {
        type: "USER_SELECTED",
        payload: user
    }
} 
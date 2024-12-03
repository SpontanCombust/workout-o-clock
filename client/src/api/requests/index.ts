import AuthRequests from "./AuthRequests";
import WorkoutSetRequests from "./WorkoutSetRequests";
import WorkoutTaskRequests from "./WorkoutTaskRequests";


const Api = {
    auth() : AuthRequests {
        return new AuthRequests();
    },

    workoutSets() : WorkoutSetRequests {
        return new WorkoutSetRequests();
    },

    workoutTasks(setId: number) : WorkoutTaskRequests {
        return new WorkoutTaskRequests(setId);
    },
};

export default Api;
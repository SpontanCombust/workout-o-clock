import UserConverter from "./UserConverter";
import WorkoutSetConverter from "./WorkoutSetConverter";
import WorkoutTaskConverter from "./WorkoutTaskConverter";
import WorkoutTaskObjectiveConverter from "./WorkoutTaskObjectiveConverter";

var Converters = (new class {
    private _user = new UserConverter();
    private _workoutSet = new WorkoutSetConverter();
    private _workoutTask = new WorkoutTaskConverter();
    private _workoutTaskObjective = new WorkoutTaskObjectiveConverter();


    get user() : UserConverter {
        return this._user;
    }

    get workoutSet() : WorkoutSetConverter {
        return this._workoutSet;
    }

    get workoutTask() :  WorkoutTaskConverter {
        return this._workoutTask;
    }

    get workoutTaskObjective() :  WorkoutTaskObjectiveConverter {
        return this._workoutTaskObjective;
    }
})

export default Converters 
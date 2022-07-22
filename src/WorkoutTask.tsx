// alternative to time should be reps?
export default interface WorkoutTask {
    id: number;
    title: string;
    hasCountdown: boolean;
    countdownMinutes?: number;
    countdownSeconds?: number;
}
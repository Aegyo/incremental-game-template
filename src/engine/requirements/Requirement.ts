export interface Requirement {
    isCompleted(): boolean;

    lockedReason(): string;
}

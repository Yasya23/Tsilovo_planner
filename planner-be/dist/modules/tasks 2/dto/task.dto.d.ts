export declare class CreateTaskDto {
    isCompleted: boolean;
    title: string;
    goalId: string;
    date: Date;
}
export declare class TaskDto extends CreateTaskDto {
    _id: string;
}

export declare class CreateGoalDto {
    title: string;
    emoji: string;
    isActive: boolean;
}
export declare class UpdateGoalDto extends CreateGoalDto {
    _id: string;
}

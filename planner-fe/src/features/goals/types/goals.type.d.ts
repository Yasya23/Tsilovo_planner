export type CreateGoal = {
  title: string;
  emoji?: string;
  isActive: boolean;
};

export type Goal = CreateGoal & {
  _id: string;
  userId: string;
};

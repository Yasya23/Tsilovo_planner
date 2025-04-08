export type TaskType = {
  _id: Types.ObjectId;
  goalId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
};

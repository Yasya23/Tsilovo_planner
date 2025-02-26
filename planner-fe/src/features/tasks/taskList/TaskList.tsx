import ManageTasks from '../ManageTask';

export const TaskList = () => {
  return (
    <ManageTasks open={true} handleClose={() => {}} />

    // <div className={styles.Wrapper}>
    //   {tasks.dailyTasks.map((dayTask) => {
    //     const ukrainianDay = daysMap[dayTask.day] || dayTask.day;
    //     return (
    //       <div key={dayTask.day} className={styles.TaskWrapper}>
    //         <div className={styles.Top}>
    //           <h3 className={styles.Title}>
    //             {moode} {ukrainianDay}
    //           </h3>
    //           <IconButtonCustom
    //             type="edit"
    //             size="medium"
    //             onClick={() => {}}
    //             hasTooltip={true}
    //           />
    //         </div>

    //         <div className={styles.Task}>
    //           {dayTask.tasks.map((task, taskIndex) => (
    //             <TaskItem
    //               key={`${dayTask.day}-${taskIndex}`}
    //               task={task}
    //               title={task.title}
    //               onUpdate={(updatedTask) =>
    //                 handleUpdateTask(
    //                   dayTask.day,
    //                   taskIndex,
    //                   updatedTask as Task
    //                 )
    //               }
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default TaskList;

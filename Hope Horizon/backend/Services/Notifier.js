const cron = require('node-cron');
const Student = require('../models/Student');
const Notification = require('../models/Notification');

// Run daily at 8 AM
cron.schedule('0 8 * * *', async () => {
  const students = await Student.find()
    .populate('section')
    .populate('teacher');

  students.forEach(async student => {
    const overdueTasks = student.domains.flatMap(domain => 
      domain.tasks.filter(task => 
        task.dueDate < new Date() && task.status === 'red'
      )
    );

    if (overdueTasks.length > 0) {
      await Notification.create({
        userId: student.teacher._id,
        message: `${student.personalInfo.name} has ${overdueTasks.length} overdue tasks`
      });
    }
  });
});
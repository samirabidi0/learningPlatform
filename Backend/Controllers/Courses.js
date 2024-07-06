const Course = require('../DataBase/Models/Courses');

async function createCourse(req, res) {
    try {
        const newCourse = await Course.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content,
            note: req.body.note,
            instructorId: req.params.instructorId 
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllCourses(req, res) {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCourse,
    getAllCourses
};

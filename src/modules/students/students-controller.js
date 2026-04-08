const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();  // Call the service to get all students

    if (students.length === 0) {
        return res.status(404).json({ message: 'No students found' });
    }

    res.status(200).json({ students });

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, dob } = req.body;  // Extract student data from the request body

    // Validate the input data
    if (!first_name || !last_name || !email || !dob) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const student = await addNewStudent({ first_name, last_name, email, dob });  // Call the service to create the student

    res.status(201).json({
        message: 'Student added successfully',
        student
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Get student ID from route parameters
    const { first_name, last_name, email, dob } = req.body;  // Extract new student data from the request body

    // Validate the input data
    if (!first_name && !last_name && !email && !dob) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Call the service to update the student
    const updatedStudent = await updateStudent(id, { first_name, last_name, email, dob });

    if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
        message: 'Student updated successfully',
        student: updatedStudent
    });

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Get student ID from the URL parameters

    const student = await getStudentDetail(id);  // Call the service to get the student details

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ student });

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Get student ID from the URL parameters
    const { status } = req.body;  // Get status from the request body (e.g., 'active' or 'inactive')

    // Validate the status value
    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: 'Invalid status. Use "active" or "inactive"' });
    }

    const updatedStudent = await setStudentStatus(id, status);  // Call the service to update student status

    if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
        message: 'Student status updated successfully',
        student: updatedStudent
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};

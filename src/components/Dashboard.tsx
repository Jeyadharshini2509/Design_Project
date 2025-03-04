import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { students as initialStudents, studentProgress as initialProgress } from '../data/mockData';
import { Student, StudentProgress, DomainProgress } from '../types';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { LogOut, User, Users, BarChart as BarChartIcon, PieChart as PieChartIcon, PlusCircle, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>(initialProgress);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedProgress, setSelectedProgress] = useState<StudentProgress | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditScores, setShowEditScores] = useState(false);
  
  // New student form state
  const [newStudent, setNewStudent] = useState<{
    name: string;
    age: string;
    grade: string;
    parentId: string;
  }>({
    name: '',
    age: '',
    grade: '',
    parentId: '3', // Default to the parent user
  });

  // Filter students based on user role
  const filteredStudents = currentUser?.role === 'parent'
    ? students.filter(student => student.parentId === currentUser.id)
    : students;

  const handleStudentSelect = (studentId: string) => {
    const student = students.find(s => s.id === studentId) || null;
    setSelectedStudent(student);
    
    const progress = studentProgress.find(p => p.studentId === studentId) || null;
    setSelectedProgress(progress);
    setShowEditScores(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.age || !newStudent.grade) {
      alert('Please fill in all fields');
      return;
    }

    const newId = (students.length + 1).toString();
    
    // Create new student
    const studentToAdd: Student = {
      id: newId,
      name: newStudent.name,
      age: parseInt(newStudent.age),
      grade: newStudent.grade,
      parentId: newStudent.parentId
    };
    
    // Create default progress for the new student
    const progressToAdd: StudentProgress = {
      studentId: newId,
      studentName: newStudent.name,
      date: new Date().toISOString().split('T')[0],
      domains: [
        { domain: 'Communication', score: 0, previousScore: 0, maxScore: 100 },
        { domain: 'Social Skills', score: 0, previousScore: 0, maxScore: 100 },
        { domain: 'Motor Skills', score: 0, previousScore: 0, maxScore: 100 },
        { domain: 'Academic', score: 0, previousScore: 0, maxScore: 100 },
        { domain: 'Self-Care', score: 0, previousScore: 0, maxScore: 100 }
      ]
    };
    
    setStudents([...students, studentToAdd]);
    setStudentProgress([...studentProgress, progressToAdd]);
    setShowAddStudent(false);
    setNewStudent({ name: '', age: '', grade: '', parentId: '3' });
  };

  const handleScoreChange = (index: number, field: 'score' | 'previousScore', value: string) => {
    if (!selectedProgress) return;
    
    const newValue = parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 100) return;
    
    const updatedDomains = [...selectedProgress.domains];
    updatedDomains[index] = {
      ...updatedDomains[index],
      [field]: newValue
    };
    
    const updatedProgress = {
      ...selectedProgress,
      domains: updatedDomains
    };
    
    setSelectedProgress(updatedProgress);
  };

  const saveScoreChanges = () => {
    if (!selectedProgress) return;
    
    const updatedProgressList = studentProgress.map(progress => 
      progress.studentId === selectedProgress.studentId ? selectedProgress : progress
    );
    
    setStudentProgress(updatedProgressList);
    setShowEditScores(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Special Education Progress Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{currentUser?.name} ({currentUser?.role})</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-500" />
                  Students
                </h2>
                {currentUser?.role === 'faculty' && (
                  <button 
                    onClick={() => setShowAddStudent(true)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Add Student"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Select a student to view their progress
              </p>
            </div>
            
            {/* Add Student Form */}
            {showAddStudent && currentUser?.role === 'faculty' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Add New Student</h3>
                  <button 
                    onClick={() => setShowAddStudent(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Student name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={newStudent.age}
                      onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Age"
                      min="1"
                      max="20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Grade</label>
                    <input
                      type="text"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="e.g. 4th"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Parent</label>
                    <select
                      value={newStudent.parentId}
                      onChange={(e) => setNewStudent({...newStudent, parentId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="3">Michael Brown</option>
                      <option value="4">Other Parent</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAddStudent}
                    className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Add Student
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              {filteredStudents.map(student => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student.id)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    selectedStudent?.id === student.id
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {student.name} - {student.grade}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white rounded-lg shadow">
            {selectedStudent && selectedProgress ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}'s Progress</h2>
                    <p className="text-gray-500">Age: {selectedStudent.age} | Grade: {selectedStudent.grade}</p>
                  </div>
                  <div className="flex space-x-2">
                    {currentUser?.role === 'faculty' && !showEditScores && (
                      <button
                        onClick={() => setShowEditScores(true)}
                        className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"
                        title="Edit Scores"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setChartType('bar')}
                      className={`p-2 rounded-md ${
                        chartType === 'bar' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-500'
                      }`}
                      title="Bar Chart"
                    >
                      <BarChartIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setChartType('pie')}
                      className={`p-2 rounded-md ${
                        chartType === 'pie' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-500'
                      }`}
                      title="Pie Chart"
                    >
                      <PieChartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Development Domains Progress</h3>
                  <div className="h-80">
                    {chartType === 'bar' ? (
                      <BarChart progress={selectedProgress} />
                    ) : (
                      <PieChart progress={selectedProgress} />
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Detailed Progress</h3>
                    {showEditScores && currentUser?.role === 'faculty' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={saveScoreChanges}
                          className="flex items-center text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setShowEditScores(false);
                            // Reset to original progress
                            const originalProgress = studentProgress.find(p => p.studentId === selectedStudent.id);
                            if (originalProgress) setSelectedProgress(originalProgress);
                          }}
                          className="flex items-center text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Domain
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Current Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Previous Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Change
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedProgress.domains.map((domain, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {domain.domain}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {showEditScores && currentUser?.role === 'faculty' ? (
                                <input
                                  type="number"
                                  value={domain.score}
                                  onChange={(e) => handleScoreChange(index, 'score', e.target.value)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                                  min="0"
                                  max="100"
                                />
                              ) : (
                                `${domain.score}/${domain.maxScore}`
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {showEditScores && currentUser?.role === 'faculty' ? (
                                <input
                                  type="number"
                                  value={domain.previousScore}
                                  onChange={(e) => handleScoreChange(index, 'previousScore', e.target.value)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                                  min="0"
                                  max="100"
                                />
                              ) : (
                                `${domain.previousScore}/${domain.maxScore}`
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                domain.score > domain.previousScore
                                  ? 'bg-green-100 text-green-800'
                                  : domain.score < domain.previousScore
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {domain.score > domain.previousScore && '+'}
                                {domain.score - domain.previousScore}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <Users className="h-16 w-16 text-indigo-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No Student Selected</h3>
                <p className="text-gray-500 mt-2">Please select a student from the list to view their progress</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-700';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-700';
      case 'Avançado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex flex-col h-full"
      onClick={() => onClick(course)}
    >
      <div className="relative aspect-video">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getBadgeColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider">{course.language}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{course.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xs text-gray-400">
            <i className="fa-solid fa-play-circle mr-1"></i> {course.lessons.length} aulas
          </span>
          <button className="text-indigo-600 font-semibold text-sm hover:underline">
            Ver Curso <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

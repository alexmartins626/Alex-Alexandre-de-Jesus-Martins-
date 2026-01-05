
import React, { useState, useEffect } from 'react';
import { COURSES } from './constants';
import { Course, Lesson } from './types';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';

const App: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  // APK Build States
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [showBuildModal, setShowBuildModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completed_lessons');
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleLessonCompletion = (lessonId: string) => {
    const newSet = new Set(completedLessons);
    if (newSet.has(lessonId)) {
      newSet.delete(lessonId);
    } else {
      newSet.add(lessonId);
    }
    setCompletedLessons(newSet);
    localStorage.setItem('completed_lessons', JSON.stringify(Array.from(newSet)));
  };

  const handleBuildAPK = () => {
    setIsBuilding(true);
    setShowBuildModal(true);
    setBuildProgress(0);
    setBuildLogs(["Iniciando processo de build...", "Verificando dependências SDK Android..."]);

    const logs = [
      "Compilando módulos Java...",
      "Otimizando scripts JavaScript (V8)...",
      "Processando recursos de layout C# (.NET)...",
      "Minificando arquivos HTML/CSS...",
      "Gerando classes Dex...",
      "Assinando pacote com chave de debug...",
      "APK gerado com sucesso em /build/outputs/apk/debug/app-debug.apk"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          return 100;
        }
        
        if (prev % 15 === 0 && currentLog < logs.length) {
          setBuildLogs(l => [...l, logs[currentLog]]);
          currentLog++;
        }
        
        return prev + 1;
      });
    }, 50);
  };

  const filteredCourses = COURSES.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLesson(course.lessons[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20 md:pb-0">
      {/* Build APK Modal Simulation */}
      {showBuildModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 text-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
              <h3 className="font-bold flex items-center gap-2">
                <i className="fa-brands fa-android text-green-500"></i>
                Gerador de APK DevLearn
              </h3>
              {!isBuilding && (
                <button onClick={() => setShowBuildModal(false)} className="text-gray-400 hover:text-white">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="mb-4 flex justify-between text-xs font-mono uppercase tracking-widest text-gray-500">
                <span>Status: {isBuilding ? 'Compilando' : 'Finalizado'}</span>
                <span>{buildProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  style={{ width: `${buildProgress}%` }}
                ></div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs text-green-400 border border-gray-800 mb-6">
                {buildLogs.map((log, i) => (
                  <div key={i} className="mb-1">
                    <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
              </div>
              {!isBuilding && (
                <button 
                  onClick={() => alert("Simulação de download: O arquivo app-devlearn.apk seria baixado agora.")}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-download"></i> Baixar APK Agora
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={closeCourse}>
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="text-xl font-bold tracking-tight text-gray-900">DevLearn</span>
          </div>
          
          {!selectedCourse && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="O que você quer aprender?" 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={handleBuildAPK}
              className="hidden sm:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 font-bold text-xs hover:bg-green-100 transition-colors"
            >
              <i className="fa-brands fa-android"></i> Gerar APK
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/100" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {!selectedCourse ? (
          <>
            {/* Hero Section */}
            <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between bg-indigo-900 rounded-[2rem] p-8 md:p-12 text-white overflow-hidden relative">
              <div className="relative z-10 md:max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Domine as linguagens do futuro hoje.</h1>
                <p className="text-indigo-100 text-lg mb-8">Cursos completos de Java, JavaScript, C#, C++ e mais, com suporte de IA 24/7.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">Começar Agora</button>
                  <button 
                    onClick={handleBuildAPK}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 flex items-center gap-2"
                  >
                    <i className="fa-brands fa-android"></i> Obter APK Mobile
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <i className="fa-solid fa-code text-[20rem]"></i>
              </div>
            </div>

            {/* Language Pills */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {['Todos', 'Java', 'JavaScript', 'HTML & CSS', 'C', 'C++', 'C#'].map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setSearchQuery(lang === 'Todos' ? '' : lang)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    (searchQuery === lang || (lang === 'Todos' && searchQuery === '')) 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Course Grid */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span>
              Cursos Disponíveis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} onClick={openCourse} />
              ))}
            </div>
          </>
        ) : (
          /* Course Viewer Mode */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4">
            <div className="lg:col-span-8 space-y-6">
              <button 
                onClick={closeCourse}
                className="mb-4 flex items-center gap-2 text-indigo-600 font-bold hover:translate-x-[-4px] transition-transform"
              >
                <i className="fa-solid fa-arrow-left"></i> Voltar para o catálogo
              </button>
              
              <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border-4 border-white">
                {activeLesson ? (
                  <iframe 
                    className="w-full h-full"
                    src={activeLesson.videoUrl} 
                    title={activeLesson.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    Selecione uma aula para começar
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{activeLesson?.title || selectedCourse.title}</h1>
                    <p className="text-gray-500 text-sm">{selectedCourse.language} • {activeLesson?.duration} • {selectedCourse.difficulty}</p>
                  </div>
                  <button 
                    onClick={() => activeLesson && toggleLessonCompletion(activeLesson.id)}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                      activeLesson && completedLessons.has(activeLesson.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/30'
                    }`}
                  >
                    <i className={`fa-solid ${activeLesson && completedLessons.has(activeLesson.id) ? 'fa-check-double' : 'fa-check'}`}></i>
                    {activeLesson && completedLessons.has(activeLesson.id) ? 'Concluído' : 'Marcar como Concluído'}
                  </button>
                </div>
                <div className="prose prose-indigo max-w-none">
                  <h3 className="text-lg font-bold mb-2">Sobre esta aula</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeLesson?.description || selectedCourse.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-6 border-b bg-gray-50/50">
                  <h2 className="font-bold flex items-center gap-2">
                    <i className="fa-solid fa-list-ul text-indigo-600"></i>
                    Conteúdo do Curso
                  </h2>
                  <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${(completedLessons.size / selectedCourse.lessons.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                    {completedLessons.size} de {selectedCourse.lessons.length} aulas concluídas
                  </p>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {selectedCourse.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-b-0 ${
                        activeLesson?.id === lesson.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        {completedLessons.has(lesson.id) ? (
                          <i className="fa-solid fa-check text-green-600"></i>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className={`text-sm font-semibold mb-1 ${activeLesson?.id === lesson.id ? 'text-indigo-700' : 'text-gray-800'}`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400">
                          <i className="fa-regular fa-clock"></i> {lesson.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-6 z-50">
        <button className="flex flex-col items-center gap-1 text-indigo-600" onClick={closeCourse}>
          <i className="fa-solid fa-house"></i>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={handleBuildAPK}
          className="flex flex-col items-center gap-1 text-green-600 font-bold"
        >
          <i className="fa-brands fa-android"></i>
          <span className="text-[10px] font-bold">APK</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-book"></i>
          <span className="text-[10px] font-bold">Meus Cursos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fa-solid fa-user"></i>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </nav>

      <AITutor />
    </div>
  );
};

export default App;

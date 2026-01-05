
import { Course, LanguageType } from './types';

export const COURSES: Course[] = [
  {
    id: 'js-101',
    language: LanguageType.JAVASCRIPT,
    title: 'JavaScript Moderno: Do Zero ao Mestre',
    thumbnail: 'https://picsum.photos/seed/js/800/450',
    description: 'Aprenda a linguagem mais popular do mundo, do básico ao ES6+ e conceitos assíncronos.',
    difficulty: 'Iniciante',
    lessons: [
      { id: 'js-l1', title: 'Introdução e Variáveis', videoUrl: 'https://www.youtube.com/embed/Ptbk2af68e8', duration: '12:45', description: 'O que é JS e como declarar variáveis.', isCompleted: false },
      { id: 'js-l2', title: 'Estruturas de Controle', videoUrl: 'https://www.youtube.com/embed/vEwPSqfS5p0', duration: '15:20', description: 'If, Else e Switch.', isCompleted: false },
      { id: 'js-l3', title: 'Funções e Escopo', videoUrl: 'https://www.youtube.com/embed/mc3V8fBqreE', duration: '18:10', description: 'Criação de funções e arrow functions.', isCompleted: false }
    ]
  },
  {
    id: 'java-101',
    language: LanguageType.JAVA,
    title: 'Java para Backend',
    thumbnail: 'https://picsum.photos/seed/java/800/450',
    description: 'Fundamentos de Java e Programação Orientada a Objetos.',
    difficulty: 'Intermediário',
    lessons: [
      { id: 'java-l1', title: 'Instalação e Hello World', videoUrl: 'https://www.youtube.com/embed/Sxh73898G8s', duration: '10:00', description: 'Configurando o ambiente Java.', isCompleted: false },
      { id: 'java-l2', title: 'Classes e Objetos', videoUrl: 'https://www.youtube.com/embed/v9E67TAt5eQ', duration: '22:15', description: 'O coração da POO.', isCompleted: false }
    ]
  },
  {
    id: 'csharp-101',
    language: LanguageType.CSHARP,
    title: 'C# e .NET Core',
    thumbnail: 'https://picsum.photos/seed/csharp/800/450',
    description: 'Desenvolvimento robusto com C# para desktop e web.',
    difficulty: 'Iniciante',
    lessons: [
      { id: 'cs-l1', title: 'Primeiros passos no Visual Studio', videoUrl: 'https://www.youtube.com/embed/GhQdlIFylQ8', duration: '14:30', description: 'Criando seu primeiro projeto.', isCompleted: false }
    ]
  },
  {
    id: 'html-css-101',
    language: LanguageType.HTML_CSS,
    title: 'HTML5 & CSS3: Design Responsivo',
    thumbnail: 'https://picsum.photos/seed/web/800/450',
    description: 'Crie sites modernos e bonitos do absoluto zero.',
    difficulty: 'Iniciante',
    lessons: [
      { id: 'web-l1', title: 'Estrutura HTML', videoUrl: 'https://www.youtube.com/embed/uGvV_O70_R0', duration: '08:50', description: 'Tags básicas e semântica.', isCompleted: false },
      { id: 'web-l2', title: 'Estilização com CSS', videoUrl: 'https://www.youtube.com/embed/5PS_T69SjtU', duration: '25:00', description: 'Cores, fontes e box-model.', isCompleted: false }
    ]
  },
  {
    id: 'cpp-101',
    language: LanguageType.CPP,
    title: 'C++ de Alto Desempenho',
    thumbnail: 'https://picsum.photos/seed/cpp/800/450',
    description: 'Entenda memória, ponteiros e performance computacional.',
    difficulty: 'Avançado',
    lessons: [
      { id: 'cpp-l1', title: 'Ponteiros e Referências', videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y', duration: '30:00', description: 'Manipulação direta de memória.', isCompleted: false }
    ]
  },
  {
    id: 'c-101',
    language: LanguageType.C,
    title: 'Linguagem C: A Base de Tudo',
    thumbnail: 'https://picsum.photos/seed/clang/800/450',
    description: 'A base da computação moderna. Aprenda a programar de verdade.',
    difficulty: 'Intermediário',
    lessons: [
      { id: 'c-l1', title: 'Arrays e Strings em C', videoUrl: 'https://www.youtube.com/embed/1uRAsjUo_B0', duration: '19:45', description: 'Trabalhando com coleções de dados.', isCompleted: false }
    ]
  }
];

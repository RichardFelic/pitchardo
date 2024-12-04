import { images } from '../assets/images';
import { ChatMessage } from '../types/chat';

export const chatScript: ChatMessage[] = [
  {
    type: 'bot',
    content: 'Hola. ¿En qué puedo echarte una mano hoy? Estoy listo para lo que necesites.',
  },
  {
    type: 'user',
    content: 'Hola a todos, espero que estén teniendo un excelente día. Antes de comenzar, quiero presentarles a alguien especial que me ayudará en esta presentación: Pitchardo, mi bot personal. Saluda.'
  },
  {
    type: 'bot',
    content: '¡Hola, así es! Me llamo Pitchardo. Es un gusto estar aquí con ustedes, y más aún acompañando a este tremendo talento, Richard. Bueno, Richard, vamos al grano... cuéntame algo sobre ti. ¿Qué te hace especial?'
  },
  {
    type: 'user',
    content: 'Como dijo Pitchardo, me llamo Richard Feliciano Abreu, Soy Ingeniero de Software de Republica Dominicana y soy egresado de Oracle Next Education como programador con especialidad en Backend.\n\nAdemás, me estoy formando de manera autodidacta en desarrollo web, un campo que me apasiona por mi entusiasmo y creatividad, y siempre buscando soluciones eficientes y minimalistas para resolver problemas.',
    images: [
      {
        base64: `${images.profile.richard}`,
        alt: 'Richard Feliciano',
        type: 'base64'
      },
      {
        base64: `${images.qr.portfolio}`,
        alt: 'Portfolio QR',
        type: 'base64'
      }
    ]
  },
  {
    type: 'bot',
    content: '¡Excelente! ¿Ahora dime qué habilidades o características te hacen destacar en el campo de la tecnología? ¡Cuéntame un par de cosas que te diferencian!'
  },
  {
    type: 'user',
    content: 'Lo que me distingue es mi determinación para superar desafíos, siempre buscando soluciones eficientes. A su vez, mi compromiso con cada proyecto me lleva a cumplir y superar los objetivos, mientras persigo la superación constante y la excelencia en todo lo que hago. Además, algo a destacar, es mi habilidad de liderazgo que me ha permitido guiar a los equipos hacia el éxito, utilizando metodologías ágiles y promoviendo la colaboración. Estas cualidades han sido clave para lograr resultados de calidad y experiencias positivas en cada proyecto en el que he estado involucrado.'
  },
  {
    type: 'bot',
    content: 'Muy buenas habilidades. Ahora que ya sé un poquito más sobre tus cualidades, cuéntame… ¿Qué habilidades técnicas tienes que te hacen brillar? ¿Algún proyecto o experiencia que te haya permitido demostrar todo tu talento?'
  },
  {
    type: 'user',
    content: 'Pitchardo, buena pregunta! Durante una pasantía en el Ministerio de Interior y Policía en República Dominicana, desarrollé un sistema de reportes de trámites en línea usando SQL y Excel, lo que automatizó procesos y generó tablas dinámicas que aún se utilizan.',
    images: [
      {
        base64: `${images.projects.reporte}`,
        alt: 'Reportes',
        type: 'base64'
      }
    ]
  },
  {
    type: 'user',
    content: 'En Alura, completé dos desafíos exitosamente:\n Uno de ellos fue el Encriptador de texto con HTML, CSS y JavaScript, donde mejoré mis habilidades en estructura de código y buenas prácticas de desarrollo web.',
    images: [
      {
        base64: `${images.projects.encriptador}`,
        alt: 'Encriptador de Alura',
        type: 'base64'
      },
      {
        base64: `${images.qr.encriptador}`,
        alt: 'Encriptador QR',
        type: 'base64'
      }
    ]
  },
  {
    type: 'user',
    content: 'El segundo desafío fue el proyecto de Literatura Alura, aplicando mis conocimientos en Spring Boot y Java.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
        alt: 'Literatura Alura Project',
        type: 'project'
      },
      {
        base64: `${images.qr.literatura}`,
        alt: 'Literatura Alura QR',
        type: 'base64'
      }
    ]
  },
  {
    type: 'user',
    content: 'También, lideré un proyecto de conversión de moneda con el stack MERN y arquitectura MVC, utilizando Kanban como metodología ágil.',
    images: [
      {
        base64: `${images.projects.converter}`,
        alt: 'Converter Project',
        type: 'base64'
      },
      {
        base64: `${images.qr.converter}`,
        alt: 'Converter QR',
        type: 'base64'
      }
    ]
  },
  {
    type: 'user',
    content: 'He trabajado en APIs RESTful, integración de sistemas de contabilidad, sistema de seleccion y reclutamiento RRHH y plataformas de noticias, todo eso utilizando Django y Python, y siempre priorizando escalabilidad y buenas prácticas.',
  },
  {
    type: 'bot',
    content: '¿Escucharon eso? SQL, MERN, Spring... ¡Impresionante! Oye… ¿Y qué buscas en tu próximo rol profesional?'
  },
  {
    type: 'user',
    content: 'Estoy buscando un rol como desarrollador Backend o Líder de proyecto, donde pueda aplicar mis conocimientos y liderar iniciativas que impulsen el rendimiento del equipo y los sistemas. Aspiro a trabajar en proyectos desafiantes que aprovechen mis habilidades técnicas, mientras colaboro en entornos dinámicos para aportar valor y fomentar la innovación. Estoy comprometido con seguir aprendiendo y evolucionando profesionalmente, adoptando nuevas tecnologías y contribuyendo con soluciones que marquen una diferencia.'
  },
  {
    type: 'bot',
    content: '¡Eso es ambición de la buena, Richard! Te veo en un futuro liderando un equipo de desarrollo con un café en una mano y un código perfecto en la otra.. ¿Algún último comentario que quieras agregar?'
  },
  {
    type: 'user',
    content: 'Que estoy listo para nuevos desafíos y me encantaría ser parte de un equipo donde pueda aprender y aportar al máximo. Siempre busco no solo cumplir con los objetivos, sino romper barreras, superar lo esperado y dejar una huella en cada proyecto.'
  },
  {
    type: 'bot',
    content: '¡Listo, fichado! Si yo fuera un reclutador, ya te estaría enviando el contrato. Vamos ¡No hay manera de que este tipo no sea contratado!'
  }
];
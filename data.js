const semesters = {
    1: [
        { code: "ICM2015", name: "Nivelación Termofluidos", prereq: [], credits: 4 },
        { code: "ICM2016", name: "Nivelación Sólidos", prereq: [], credits: 4 },
        { code: "ICM2017", name: "Nivelación Materiales", prereq: [], credits: 4 },
        { code: "MAT1008", name: "Nivelación Matemáticas", prereq: [], credits: 6 }
    ],

    2: [
        { code: "ICM4010", name: "Procesos de Fabricación 2", prereq: ["ICM2017"], credits: 4 },
        { code: "ICM4011", name: "Mecánica de Materiales", prereq: ["ICM2016", "MAT1008"], credits: 6 },
        { code: "ICM4012", name: "Termodinámica 2", prereq: ["ICM2015", "MAT1008"], credits: 5 },
        { code: "INGV9001", name: "Inglés 1", prereq: [], credits: 2 },
        { code: "IER010", name: "Antropología Cristiana", prereq: [], credits: 2 },
        { code: "IER020", name: "Ética Cristiana", prereq: [], credits: 2 }
    ],

    3: [
        { code: "ICM3013", name: "Lenguaje de Programación y Métodos Numéricos", prereq: ["MAT1008"], credits: 4 },
        { code: "ICM4013", name: "Vibraciones Mecánicas", prereq: ["ICM2016", "MAT1008"], credits: 4 },
        { code: "ICM4014", name: "Electrotecnia", prereq: [], credits: 4 },
        { code: "ICM4015", name: "Elementos de Máquinas", prereq: ["ICM2016", "MAT1008"], credits: 4 },
        { code: "ICM4016", name: "Transferencia de Calor", prereq: ["ICM4012", "ICM2015"], credits: 6 }
    ],

    4: [
        { code: "ICM5010", name: "Análisis de Fallas y Monitoreo de Condiciones", prereq: ["ICM2017"], credits: 3 },
        { code: "ICM5011", name: "Automatización y Control", prereq: ["ICM4014"], credits: 4 },
        { code: "ICM5012", name: "Modelación Mecánica", prereq: ["ICM4011", "ICM4016"], credits: 4 },
        { code: "ICM5013", name: "Turbomáquinas", prereq: ["ICM4016"], credits: 6 },
        { code: "INGV9002", name: "Inglés 2", prereq: ["INGV9001"], credits: 2 },
        { code: "FOFU1", name: "Formación Fundamental 1", prereq: [], credits: 2 }
    ],

    5: [
        { code: "ICM5014", name: "Herramientas de Gestión de la Producción", prereq: ["ICM4010"], credits: 3 },
        { code: "ICM5015", name: "Optimización e Ingeniería de Plantas", prereq: ["ICM3013"], credits: 3 },
        { code: "ICM5016", name: "Diseño Mecánico", prereq: ["ICM5012"], credits: 3 },
        { code: "ICM5017", name: "Proyecto de Titulación 1", prereq: ["INGV9002", "ICM5010", "ICM5011", "ICM5012", "ICM5013"], credits: 5 },
        { code: "ICM550", name: "Evaluación de Proyectos", prereq: ["ICM4010"], credits: 3 },
        { code: "INGV9003", name: "Inglés 3", prereq: ["INGV9002"], credits: 2 },
        { code: "FOFU2", name: "Formación Fundamental 2", prereq: [], credits: 2 }
    ],

    6: [
        { code: "ICM6010", name: "Administración de RR.HH.", prereq: ["ICM550"], credits: 3 },
        { code: "ICM6011", name: "Gestión de Activos y Confiabilidad", prereq: ["ICM5010"], credits: 3 },
        { code: "ICM6012", name: "Proyecto de Ingeniería", prereq: ["ICM550", "ICM5015"], credits: 3 },
        { code: "ICM6013", name: "Proyecto de Titulación 2", prereq: ["ICM5017"], credits: 5 },
        { code: "INGV9004", name: "Inglés 4", prereq: ["INGV9003"], credits: 2 },
        { code: "FOFU3", name: "Formación Fundamental 3", prereq: [], credits: 2 }
    ]
};

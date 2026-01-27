export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  content: LessonContent[];
}

export interface LessonContent {
  type: "text" | "code" | "tip";
  content: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  completed: boolean;
  code: string;
  solution: string;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "مقدمة في بايثون",
    description: "تعرف على لغة بايثون وأساسياتها",
    duration: "10 دقائق",
    level: "beginner",
    completed: false,
    content: [
      {
        type: "text",
        content:
          "بايثون هي لغة برمجة سهلة التعلم وقوية. تُستخدم في تطوير الويب، تحليل البيانات، الذكاء الاصطناعي، وأكثر!",
      },
      {
        type: "code",
        content: 'print("مرحباً بالعالم!")',
      },
      {
        type: "tip",
        content: "بايثون تستخدم المسافات لتحديد الكتل البرمجية بدلاً من الأقواس",
      },
    ],
  },
  {
    id: "2",
    title: "المتغيرات والأنواع",
    description: "كيفية تخزين البيانات في بايثون",
    duration: "15 دقيقة",
    level: "beginner",
    completed: false,
    content: [
      {
        type: "text",
        content:
          "المتغيرات هي حاويات لتخزين البيانات. في بايثون، لا تحتاج لتحديد نوع المتغير مسبقاً.",
      },
      {
        type: "code",
        content: 'name = "أحمد"\nage = 25\nheight = 1.75\nis_student = True',
      },
      {
        type: "tip",
        content: "استخدم أسماء واضحة للمتغيرات لتسهيل قراءة الكود",
      },
    ],
  },
  {
    id: "3",
    title: "العمليات الحسابية",
    description: "الجمع والطرح والضرب والقسمة",
    duration: "12 دقيقة",
    level: "beginner",
    completed: false,
    content: [
      {
        type: "text",
        content: "بايثون تدعم جميع العمليات الحسابية الأساسية والمتقدمة.",
      },
      {
        type: "code",
        content:
          "x = 10\ny = 3\n\nprint(x + y)  # الجمع: 13\nprint(x - y)  # الطرح: 7\nprint(x * y)  # الضرب: 30\nprint(x / y)  # القسمة: 3.33\nprint(x ** y) # الأس: 1000",
      },
    ],
  },
  {
    id: "4",
    title: "الشروط والقرارات",
    description: "if, elif, else - اتخاذ القرارات في الكود",
    duration: "20 دقيقة",
    level: "beginner",
    completed: false,
    content: [
      {
        type: "text",
        content:
          "الجمل الشرطية تسمح لبرنامجك باتخاذ قرارات مختلفة بناءً على شروط معينة.",
      },
      {
        type: "code",
        content:
          'age = 18\n\nif age >= 18:\n    print("أنت بالغ")\nelif age >= 13:\n    print("أنت مراهق")\nelse:\n    print("أنت طفل")',
      },
    ],
  },
  {
    id: "5",
    title: "الحلقات التكرارية",
    description: "for و while - تكرار الأوامر",
    duration: "25 دقيقة",
    level: "intermediate",
    completed: false,
    content: [
      {
        type: "text",
        content: "الحلقات تسمح بتنفيذ نفس الكود عدة مرات.",
      },
      {
        type: "code",
        content:
          '# حلقة for\nfor i in range(5):\n    print(i)\n\n# حلقة while\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1',
      },
      {
        type: "tip",
        content: "احذر من الحلقات اللانهائية! تأكد دائماً من وجود شرط للتوقف",
      },
    ],
  },
  {
    id: "6",
    title: "القوائم",
    description: "تخزين مجموعات من البيانات",
    duration: "18 دقيقة",
    level: "intermediate",
    completed: false,
    content: [
      {
        type: "text",
        content: "القوائم تسمح بتخزين عدة قيم في متغير واحد.",
      },
      {
        type: "code",
        content:
          'fruits = ["تفاح", "موز", "برتقال"]\n\nprint(fruits[0])  # تفاح\nfruits.append("عنب")\nprint(len(fruits))  # 4',
      },
    ],
  },
  {
    id: "7",
    title: "الدوال",
    description: "إنشاء كتل كود قابلة لإعادة الاستخدام",
    duration: "30 دقيقة",
    level: "intermediate",
    completed: false,
    content: [
      {
        type: "text",
        content: "الدوال تساعد في تنظيم الكود وإعادة استخدامه.",
      },
      {
        type: "code",
        content:
          'def greet(name):\n    return f"مرحباً {name}!"\n\nmessage = greet("أحمد")\nprint(message)',
      },
    ],
  },
  {
    id: "8",
    title: "القواميس",
    description: "تخزين البيانات بمفاتيح",
    duration: "20 دقيقة",
    level: "advanced",
    completed: false,
    content: [
      {
        type: "text",
        content: "القواميس تخزن البيانات كأزواج من المفاتيح والقيم.",
      },
      {
        type: "code",
        content:
          'student = {\n    "name": "سارة",\n    "age": 20,\n    "grade": "A"\n}\n\nprint(student["name"])  # سارة\nstudent["city"] = "الرياض"',
      },
    ],
  },
];

export const exercises: Exercise[] = [
  {
    id: "1",
    title: "طباعة رسالة",
    description: "اطبع رسالة ترحيب",
    difficulty: "easy",
    topic: "المقدمة",
    completed: false,
    code: "# اطبع 'مرحباً بايثون!'\n",
    solution: 'print("مرحباً بايثون!")',
  },
  {
    id: "2",
    title: "إنشاء متغيرات",
    description: "أنشئ متغيرات لتخزين اسمك وعمرك",
    difficulty: "easy",
    topic: "المتغيرات",
    completed: false,
    code: "# أنشئ متغير name يحتوي اسمك\n# أنشئ متغير age يحتوي عمرك\n",
    solution: 'name = "أحمد"\nage = 25',
  },
  {
    id: "3",
    title: "حساب المساحة",
    description: "احسب مساحة مستطيل",
    difficulty: "easy",
    topic: "العمليات",
    completed: false,
    code: "length = 10\nwidth = 5\n# احسب المساحة وخزنها في متغير area\n",
    solution: "length = 10\nwidth = 5\narea = length * width",
  },
  {
    id: "4",
    title: "فحص العمر",
    description: "اكتب كود يفحص إذا كان الشخص بالغاً",
    difficulty: "medium",
    topic: "الشروط",
    completed: false,
    code: 'age = 17\n# اطبع "بالغ" إذا كان العمر 18 أو أكثر\n# اطبع "غير بالغ" إذا كان أقل\n',
    solution:
      'age = 17\nif age >= 18:\n    print("بالغ")\nelse:\n    print("غير بالغ")',
  },
  {
    id: "5",
    title: "جمع الأرقام",
    description: "اجمع الأرقام من 1 إلى 10",
    difficulty: "medium",
    topic: "الحلقات",
    completed: false,
    code: "# استخدم حلقة لجمع الأرقام من 1 إلى 10\n# خزن النتيجة في متغير total\n",
    solution: "total = 0\nfor i in range(1, 11):\n    total += i",
  },
  {
    id: "6",
    title: "إيجاد الأكبر",
    description: "اوجد أكبر رقم في قائمة",
    difficulty: "medium",
    topic: "القوائم",
    completed: false,
    code: "numbers = [5, 2, 9, 1, 7]\n# اوجد أكبر رقم في القائمة\n",
    solution: "numbers = [5, 2, 9, 1, 7]\nmax_num = max(numbers)",
  },
  {
    id: "7",
    title: "دالة الجمع",
    description: "اكتب دالة تجمع رقمين",
    difficulty: "hard",
    topic: "الدوال",
    completed: false,
    code: "# اكتب دالة add تستقبل رقمين وترجع مجموعهما\n",
    solution: "def add(a, b):\n    return a + b",
  },
  {
    id: "8",
    title: "عكس النص",
    description: "اكتب دالة تعكس نص",
    difficulty: "hard",
    topic: "الدوال",
    completed: false,
    code: "# اكتب دالة reverse_text تستقبل نص وترجعه معكوساً\n",
    solution: "def reverse_text(text):\n    return text[::-1]",
  },
];

export const getLevelLabel = (level: Lesson["level"]): string => {
  switch (level) {
    case "beginner":
      return "للمبتدئين";
    case "intermediate":
      return "متوسط";
    case "advanced":
      return "متقدم";
  }
};

export const getDifficultyLabel = (difficulty: Exercise["difficulty"]): string => {
  switch (difficulty) {
    case "easy":
      return "سهل";
    case "medium":
      return "متوسط";
    case "hard":
      return "صعب";
  }
};

export const getDifficultyColor = (difficulty: Exercise["difficulty"]): string => {
  switch (difficulty) {
    case "easy":
      return "#4CAF50";
    case "medium":
      return "#FFC107";
    case "hard":
      return "#F44336";
  }
};

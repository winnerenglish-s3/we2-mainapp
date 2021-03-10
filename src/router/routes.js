const routes = [
  // TEST

  {
    path: "/tasTest",
    component: () => import("pages/tasTest.vue"),
    name: "tasTest",
  },
  {
    path: "/test",
    component: () => import("pages/test.vue"),
    name: "test",
  },
  {
    path: "/testSpellingBee",
    component: () => import("pages/testSpellingBee.vue"),
    name: "testSpellingBee",
  },
  {
    path: "/testMatching",
    component: () => import("pages/testMatching.vue"),
    name: "testMatching",
  },
  {
    path: "/testTranslation",
    component: () => import("pages/testTranslation.vue"),
    name: "testTranslation",
  },
  // ---------------- ADVENTURE SCHOOL ------------------------
  {
    path: "/splash/:uid",
    component: () => import("pages/adventure-splash.vue"),
    name: "adventure-splash",
  },
  {
    path: "",
    component: () => import("pages/adventure-login.vue"),
    name: "adventure-login",
  },

  // ---------------- TUTOR ------------------------
  {
    path: "/tutor",
    component: () => import("pages/tutor-splash.vue"),
    name: "tutor-splash",
  },
  {
    path: "/tutor/login",
    component: () => import("pages/tutor-login.vue"),
    name: "tutor-login",
  },

  // ---------------- DISCOVERY ONLINE ------------------------
  {
    path: "/discovery",
    component: () => import("pages/discovery-splash.vue"),
    name: "discovery-splash",
  },

  {
    path: "/discovery/login",
    component: () => import("pages/discovery-login.vue"),
    name: "discovery-login",
  },

  // ---------------- PAGE ------------------------
  {
    path: "/dashboard",
    component: () => import("pages/dashboard.vue"),
    name: "dashboard",
  },
  {
    path: "/landing",
    component: () => import("pages/landing.vue"),
    name: "landing",
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/character",
        component: () => import("pages/character.vue"),
        name: "character",
      },
      {
        path: "/lobby",
        component: () => import("pages/lobby.vue"),
        name: "lobbdy",
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/PracticeLayout.vue"),
    children: [
      {
        path: "/practicemain",
        component: () => import("pages/practiceListMain.vue"),
        name: "practicemain",
      },
      // Flashcard Main
      {
        path: "/flashcard/:practiceListId?",
        component: () => import("pages/flashcardMain.vue"),
        name: "flashcard",
      },

      // Spelling Bee Main
      {
        path: "/spellingbee/:practiceListId?",
        component: () => import("pages/spellingMain.vue"),
        name: "spellingbee",
      },

      // Multiple Vocab Main
      {
        path: "/multiplevocab/:practiceListId?",
        component: () => import("pages/multiplevocabMain.vue"),
        name: "multiplevocab",
      },

      // Matching Main
      {
        path: "/matching/:practiceListId?",
        component: () => import("pages/matchingMain.vue"),
        name: "matching",
      },

      // Phonics Multiple Main
      {
        path: "/phonicsmultiple/:practiceListId?",
        component: () => import("pages/phonicsMultipleMain.vue"),
        name: "phonicsmultiple",
      },

      // Conversation Multiple Main
      {
        path: "/conversationmultiple/:practiceListId?",
        component: () => import("pages/conversationMultipleMain.vue"),
        name: "conversationmultiple",
      },

      // Language Tip Main
      {
        path: "/languagetipmultiple/:practiceListId?",
        component: () => import("pages/languagetipMultipleMain.vue"),
        name: "languagetipmultiple",
      },

      // Grammar Multiple Main
      {
        path: "/grammarmultiple/:practiceListId?",
        component: () => import("pages/grammarMultipleMain.vue"),
        name: "grammarmultiple",
      },

      // Reading Multiple Main
      {
        path: "/readingmultiple/:practiceListId?",
        component: () => import("pages/readingMultipleMain.vue"),
        name: "readingmultiple",
      },

      // Grammar Action
      {
        path: "/grammarAction/:practiceListId?",
        component: () => import("pages/grammarActionMain.vue"),
        name: "grammaraction",
      },

      // Grammar Lesson
      {
        path: "/vdoLesson/:practiceListId?",
        component: () => import("pages/vdoLesson.vue"),
        name: "vdoLesson",
      },

      // Translation
      {
        path: "/translation/:practiceListId?",
        component: () => import("pages/translationMain.vue"),
        name: "translation",
      },

      // Cloze Test
      {
        path: "/clozeTest/:practiceListId?",
        component: () => import("pages/clozeTestMain.vue"),
        name: "clozeTest",
      },

      //Phonics Lesson
      {
        path: "/phonicsLesson/:practiceListId?",
        component: () => import("pages/phonicsLessonMain.vue"),
        name: "phonicsLesson",
      },

      //Phonics Lesson
      {
        path: "/conversationLesson/:practiceListId?",
        component: () => import("pages/conversationLessonMain.vue"),
        name: "conversationLesson",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
